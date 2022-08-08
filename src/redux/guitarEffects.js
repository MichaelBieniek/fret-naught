import { playFret, playChord } from '../api/sound';
import { GUITAR_STRINGS } from '../music/instrument/guitar/constants';
import { getNoteStepsFromBase } from '../music/theory/western';
import { setFretTapped, stopRinging, strum } from './guitarSlice';

export default function (listenerMiddleware) {
  listenerMiddleware.startListening({
    actionCreator: strum,
    effect: async (action, listenerApi) => {
      const cord = action.payload;
      playChord(cord);
      await listenerApi.delay(500);
      listenerApi.dispatch(stopRinging());
    },
  });
  listenerMiddleware.startListening({
    actionCreator: setFretTapped,
    effect: async (action, listenerApi) => {
      const { chord_pattern } = action.payload;
      const ind = chord_pattern.findIndex((x) => x >= 0);
      const fretPressed = chord_pattern[ind];
      const string = GUITAR_STRINGS[ind];
      const actualNote = getNoteStepsFromBase(string, fretPressed);
      playFret(fretPressed, ind);
      await listenerApi.delay(300);
      listenerApi.dispatch(stopRinging());
    },
  });
}
