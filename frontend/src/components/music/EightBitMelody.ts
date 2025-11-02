// Define note frequencies - includes minor intervals for nostalgic, ambient sound
const NOTE_FREQUENCIES = {
  C2: 65.41,
  D2: 73.42,
  E2: 82.41,
  F2: 87.31,
  G2: 98.00,
  A2: 110.00,
  B2: 123.47,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.00,
  A3: 220.00,
  B3: 246.94,
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
  C6: 1046.50,
  D6: 1174.66,
  E6: 1318.51,
  // Minor intervals for nostalgic mood
  Eb2: 77.78,
  Eb3: 155.56,
  Eb4: 311.13,
  Ab2: 103.83,
  Ab3: 207.65,
  Ab4: 415.30,
  Bb2: 116.54,
  Bb3: 233.08,
  Bb4: 466.16
} as const;

// Classic boom bap piano chords (Fm7 ↔︎ Ebmaj7) on swung offbeats — sparse, higher voicing
const PIANO_CHORDS: Array<{time: number, type: 'note', freq: number}> = [
  // Bar 1 — Fm7 only at 1.5 (upper inversion)
  { time: 1.5 + 0.06, type: 'note', freq: NOTE_FREQUENCIES.F4 },
  { time: 1.5 + 0.06, type: 'note', freq: NOTE_FREQUENCIES.Ab4 },
  { time: 1.5 + 0.06, type: 'note', freq: NOTE_FREQUENCIES.C5 },
  { time: 1.5 + 0.06, type: 'note', freq: NOTE_FREQUENCIES.Eb4 },

  // Bar 2 — Ebmaj7 only at 5.5 (upper inversion)
  { time: 5.5 + 0.06, type: 'note', freq: NOTE_FREQUENCIES.Eb4 },
  { time: 5.5 + 0.06, type: 'note', freq: NOTE_FREQUENCIES.G4 },
  { time: 5.5 + 0.06, type: 'note', freq: NOTE_FREQUENCIES.Bb4 },
  { time: 5.5 + 0.06, type: 'note', freq: NOTE_FREQUENCIES.D5 },
];

// Simple sub bassline following F–Eb–Ab–Bb
const SUB_BASS_LINE: Array<{time: number, type: 'note', freq: number}> = [
  { time: 0, type: 'note', freq: NOTE_FREQUENCIES.F2 },
  { time: 4, type: 'note', freq: NOTE_FREQUENCIES.Eb2 }
];

// Boom bap drum groove with slight swing on offbeats (classic backbeats)
const BOOM_BAP_DRUMS: Array<{time: number, type: 'kick' | 'snare' | 'hihat'}> = [
  // Bar 1
  { time: 0, type: 'kick' },
  { time: 0.5 + 0.06, type: 'hihat' },
  { time: 1, type: 'hihat' },
  { time: 1.5 + 0.06, type: 'hihat' },
  { time: 1.5, type: 'kick' },
  { time: 2, type: 'snare' },
  { time: 2.5 + 0.06, type: 'hihat' },
  { time: 3, type: 'hihat' },
  { time: 3, type: 'kick' },
  { time: 3.5 + 0.06, type: 'hihat' },
  // Bar 2
  { time: 4, type: 'kick' },
  { time: 4.5 + 0.06, type: 'hihat' },
  { time: 5, type: 'hihat' },
  { time: 5, type: 'kick' },
  { time: 5.5 + 0.06, type: 'hihat' },
  { time: 6, type: 'snare' },
  { time: 6.5 + 0.06, type: 'hihat' },
  { time: 7, type: 'hihat' },
  { time: 7, type: 'kick' },
  { time: 7.5 + 0.06, type: 'hihat' },
];

export const EIGHT_BIT_PATTERN: Array<{time: number, type: 'kick' | 'snare' | 'hihat' | 'note', freq?: number}> = [
  // Classic Boom Bap: Sub bass + chord stabs + swung drums
  ...SUB_BASS_LINE,
  ...PIANO_CHORDS,
  ...BOOM_BAP_DRUMS
];

// Boom bap tempo (slower for more space)
export const EIGHT_BIT_BPM = 88;
