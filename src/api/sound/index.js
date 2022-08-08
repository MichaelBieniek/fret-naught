import { WESTERN_NOTES } from '../../music/theory/western';
import AMaj from './chords/AMaj.mp3';
import Am from './chords/Am.mp3';
import BMaj from './chords/BMaj.mp3';
import Bm from './chords/Bm.mp3';
import CMaj from './chords/CMaj.mp3';
import DMaj from './chords/DMaj.mp3';
import Dm from './chords/Dm.mp3';
import EMaj from './chords/EMaj.mp3';
import Em from './chords/Em.mp3';
import FMaj from './chords/FMaj.mp3';
import GMaj from './chords/GMaj.mp3';

import E0 from './chords/E2/0.wav';
import E1 from './chords/E2/1.wav';
import E2 from './chords/E2/2.wav';
import E3 from './chords/E2/3.wav';
import E4 from './chords/E2/4.wav';
import E5 from './chords/E2/5.wav';
import E6 from './chords/E2/6.wav';
import E7 from './chords/E2/7.wav';
import E8 from './chords/E2/8.wav';
import E9 from './chords/E2/9.wav';
import E10 from './chords/E2/10.wav';
import E11 from './chords/E2/11.wav';
import E12 from './chords/E2/12.wav';

import A0 from './chords/A2/0.wav';
import A1 from './chords/A2/1.wav';
import A2 from './chords/A2/2.wav';
import A3 from './chords/A2/3.wav';
import A4 from './chords/A2/4.wav';
import A5 from './chords/A2/5.wav';
import A6 from './chords/A2/6.wav';
import A7 from './chords/A2/7.wav';
import A8 from './chords/A2/8.wav';
import A9 from './chords/A2/9.wav';
import A10 from './chords/A2/10.wav';
import A11 from './chords/A2/11.wav';
import A12 from './chords/A2/12.wav';

import D0 from './chords/D3/0.wav';
import D1 from './chords/D3/1.wav';
import D2 from './chords/D3/2.wav';
import D3 from './chords/D3/3.wav';
import D4 from './chords/D3/4.wav';
import D5 from './chords/D3/5.wav';
import D6 from './chords/D3/6.wav';
import D7 from './chords/D3/7.wav';
import D8 from './chords/D3/8.wav';
import D9 from './chords/D3/9.wav';
import D10 from './chords/D3/10.wav';
import D11 from './chords/D3/11.wav';
import D12 from './chords/D3/12.wav';

import G0 from './chords/G3/0.wav';
import G1 from './chords/G3/1.wav';
import G2 from './chords/G3/2.wav';
import G3 from './chords/G3/3.wav';
import G4 from './chords/G3/4.wav';
import G5 from './chords/G3/5.wav';
import G6 from './chords/G3/6.wav';
import G7 from './chords/G3/7.wav';
import G8 from './chords/G3/8.wav';
import G9 from './chords/G3/9.wav';
import G10 from './chords/G3/10.wav';
import G11 from './chords/G3/11.wav';
import G12 from './chords/G3/12.wav';

import B0 from './chords/B3/0.wav';
import B1 from './chords/B3/1.wav';
import B2 from './chords/B3/2.wav';
import B3 from './chords/B3/3.wav';
import B4 from './chords/B3/4.wav';
import B5 from './chords/B3/5.wav';
import B6 from './chords/B3/6.wav';
import B7 from './chords/B3/7.wav';
import B8 from './chords/B3/8.wav';
import B9 from './chords/B3/9.wav';
import B10 from './chords/B3/10.wav';
import B11 from './chords/B3/11.wav';
import B12 from './chords/B3/12.wav';

import e0 from './chords/E4/0.wav';
import e1 from './chords/E4/1.wav';
import e2 from './chords/E4/2.wav';
import e3 from './chords/E4/3.wav';
import e4 from './chords/E4/4.wav';
import e5 from './chords/E4/5.wav';
import e6 from './chords/E4/6.wav';
import e7 from './chords/E4/7.wav';
import e8 from './chords/E4/8.wav';
import e9 from './chords/E4/9.wav';
import e10 from './chords/E4/10.wav';
import e11 from './chords/E4/11.wav';
import e12 from './chords/E4/12.wav';

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

const NOTE_TO_WAV_MAP = {
  0: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12],
  1: [A0, A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12],
  2: [D0, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12],
  3: [G0, G1, G2, G3, G4, G5, G6, G7, G8, G9, G10, G11, G12],
  4: [B0, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12],
  5: [e0, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};

export const noteToHz = (note) => {
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

export const playFret = async (fret, string) => {
  let audio = new Audio(NOTE_TO_WAV_MAP[string][fret]);
  audio.play();
};

export const playNote = async (note, string) => {
  const hz = noteToHz(note);
  const audioContext = audioChannels[string];
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.value = hz;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(0);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);

  return `Playing ${hz} Hz`;
};

export const playChord = (chord) => {
  let audio = undefined;
  switch (chord) {
    case 'AMaj':
      audio = new Audio(AMaj);
      break;
    case 'Am':
      audio = new Audio(Am);
      break;
    case 'BMaj':
      audio = new Audio(BMaj);
      break;
    case 'Bm':
      audio = new Audio(Bm);
      break;
    case 'CMaj':
      audio = new Audio(CMaj);
      break;
    case 'GMaj':
      audio = new Audio(GMaj);
      break;
    case 'DMaj':
      audio = new Audio(DMaj);
      break;
    case 'Dm':
      audio = new Audio(Dm);
      break;
    case 'EMaj':
      audio = new Audio(EMaj);
      break;
    case 'Em':
      audio = new Audio(Em);
      break;
    case 'AMaj':
      audio = new Audio(AMaj);
      break;
    case 'FMaj':
      audio = new Audio(FMaj);
      break;
    default:
      audio = new Audio();
  }
  audio.play();
};
