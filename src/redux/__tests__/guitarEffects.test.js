import { createListenerMiddleware } from '@reduxjs/toolkit';
import { AMaj } from '../../music/instrument/guitar/chords';
import applyListenerMiddleware, { strumEffect, setFretTappedEffect } from '../guitarEffects';
import { setFretTapped, stopRinging, strum } from '../guitarSlice';

jest.mock('../../api/sound');

describe('Redux: Guitar State Slice Effects unit tests', () => {
  it('should dispatch action "stop ringing" after strum effect', async () => {
    const action = strum(AMaj);
    const ListenerApi = {
      delay: jest.fn(async (delayMs) => delayMs),
      dispatch: jest.fn(),
    };
    await strumEffect(action, ListenerApi);
    expect(ListenerApi.dispatch).toBeCalledWith(stopRinging());
  });
  it('should dispatch action "stop ringing" after set fret pressed effect', async () => {
    const action = setFretTapped(AMaj);
    const ListenerApi = {
      delay: jest.fn(async (delayMs) => delayMs),
      dispatch: jest.fn(),
    };
    await setFretTappedEffect(action, ListenerApi);
    expect(ListenerApi.dispatch).toBeCalledWith(stopRinging());
  });
  it('should applyListenerMiddleware', async () => {
    const listenerMiddleware = createListenerMiddleware();
    applyListenerMiddleware(listenerMiddleware);
    //todo - have test do something
  });
});
