// Define note frequencies - expanded for jazz harmony
const NOTE_FREQUENCIES = {
  // Octave 2 (Bass)
  C2: 65.41, Db2: 69.30, D2: 73.42, Eb2: 77.78, E2: 82.41, F2: 87.31, Gb2: 92.50, G2: 98.00, Ab2: 103.83, A2: 110.00, Bb2: 116.54, B2: 123.47,
  // Octave 3 (Lower Mids)
  C3: 130.81, Db3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, Gb3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  // Octave 4 (Chords/Mids)
  C4: 261.63, Db4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Gb4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  // Octave 5 (Melody)
  C5: 523.25, Db5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Gb5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.00, Bb5: 932.33, B5: 987.77,
  // Octave 6 (High Melody)
  C6: 1046.50, D6: 1174.66, Eb6: 1244.51, E6: 1318.51
} as const;

// Lofi Chord Progression (4 Bar Loop):
// Bar 1: Fm9 (ii)
// Bar 2: Bb13 (V)
// Bar 3: Ebmaj9 (I)
// Bar 4: C7alt (VI - turnaround)
const PIANO_CHORDS: Array<{ time: number, type: 'note', freq: number }> = [
  // --- Bar 1: Fm9 (F bass played separately) ---
  // Voicing: Ab, C, Eb, G (3, 5, 7, 9)
  { time: 0.1, type: 'note', freq: NOTE_FREQUENCIES.Ab3 },
  { time: 0.1, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  { time: 0.1, type: 'note', freq: NOTE_FREQUENCIES.Eb4 },
  { time: 0.1, type: 'note', freq: NOTE_FREQUENCIES.G4 },

  // Strum/Ghost chord
  { time: 2.5, type: 'note', freq: NOTE_FREQUENCIES.Ab3 },
  { time: 2.5, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  { time: 2.5, type: 'note', freq: NOTE_FREQUENCIES.G4 },

  // --- Bar 2: Bb13 (Bb bass played separately) ---
  // Voicing: Ab, C, D, G (7, 9, 3, 13)
  { time: 4.1, type: 'note', freq: NOTE_FREQUENCIES.Ab3 },
  { time: 4.1, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  { time: 4.1, type: 'note', freq: NOTE_FREQUENCIES.D4 },
  { time: 4.1, type: 'note', freq: NOTE_FREQUENCIES.G4 },

  // --- Bar 3: Ebmaj9 (Eb bass played separately) ---
  // Voicing: G, Bb, D, F (3, 5, 7, 9)
  { time: 8.1, type: 'note', freq: NOTE_FREQUENCIES.G3 },
  { time: 8.1, type: 'note', freq: NOTE_FREQUENCIES.Bb3 },
  { time: 8.1, type: 'note', freq: NOTE_FREQUENCIES.D4 },
  { time: 8.1, type: 'note', freq: NOTE_FREQUENCIES.F4 },

  // --- Bar 4: C7alt (C bass played separately) ---
  // Voicing: Bb, Db, E, Ab (7, b9, 3, b13)
  { time: 12.1, type: 'note', freq: NOTE_FREQUENCIES.Bb3 },
  { time: 12.1, type: 'note', freq: NOTE_FREQUENCIES.Db4 },
  { time: 12.1, type: 'note', freq: NOTE_FREQUENCIES.E4 },
  { time: 12.1, type: 'note', freq: NOTE_FREQUENCIES.Ab4 },
];

const SUB_BASS_LINE: Array<{ time: number, type: 'note', freq: number }> = [
  // Bar 1: F
  { time: 0, type: 'note', freq: NOTE_FREQUENCIES.F2 },
  { time: 3.5, type: 'note', freq: NOTE_FREQUENCIES.F2 }, // syncopated pickup
  // Bar 2: Bb
  { time: 4, type: 'note', freq: NOTE_FREQUENCIES.Bb2 },
  // Bar 3: Eb
  { time: 8, type: 'note', freq: NOTE_FREQUENCIES.Eb2 },
  { time: 10, type: 'note', freq: NOTE_FREQUENCIES.Eb2 },
  // Bar 4: C -> descends to F logically
  { time: 12, type: 'note', freq: NOTE_FREQUENCIES.C3 },
  { time: 14, type: 'note', freq: NOTE_FREQUENCIES.C2 },
];

const LEAD_MELODY: Array<{ time: number, type: 'note', freq: number }> = [
  // Phrase 1 (over Fm9): C - Bb - G ... F
  { time: 0.5, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 1.0, type: 'note', freq: NOTE_FREQUENCIES.Bb4 },
  { time: 1.5, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 2.5, type: 'note', freq: NOTE_FREQUENCIES.F4 },

  // Phrase 2 (over Bb13): G - F - Eb ... C
  { time: 4.5, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 5.0, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 5.5, type: 'note', freq: NOTE_FREQUENCIES.Eb4 },
  { time: 6.5, type: 'note', freq: NOTE_FREQUENCIES.C4 },

  // Phrase 3 (over Ebmaj9): D - C - Bb ... G
  { time: 8.5, type: 'note', freq: NOTE_FREQUENCIES.D4 },
  { time: 9.0, type: 'note', freq: NOTE_FREQUENCIES.C4 },
  { time: 9.5, type: 'note', freq: NOTE_FREQUENCIES.Bb3 },
  { time: 10.5, type: 'note', freq: NOTE_FREQUENCIES.G3 },

  // Phrase 4 (High flourish over turnaround): Bb4 - C5 - Eb5 - F5
  { time: 13.5, type: 'note', freq: NOTE_FREQUENCIES.Bb4 },
  { time: 14.0, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 14.5, type: 'note', freq: NOTE_FREQUENCIES.Eb5 },
  { time: 15.0, type: 'note', freq: NOTE_FREQUENCIES.F5 },
];

const LOFI_DRUMS: Array<{ time: number, type: 'kick' | 'snare' | 'hihat' }> = [
  // --- Pattern repeats every 4 beats, slightly varied ---

  // Bar 1
  { time: 0, type: 'kick' },
  { time: 0.52, type: 'hihat' }, // swing
  { time: 1, type: 'hihat' },
  { time: 1.52, type: 'hihat' },
  { time: 2, type: 'snare' },
  { time: 2.5, type: 'kick' },   // kick on offbeat
  { time: 3, type: 'hihat' },
  { time: 3.52, type: 'kick' },  // kick pickup

  // Bar 2
  { time: 4, type: 'kick' },
  { time: 4.52, type: 'hihat' },
  { time: 5, type: 'hihat' },
  { time: 5.52, type: 'kick' },
  { time: 6, type: 'snare' },
  { time: 6.52, type: 'hihat' },
  { time: 7, type: 'hihat' },
  { time: 7.52, type: 'hihat' },

  // Bar 3
  { time: 8, type: 'kick' },
  { time: 8.52, type: 'hihat' },
  { time: 9, type: 'hihat' },
  { time: 9.52, type: 'hihat' },
  { time: 10, type: 'snare' },
  { time: 10.5, type: 'kick' },
  { time: 11, type: 'hihat' },
  { time: 11.52, type: 'kick' },

  // Bar 4 (Fills)
  { time: 12, type: 'kick' },
  { time: 12.52, type: 'hihat' },
  { time: 13, type: 'hihat' },
  { time: 13.52, type: 'kick' },
  { time: 14, type: 'snare' },
  { time: 14.25, type: 'snare' }, // Ghost snare
  { time: 14.52, type: 'hihat' },
  { time: 15, type: 'hihat' },
  { time: 15.52, type: 'hihat' },
];

export const EIGHT_BIT_PATTERN: Array<{ time: number, type: 'kick' | 'snare' | 'hihat' | 'note', freq?: number }> = [
  ...SUB_BASS_LINE,
  ...PIANO_CHORDS,
  ...LEAD_MELODY,
  ...LOFI_DRUMS
];

// Chill Tempo
export const EIGHT_BIT_BPM = 84;
