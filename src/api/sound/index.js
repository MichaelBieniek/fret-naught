import { WESTERN_NOTES } from '../../music/theory/western';

const NOTE_TO_HZ_MAP = {
  0: [16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87],
  1: [32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49.0, 51.91, 55.0, 58.27, 61.74],
  2: [65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98.0, 103.8, 110.0, 116.5, 123.5],
  3: [130.8, 138.6, 146.8, 155.6, 164.8, 174.6, 185.0, 196.0, 207.7, 220.0, 233.1, 246.9],
  4: [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9],
  5: [523.3, 554.4, 587.3, 622.3, 659.3, 698.5, 740.0, 784.0, 830.6, 880.0, 932.3, 987.8],
  6: [1047, 1109, 1175, 1245, 1319, 1397, 1480, 1568, 1661, 1760, 1865, 1976],
  7: [2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136, 3322, 3520, 3729, 3951],
  8: [4186, 4435, 4699, 4978, 5274, 5588, 5920, 6272, 6645, 7040, 7459, 7902],
};

const noteToHz = (note) => {
  const [letter, octave] = note.split('/');
  const noteInd = WESTERN_NOTES.findIndex((x) => x === letter);
  return NOTE_TO_HZ_MAP[octave][noteInd];
};

const audioChannels = [
  new AudioContext(),
  new AudioContext(),
  new AudioContext(),
  new AudioContext(),
  new AudioContext(),
  new AudioContext(),
];

export const playNote = async (note, string) => {
  const hz = noteToHz(note);
  console.log(`Playing ${hz} Hz`);
  const audioContext = audioChannels[string];
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.value = hz;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(0);
  gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);

  return `Playing ${hz} Hz`;
};

export const playChord = (notes) => {
  //Promise.all[];
};
