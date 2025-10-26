// Define note frequencies for 8-bit style melody
// Using C major scale for a bright, cheerful sound
const NOTE_FREQUENCIES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  B5: 987.77,
  C6: 1046.50
} as const;

// Complex 8-bit melody pattern - Section A
// More intricate patterns with faster note sequences
const MELODY_SECTION_A: Array<{time: number, type: 'note', freq: number}> = [
  // Fast opening arpeggio
  { time: 0, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 0.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 1, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 1.5, type: 'note', freq: NOTE_FREQUENCIES.C6 },
  { time: 2, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 2.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  
  // Syncopated melody
  { time: 3, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 3.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 4, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 4.25, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 4.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 5, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 5.5, type: 'note', freq: NOTE_FREQUENCIES.B4 },
  
  // Quick run
  { time: 6, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 6.25, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 6.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 6.75, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 7, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 7.5, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  
  // Descending with rhythm
  { time: 8, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 8.5, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 9, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 9.25, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 9.5, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 10, type: 'note', freq: NOTE_FREQUENCIES.B4 },
  { time: 10.5, type: 'note', freq: NOTE_FREQUENCIES.A4 },
  
  // Ending phrase
  { time: 11, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 11.5, type: 'note', freq: NOTE_FREQUENCIES.A4 },
  { time: 12, type: 'note', freq: NOTE_FREQUENCIES.B4 },
  { time: 13, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 14, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 15, type: 'note', freq: NOTE_FREQUENCIES.C5 }
];

// Complex 8-bit melody pattern - Section B (variation)
// More intricate with different rhythmic patterns
const MELODY_SECTION_B: Array<{time: number, type: 'note', freq: number}> = [
  // Energetic opening
  { time: 16, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 16.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 17, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 17.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 18, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 18.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 19, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 19.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  
  // Triplet-like pattern
  { time: 20, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 20.33, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 20.66, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 21, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 21.5, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 22, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 22.5, type: 'note', freq: NOTE_FREQUENCIES.C6 },
  
  // Fast descending run
  { time: 23, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 23.25, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 23.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 23.75, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 24, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 24.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  
  // Melodic phrase
  { time: 25, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 25.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 26, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 26.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 27, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 27.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  
  // Final resolution
  { time: 28, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 28.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 29, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 29.5, type: 'note', freq: NOTE_FREQUENCIES.B4 },
  { time: 30, type: 'note', freq: NOTE_FREQUENCIES.A4 },
  { time: 30.5, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 31, type: 'note', freq: NOTE_FREQUENCIES.C5 }
];

// Enhanced drum beat with hi-hats for more energy
// More complex 4/4 pattern with kick, snare, and hi-hats
const DRUM_BEAT: Array<{time: number, type: 'kick' | 'snare' | 'hihat'}> = [
  // Section A (measures 1-4) - with hi-hats
  { time: 0, type: 'kick' },
  { time: 1, type: 'hihat' },
  { time: 2, type: 'snare' },
  { time: 3, type: 'hihat' },
  { time: 4, type: 'kick' },
  { time: 5, type: 'hihat' },
  { time: 6, type: 'snare' },
  { time: 7, type: 'hihat' },
  { time: 8, type: 'kick' },
  { time: 9, type: 'hihat' },
  { time: 10, type: 'snare' },
  { time: 11, type: 'hihat' },
  { time: 12, type: 'kick' },
  { time: 13, type: 'hihat' },
  { time: 14, type: 'snare' },
  { time: 15, type: 'hihat' },
  
  // Section B (measures 5-8) - with hi-hats
  { time: 16, type: 'kick' },
  { time: 17, type: 'hihat' },
  { time: 18, type: 'snare' },
  { time: 19, type: 'hihat' },
  { time: 20, type: 'kick' },
  { time: 21, type: 'hihat' },
  { time: 22, type: 'snare' },
  { time: 23, type: 'hihat' },
  { time: 24, type: 'kick' },
  { time: 25, type: 'hihat' },
  { time: 26, type: 'snare' },
  { time: 27, type: 'hihat' },
  { time: 28, type: 'kick' },
  { time: 29, type: 'hihat' },
  { time: 30, type: 'snare' },
  { time: 31, type: 'hihat' }
];

// Bass line - walking bass with more movement
const BASS_LINE: Array<{time: number, type: 'note', freq: number}> = [
  // Section A bass - walking pattern
  { time: 0, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  { time: 1, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 2, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 3, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  { time: 4, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 5, type: 'note', freq: NOTE_FREQUENCIES.A4 },
  { time: 6, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 7, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 8, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  { time: 9, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 10, type: 'note', freq: NOTE_FREQUENCIES.A4 },
  { time: 11, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 12, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 13, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 14, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 15, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  
  // Section B bass - more active
  { time: 16, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 17, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 18, type: 'note', freq: NOTE_FREQUENCIES.B4 },
  { time: 19, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 20, type: 'note', freq: NOTE_FREQUENCIES.D4 },
  { time: 21, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 22, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 23, type: 'note', freq: NOTE_FREQUENCIES.A4 },
  { time: 24, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  { time: 25, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 26, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 27, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 28, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 29, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 30, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 31, type: 'note', freq: NOTE_FREQUENCIES.C4 }
];

// Harmony line - plays alongside main melody for richness
const HARMONY_LINE: Array<{time: number, type: 'note', freq: number}> = [
  // Section A harmony (thirds and fifths)
  { time: 0, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 0.5, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 1, type: 'note', freq: NOTE_FREQUENCIES.B4 },
  { time: 1.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 3, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 4, type: 'note', freq: NOTE_FREQUENCIES.A4 },
  { time: 5, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 6, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 7, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 8, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 9, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 11, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 13, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  
  // Section B harmony
  { time: 16, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 16.5, type: 'note', freq: NOTE_FREQUENCIES.B4 },
  { time: 17, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 18, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 19, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 20, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 21, type: 'note', freq: NOTE_FREQUENCIES.A4 },
  { time: 22, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 23, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 25, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 26, type: 'note', freq: NOTE_FREQUENCIES.B4 },
  { time: 28, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 29, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 31, type: 'note', freq: NOTE_FREQUENCIES.E4 }
];

// Arpeggio layer - fast repeating patterns for texture
const ARPEGGIO_LAYER: Array<{time: number, type: 'note', freq: number}> = [
  // Section A - fast arpeggios
  { time: 0, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 0.25, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 0.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 0.75, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 2, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 2.25, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 2.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 2.75, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 4, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 4.25, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 4.5, type: 'note', freq: NOTE_FREQUENCIES.C6 },
  { time: 4.75, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 6, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 6.25, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 6.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 6.75, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 8, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 8.25, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 8.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 8.75, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 10, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 10.25, type: 'note', freq: NOTE_FREQUENCIES.C6 },
  { time: 10.5, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 10.75, type: 'note', freq: NOTE_FREQUENCIES.C6 },
  { time: 12, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 12.25, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 12.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 12.75, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 14, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 14.25, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 14.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 14.75, type: 'note', freq: NOTE_FREQUENCIES.C6 },
  
  // Section B - varied arpeggios
  { time: 16, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 16.25, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 16.5, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 16.75, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 18, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 18.25, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 18.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 18.75, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 20, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 20.25, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 20.5, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 20.75, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 22, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 22.25, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 22.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 22.75, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 24, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 24.25, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 24.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 24.75, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 26, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 26.25, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 26.5, type: 'note', freq: NOTE_FREQUENCIES.C6 },
  { time: 26.75, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 28, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 28.25, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 28.5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 28.75, type: 'note', freq: NOTE_FREQUENCIES.B5 },
  { time: 30, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 30.25, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 30.5, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 30.75, type: 'note', freq: NOTE_FREQUENCIES.C6 }
];

// Counter-melody - weaves between the main melody
const COUNTER_MELODY: Array<{time: number, type: 'note', freq: number}> = [
  // Section A counter
  { time: 1, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 2, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 3, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 5, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 7, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 9, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 10, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 11, type: 'note', freq: NOTE_FREQUENCIES.F5 },
  { time: 13, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 15, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  
  // Section B counter
  { time: 17, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 19, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 21, type: 'note', freq: NOTE_FREQUENCIES.D5 },
  { time: 23, type: 'note', freq: NOTE_FREQUENCIES.E5 },
  { time: 25, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 27, type: 'note', freq: NOTE_FREQUENCIES.A5 },
  { time: 29, type: 'note', freq: NOTE_FREQUENCIES.G5 },
  { time: 31, type: 'note', freq: NOTE_FREQUENCIES.E5 }
];

// Combine all layers for rich, complex 8-bit sound
export const EIGHT_BIT_PATTERN: Array<{time: number, type: 'kick' | 'snare' | 'hihat' | 'note', freq?: number}> = [
  ...MELODY_SECTION_A,
  ...MELODY_SECTION_B,
  ...BASS_LINE,
  ...HARMONY_LINE,
  ...ARPEGGIO_LAYER,
  ...COUNTER_MELODY,
  ...DRUM_BEAT
];

// Moderate tempo for a groovy feel
export const EIGHT_BIT_BPM = 110;
