import { Am, AMaj, Mute } from '../../music/instrument/guitar/chords';
import reducer, { setNewChord, strum, stopRinging, setFretTapped } from '../guitarSlice';
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
  it('should set fret tapped and cause to ring', async () => {
    const previousState = {};
    expect(reducer(previousState, setFretTapped(Mute))).toEqual({
      currentChord: Mute,
      isRinging: true,
    });
  });
});
