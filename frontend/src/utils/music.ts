// Simple music utility for playing programmatic patterns

class MusicEngine {
  private audioContext: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private isInitialized = false;
  private isSuspended = false;
  private loopInterval: NodeJS.Timeout | null = null;
  private isLooping = false;

  async init() {
    if (this.isInitialized && !this.isSuspended) return;
    
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume audio context if it's suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
        this.isSuspended = false;
      }
      
      this.isInitialized = true;
    } catch (err) {
      console.error('Failed to initialize audio:', err);
    }
  }

  private stopAllSounds() {
    // Clear any existing loop
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    this.isLooping = false;

    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    this.oscillators = [];
    this.gainNodes.forEach(gain => {
      try {
        gain.disconnect();
      } catch (e) {
        // Node might already be disconnected
      }
    });
    this.gainNodes = [];
  }

  private playNoteAtTime(frequency: number, duration: number, startTime: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    this.oscillators.push(oscillator);
    this.gainNodes.push(gainNode);
  }

  private playDrumSound(type: 'kick' | 'snare' | 'hihat', startTime: number) {
    if (!this.audioContext) return;

    let frequency: number;
    let duration: number;
    let oscType: OscillatorType;

    switch (type) {
      case 'kick':
        frequency = 60;
        duration = 0.1;
        oscType = 'triangle';
        break;
      case 'snare':
        frequency = 200;
        duration = 0.1;
        oscType = 'triangle';
        break;
      case 'hihat':
        frequency = 8000;
        duration = 0.05;
        oscType = 'square';
        break;
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.type = oscType;

    if (type === 'hihat') {
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(8000, startTime);
    }

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.001);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    this.oscillators.push(oscillator);
    this.gainNodes.push(gainNode);
  }

  // Play a simple pattern with looping
  async playPattern(pattern: Array<{time: number, type: 'kick' | 'snare' | 'hihat' | 'note', freq?: number}>, bpm: number = 120, loop: boolean = true) {
    await this.init();
    if (!this.audioContext) return;

    this.stopAllSounds();

    const beatDuration = 60 / bpm;
    const patternDuration = Math.max(...pattern.map(p => p.time)) + 1; // Duration of one pattern cycle
    const patternDurationMs = patternDuration * beatDuration * 1000;

    const playPatternOnce = () => {
      const currentTime = this.audioContext!.currentTime;

      pattern.forEach(({ time, type, freq }) => {
        const startTime = currentTime + (time * beatDuration);
        
        if (type === 'kick') {
          this.playDrumSound('kick', startTime);
        } else if (type === 'snare') {
          this.playDrumSound('snare', startTime);
        } else if (type === 'hihat') {
          this.playDrumSound('hihat', startTime);
        } else if (type === 'note' && freq) {
          this.playNoteAtTime(freq, 0.3, startTime, 'square');
        }
      });
    };

    // Play the pattern once immediately
    playPatternOnce();

    // Set up looping if requested
    if (loop) {
      this.isLooping = true;
      this.loopInterval = setInterval(() => {
        if (this.isLooping) {
          playPatternOnce();
        }
      }, patternDurationMs);
    }
  }

  // Play a single note
  async playNote(frequency: number, duration: number = 0.3, type: OscillatorType = 'sine') {
    await this.init();
    if (!this.audioContext) return;

    const startTime = this.audioContext.currentTime;
    this.playNoteAtTime(frequency, duration, startTime, type);
  }

  // Play a drum sound
  async playDrum(type: 'kick' | 'snare' | 'hihat') {
    await this.init();
    if (!this.audioContext) return;

    const startTime = this.audioContext.currentTime;
    this.playDrumSound(type, startTime);
  }

  // Stop all sounds
  stop() {
    this.stopAllSounds();
  }

  // Enable audio on first user interaction
  enableAudioOnInteraction() {
    const enableAudio = async () => {
      await this.init();
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);
  }
}

// Create a singleton instance
const musicEngine = new MusicEngine();

// Export simple functions for easy use
export const playPattern = (pattern: Array<{time: number, type: 'kick' | 'snare' | 'hihat' | 'note', freq?: number}>, bpm?: number, loop?: boolean) => 
  musicEngine.playPattern(pattern, bpm, loop);

export const playNote = (frequency: number, duration?: number, type?: OscillatorType) => 
  musicEngine.playNote(frequency, duration, type);

export const playDrum = (type: 'kick' | 'snare' | 'hihat') => 
  musicEngine.playDrum(type);

export const stopMusic = () => musicEngine.stop();

export const enableAudioOnInteraction = () => musicEngine.enableAudioOnInteraction();

// Export the engine instance if you need more control
export default musicEngine;
