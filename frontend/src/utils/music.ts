// Simple music utility for playing programmatic patterns

class MusicEngine {
  private audioContext: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private isInitialized = false;
  private isSuspended = false;
  private loopInterval: number | null = null;
  private isLooping = false;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private bufferSources: AudioBufferSourceNode[] = [];
  private convolver: ConvolverNode | null = null;
  private reverbGain: GainNode | null = null;

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
      // Initialize master chain (compressor -> masterGain -> destination)
      if (!this.compressor) {
        this.compressor = this.audioContext.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-24, this.audioContext.currentTime);
        this.compressor.knee.setValueAtTime(30, this.audioContext.currentTime);
        this.compressor.ratio.setValueAtTime(4, this.audioContext.currentTime);
        this.compressor.attack.setValueAtTime(0.03, this.audioContext.currentTime);
        this.compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);
      }
      if (!this.masterGain) {
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.setValueAtTime(0.6, this.audioContext.currentTime);
      }
      // Connect once
      if (this.compressor && this.masterGain) {
        try {
          this.compressor.disconnect();
        } catch { }
        try {
          this.masterGain.disconnect();
        } catch { }
        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.audioContext.destination);
      }
      // Prepare a reusable white noise buffer
      if (!this.noiseBuffer) {
        const seconds = 1.0;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, seconds * sampleRate, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.random() * 2 - 1; // white noise
        }
        this.noiseBuffer = buffer;
      }

      if (!this.convolver) {
        const sampleRate = this.audioContext.sampleRate;
        const length = Math.floor(sampleRate * 0.6);
        const impulse = this.audioContext.createBuffer(2, length, sampleRate);
        for (let ch = 0; ch < impulse.numberOfChannels; ch++) {
          const data = impulse.getChannelData(ch);
          for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            const decay = Math.exp(-3.5 * t);
            data[i] = (Math.random() * 2 - 1) * decay;
          }
        }
        this.convolver = this.audioContext.createConvolver();
        this.convolver.buffer = impulse;
        this.reverbGain = this.audioContext.createGain();
        this.reverbGain.gain.setValueAtTime(0.09, this.audioContext.currentTime);
        this.reverbGain.connect(this.convolver);
        if (this.masterGain) {
          this.convolver.connect(this.masterGain);
        }
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
    this.bufferSources.forEach(src => {
      try {
        src.stop();
      } catch (e) {
        // Source might already be stopped
      }
    });
    this.bufferSources = [];
    this.gainNodes.forEach(gain => {
      try {
        gain.disconnect();
      } catch (e) {
        // Node might already be disconnected
      }
    });
    this.gainNodes = [];
  }

  private createNoiseSource(): AudioBufferSourceNode | null {
    if (!this.audioContext || !this.noiseBuffer) return null;
    const source = this.audioContext.createBufferSource();
    source.buffer = this.noiseBuffer;
    source.loop = false;
    return source;
  }

  private playNoteAtTime(frequency: number, duration: number, startTime: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    // Reese-style bass: dual detuned saws with lowpass for bass freqs
    if (frequency < 200) {
      const osc1 = this.audioContext.createOscillator();
      const osc2 = this.audioContext.createOscillator();
      const lp = this.audioContext.createBiquadFilter();
      const saturator = this.audioContext.createWaveShaper();
      const gainNode = this.audioContext.createGain();
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      const sub = this.audioContext.createOscillator();
      const subGain = this.audioContext.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(frequency, startTime);
      osc2.frequency.setValueAtTime(frequency, startTime);
      // slight detune
      osc1.detune.setValueAtTime(-3, startTime);
      osc2.detune.setValueAtTime(3, startTime);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.25, startTime);
      lfoGain.gain.setValueAtTime(0, startTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.detune);
      lfoGain.connect(osc2.detune);

      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(700, startTime);
      lp.Q.setValueAtTime(0.7, startTime);

      const curveLen = 44100;
      const curve = new Float32Array(curveLen);
      const k = 1.4;
      for (let i = 0; i < curveLen; i++) {
        const x = (i / (curveLen - 1)) * 2 - 1;
        curve[i] = Math.tanh(k * x);
      }
      saturator.curve = curve;
      saturator.oversample = '2x';

      gainNode.gain.setValueAtTime(0.0001, startTime);
      // Ramp up to audible level for the saw texture
      gainNode.gain.linearRampToValueAtTime(0.0001, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration - 0.03);
      gainNode.gain.setTargetAtTime(0.0001, startTime + duration - 0.03, 0.01);

      sub.type = 'sine';
      sub.frequency.setValueAtTime(frequency, startTime);
      subGain.gain.setValueAtTime(0.0001, startTime);
      subGain.gain.linearRampToValueAtTime(0.08, startTime + 0.012);
      subGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.03);
      subGain.gain.setTargetAtTime(0.0001, startTime + duration - 0.03, 0.01);

      osc1.connect(lp);
      osc2.connect(lp);
      sub.connect(subGain);
      lp.connect(saturator);
      saturator.connect(gainNode);
      if (this.compressor) {
        gainNode.connect(this.compressor);
      } else {
        gainNode.connect(this.audioContext.destination);
      }

      if (this.compressor) {
        subGain.connect(this.compressor);
      } else {
        subGain.connect(this.audioContext.destination);
      }

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.03);
      osc2.stop(startTime + duration + 0.03);
      lfo.start(startTime);
      lfo.stop(startTime + duration + 0.03);
      sub.start(startTime);
      sub.stop(startTime + duration + 0.03);

      this.oscillators.push(osc1, osc2, lfo, sub);
      this.gainNodes.push(gainNode, lfoGain, subGain);
      return;
    }

    // Default melody path: Warm Rhodes-style Electric Piano
    const fund = this.audioContext.createOscillator();
    const fundGain = this.audioContext.createGain();
    const overt1 = this.audioContext.createOscillator(); // 2nd harmonic (octave) for body
    const overt1Gain = this.audioContext.createGain();
    const overt2 = this.audioContext.createOscillator(); // 3rd harmonic (fifth) for bell tone
    const overt2Gain = this.audioContext.createGain();

    // Tremolo Effect
    const tremoloLFO = this.audioContext.createOscillator();
    const tremoloGain = this.audioContext.createGain(); // This modulates the main volume
    const tremoloDepth = this.audioContext.createGain();

    const lpLead = this.audioContext.createBiquadFilter();
    const envGain = this.audioContext.createGain();
    const pan = this.audioContext.createStereoPanner();

    // Soft Hammer (Thump)
    const hammerSrc = this.createNoiseSource();
    const hammerBP = this.audioContext.createBiquadFilter();
    const hammerGain = this.audioContext.createGain();

    // Oscillator setup - SINE waves for warm EP tone
    fund.type = 'sine';
    fund.frequency.setValueAtTime(frequency, startTime);
    overt1.type = 'sine';
    overt1.frequency.setValueAtTime(frequency * 2, startTime);
    overt2.type = 'sine';
    overt2.frequency.setValueAtTime(frequency * 3, startTime);

    // Slight detune for analog warmth
    fund.detune.setValueAtTime((Math.random() * 2 - 1) * 3, startTime);
    overt1.detune.setValueAtTime((Math.random() * 2 - 1) * 3, startTime);

    // Balance - Fundamental is king for Rhodes
    fundGain.gain.setValueAtTime(0.8, startTime);
    overt1Gain.gain.setValueAtTime(0.15, startTime);
    overt2Gain.gain.setValueAtTime(0.05, startTime);

    // Harmonics decay faster = Tine sound
    overt2Gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
    overt1Gain.gain.exponentialRampToValueAtTime(0.05, startTime + 0.3);

    // Filter - Much darker now
    lpLead.type = 'lowpass';
    lpLead.Q.setValueAtTime(0, startTime); // Flat resonance
    lpLead.frequency.setValueAtTime(1500, startTime); // Start lower
    lpLead.frequency.exponentialRampToValueAtTime(300, startTime + 0.4); // Sweep down to warm low-mids

    // Amplitude Envelope - Softer attack to avoid clicks
    envGain.gain.setValueAtTime(0.0001, startTime);
    envGain.gain.linearRampToValueAtTime(0.25, startTime + 0.02); // 20ms attack (was 4ms)
    envGain.gain.linearRampToValueAtTime(0.15, startTime + 0.2);

    // Release - smooth fade out
    const releaseTime = 0.15;
    envGain.gain.setTargetAtTime(0.0001, startTime + duration - releaseTime, 0.04);

    // Tremolo Setup
    tremoloLFO.type = 'sine';
    tremoloLFO.frequency.setValueAtTime(5, startTime); // 5Hz wobble

    tremoloGain.gain.setValueAtTime(1, startTime); // Unity gain base

    // Connect LFO to tremolo gain
    // We want gain to oscillate between 0.8 and 1.2 roughly
    tremoloDepth.gain.setValueAtTime(0.15, startTime);
    tremoloLFO.connect(tremoloDepth);
    tremoloDepth.connect(tremoloGain.gain);

    // Hammer noise (Subtler thump)
    hammerBP.type = 'lowpass';
    hammerBP.frequency.setValueAtTime(200, startTime);
    hammerGain.gain.setValueAtTime(0.04, startTime);
    hammerGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.02);

    // Routing
    fund.connect(fundGain);
    overt1.connect(overt1Gain);
    overt2.connect(overt2Gain);

    fundGain.connect(lpLead);
    overt1Gain.connect(lpLead);
    overt2Gain.connect(lpLead);

    lpLead.connect(tremoloGain); // Insert Tremolo
    tremoloGain.connect(pan);

    // Pan
    const panVal = Math.max(-0.25, Math.min(0.25, (frequency - 400) / 1000));
    pan.pan.setValueAtTime(panVal, startTime);

    pan.connect(envGain);

    // Master out
    const dest = this.compressor ?? this.audioContext.destination;
    envGain.connect(dest);
    if (this.reverbGain) {
      envGain.connect(this.reverbGain);
    }

    if (hammerSrc) {
      hammerSrc.connect(hammerBP);
      hammerBP.connect(hammerGain);
      hammerGain.connect(dest);
      hammerSrc.start(startTime);
      hammerSrc.stop(startTime + 0.03);
      this.bufferSources.push(hammerSrc);
      this.gainNodes.push(hammerGain);
    }

    // Start/Stop with safety margin
    const safetyMargin = 0.2;
    fund.start(startTime);
    overt1.start(startTime);
    overt2.start(startTime);
    tremoloLFO.start(startTime);

    fund.stop(startTime + duration + safetyMargin);
    overt1.stop(startTime + duration + safetyMargin);
    overt2.stop(startTime + duration + safetyMargin);
    tremoloLFO.stop(startTime + duration + safetyMargin);

    this.oscillators.push(fund, overt1, overt2, tremoloLFO);
    this.gainNodes.push(fundGain, overt1Gain, overt2Gain, envGain, tremoloGain, tremoloDepth);
  }

  private playDrumSound(type: 'kick' | 'snare' | 'hihat', startTime: number) {
    if (!this.audioContext) return;
    const dest = this.compressor ?? this.audioContext.destination;

    if (type === 'kick') {
      // Main kick tone - sine with fast downward pitch envelope
      const osc = this.audioContext.createOscillator();
      const oscGain = this.audioContext.createGain();
      const sumGain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(85, startTime);
      // Sweep pitch faster (0.08s) and deeper (30Hz) to avoid hanging in the bass frequency range
      osc.frequency.exponentialRampToValueAtTime(30, startTime + 0.08);

      oscGain.gain.setValueAtTime(0, startTime);
      oscGain.gain.linearRampToValueAtTime(0.5, startTime + 0.012);
      // Shorter tail to clear the mud
      oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.16);

      const clickSrc = this.createNoiseSource();
      const clickGain = this.audioContext.createGain();
      if (clickSrc) {
        clickGain.gain.setValueAtTime(0.08, startTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);
        clickSrc.connect(clickGain);
        clickGain.connect(sumGain);
        clickSrc.start(startTime);
        clickSrc.stop(startTime + 0.05);
        this.bufferSources.push(clickSrc);
        this.gainNodes.push(clickGain);
      }

      osc.connect(oscGain);
      oscGain.connect(sumGain);
      sumGain.connect(dest);

      osc.start(startTime);
      osc.stop(startTime + 0.25);

      this.oscillators.push(osc);
      this.gainNodes.push(oscGain, sumGain);

    } else if (type === 'snare') {
      // Snare: triangle tone + bandpassed noise burst
      const osc = this.audioContext.createOscillator();
      const oscGain = this.audioContext.createGain();
      const noiseSrc = this.createNoiseSource();
      const noiseFilter = this.audioContext.createBiquadFilter();
      const noiseGain = this.audioContext.createGain();
      const sumGain = this.audioContext.createGain();

      // Tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, startTime);
      osc.frequency.exponentialRampToValueAtTime(150, startTime + 0.12);
      oscGain.gain.setValueAtTime(0, startTime);
      oscGain.gain.linearRampToValueAtTime(0.14, startTime + 0.002);
      oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

      // Noise
      if (noiseSrc) {
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1500, startTime);
        noiseFilter.Q.setValueAtTime(0.8, startTime);
        noiseGain.gain.setValueAtTime(0, startTime);
        noiseGain.gain.linearRampToValueAtTime(0.2, startTime + 0.002);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.11);
        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(sumGain);
        noiseSrc.start(startTime);
        noiseSrc.stop(startTime + 0.12);
        this.bufferSources.push(noiseSrc);
        this.gainNodes.push(noiseGain);
      }

      osc.connect(oscGain);
      oscGain.connect(sumGain);
      sumGain.connect(dest);

      osc.start(startTime);
      osc.stop(startTime + 0.20);
      this.oscillators.push(osc);
      this.gainNodes.push(oscGain, sumGain);

    } else if (type === 'hihat') {
      // Hihat: highpassed noise burst
      const noiseSrc = this.createNoiseSource();
      if (!noiseSrc) return;
      const bp = this.audioContext.createBiquadFilter();
      const hp = this.audioContext.createBiquadFilter();
      const pan = this.audioContext.createStereoPanner();
      const gain = this.audioContext.createGain();

      // Slight randomization per hit for natural feel
      const bpCenter = 8800 + (Math.random() * 800 - 400); // 8.8kHz ±400Hz
      const hpCut = 5200 + (Math.random() * 600 - 300);    // 5.2kHz ±300Hz
      const vel = 0.1 + Math.random() * 0.05;              // 0.10 - 0.15
      const panVal = (Math.random() * 0.1) - 0.05;         // -0.05 to 0.05

      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(bpCenter, startTime);
      bp.Q.setValueAtTime(1.1, startTime);

      hp.type = 'highpass';
      hp.frequency.setValueAtTime(hpCut, startTime);
      hp.Q.setValueAtTime(0.9, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(vel, startTime + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);
      gain.gain.setTargetAtTime(0.0001, startTime + 0.04, 0.01);

      pan.pan.setValueAtTime(panVal, startTime);

      noiseSrc.connect(bp);
      bp.connect(hp);
      hp.connect(gain);
      gain.connect(pan);
      pan.connect(dest);

      noiseSrc.start(startTime);
      // Give the tail enough time to fully decay (at least 5-6x time constants)
      noiseSrc.stop(startTime + 0.15);
      this.bufferSources.push(noiseSrc);
      this.gainNodes.push(gain);
    }
  }

  // Play a simple pattern with looping
  async playPattern(pattern: Array<{ time: number, type: 'kick' | 'snare' | 'hihat' | 'note', freq?: number }>, bpm: number = 120, loop: boolean = true) {
    await this.init();
    if (!this.audioContext) return;

    this.stopAllSounds();

    const beatDuration = 60 / bpm;
    const maxTime = Math.max(...pattern.map(p => p.time));
    // Snap to the next whole beat so swing offsets don't extend the loop
    const patternDuration = Math.floor(maxTime) + 1; // in beats
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
          // Short, stabby melody; bass holds nearly a bar at current BPM
          const duration = freq < 200 ? 3.8 * beatDuration : 0.8;
          // Use triangle for a softer vaporwave timbre
          const oscType = 'triangle';
          this.playNoteAtTime(freq, duration, startTime, oscType);
        }
      });
    };

    // Play the pattern once immediately
    playPatternOnce();

    // Set up looping if requested
    if (loop) {
      this.isLooping = true;
      this.loopInterval = window.setInterval(() => {
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
export const playPattern = (pattern: Array<{ time: number, type: 'kick' | 'snare' | 'hihat' | 'note', freq?: number }>, bpm?: number, loop?: boolean) =>
  musicEngine.playPattern(pattern, bpm, loop);

export const playNote = (frequency: number, duration?: number, type?: OscillatorType) =>
  musicEngine.playNote(frequency, duration, type);

export const playDrum = (type: 'kick' | 'snare' | 'hihat') =>
  musicEngine.playDrum(type);

export const stopMusic = () => musicEngine.stop();

export const enableAudioOnInteraction = () => musicEngine.enableAudioOnInteraction();

// Export the engine instance if you need more control
export default musicEngine;
