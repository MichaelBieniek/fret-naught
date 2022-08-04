import { getNoteStepsFromBase } from '../../theory/western';

export const STRINGS = ['E/4', 'B/3', 'G/3', 'D/3', 'A/2', 'E/2'];

export const getNoteOnFret = (string, fret) => {
  if (!STRINGS.some((x) => x === string)) {
    throw new Error(`Bad base string: ${string}`);
  }
  if (fret < 0 || fret > 12) {
    throw new Error(`Bad base fret: ${fret}`);
  }
  return getNoteStepsFromBase(string, fret);
};

export const getFriendlyNoteOnFret = (string, fret) => {
  return getNoteStepsFromBase(string, fret).replace('/', '');
};
