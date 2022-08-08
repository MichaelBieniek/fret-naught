import { GUITAR_STRINGS } from '../music/instrument/guitar/constants';
import { getNoteOnFret } from '../music/instrument/guitar';
import { playNote } from '../api/sound';
import { stopRinging, strum } from './guitarSlice';

export default function (listenerMiddleware) {
  listenerMiddleware.startListening({
    actionCreator: strum,
    effect: async (action, listenerApi) => {
      const { chord_pattern } = action.payload;
      for (let string = GUITAR_STRINGS.length - 1; string >= 0; string--) {
        console.log(string, GUITAR_STRINGS[string]);
        const note = getNoteOnFret(GUITAR_STRINGS[string], chord_pattern[string]);
        console.log(`Ring: ${GUITAR_STRINGS[string]} ${chord_pattern[string]}`);
        playNote(note, string);
      }
      await listenerApi.delay(500);
      listenerApi.dispatch(stopRinging());
    },
  });
}
