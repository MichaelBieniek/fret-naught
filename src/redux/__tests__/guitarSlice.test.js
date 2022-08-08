import { Am, AMaj } from '../../music/instrument/guitar/chords';
import reducer, { setNewChord, strum, stopRinging } from '../guitarSlice';
describe('Redux: Guitar State Slice unit tests', () => {
  it('should set new chord', async () => {
    const previousState = {};
    expect(reducer(previousState, setNewChord(AMaj))).toEqual({
      currentChord: AMaj,
    });
  });
  it('should strum', async () => {
    const previousState = {};
    expect(reducer(previousState, strum(Am))).toEqual({
      isRinging: true,
    });
  });
  it('should stop ringing', async () => {
    const previousState = {};
    expect(reducer(previousState, stopRinging())).toEqual({
      isRinging: false,
    });
  });
});
