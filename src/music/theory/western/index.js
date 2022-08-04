export const WESTERN_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Get note that is *steps* from a *baseNote* (i.e. fret & guitar string)
 * @param {*} baseNote - Base note (e.g. E2)
 * @param {*} steps - Half steps or half tones from base note (i.e. fret #)
 */
export const getNoteStepsFromBase = function (baseNote, steps = 0) {
  const [note, octave] = baseNote.split('/');

  if (isNaN(steps) || steps < 0) {
    throw new Error(`Steps is not valid: ${steps}`);
  }
  if (!WESTERN_NOTES.some((x) => x === note)) {
    throw new Error(`Not a valid base note: ${note}`);
  }

  const octaveAdd = Math.floor(steps / 12);
  const noteStepFromC = WESTERN_NOTES.findIndex((x) => x === note);
  const newNote = WESTERN_NOTES[(noteStepFromC + (steps % 12)) % 12];
  return `${newNote}/${parseInt(octave) + octaveAdd}`;
};
