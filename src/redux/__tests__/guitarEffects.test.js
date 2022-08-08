import { AMaj } from '../../music/instrument/guitar/chords';
import applyListenerMiddleware from '../guitarEffects';
import { strum } from '../guitarSlice';

jest.mock('../../api/sound', () => ({
  playChord: jest.fn(),
}));

describe('Redux: Guitar State Slice Effects unit tests', () => {
  it('should applyListenerMiddleware', async () => {
    function listenerMiddleware() {
      return {
        startListening: function (obj) {
          this.effect = obj.effect;
          this.actionCreator = obj.actionCreator;
        },
      };
    }
    const Listener = new listenerMiddleware();
    const ListenerApi = {
      delay: jest.fn(async (delayMs) => delayMs),
      dispatch: jest.fn(),
    };
    applyListenerMiddleware(Listener);
    // run effect
    Listener.effect(strum(AMaj), ListenerApi);

    //todo - more tests on effect
  });
});
