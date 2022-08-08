import { GUITAR_STRINGS } from '../music/instrument/guitar/constants';
import { getNoteOnFret } from '../music/instrument/guitar';
import { playChord, playNote } from '../api/sound';
import { stopRinging, strum } from './guitarSlice';

export default function (listenerMiddleware) {
  listenerMiddleware.startListening({
    actionCreator: strum,
    effect: async (action, listenerApi) => {
      const { chord_pattern, chord_name } = action.payload;
      console.log(chord_name);
      playChord(chord_name);
      await listenerApi.delay(500);
      listenerApi.dispatch(stopRinging());
    },
  });
}
