import { playFret, playChord } from '../api/sound';
import { setFretTapped, stopRinging, strum } from './guitarSlice';

export const strumEffect = async (action, listenerApi) => {
  const cord = action.payload;
  playChord(cord);
  await listenerApi.delay(500);
  listenerApi.dispatch(stopRinging());
};

export const setFretTappedEffect = async (action, listenerApi) => {
  const { chord_pattern } = action.payload;
  const ind = chord_pattern.findIndex((x) => x >= 0);
  const fretPressed = chord_pattern[ind];
  playFret(fretPressed, ind);
  await listenerApi.delay(300);
  listenerApi.dispatch(stopRinging());
};

export default function (listenerMiddleware) {
  listenerMiddleware.startListening({
    actionCreator: strum,
    effect: strumEffect,
  });
  listenerMiddleware.startListening({
    actionCreator: setFretTapped,
    effect: setFretTappedEffect,
  });
}
