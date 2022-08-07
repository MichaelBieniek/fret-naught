import { getNoteStepsFromBase } from '../../theory/western';
import { GUITAR_STRINGS } from './constants';

export const getNoteOnFret = (string, fret) => {
  if (!GUITAR_STRINGS.some((x) => x === string)) {
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
