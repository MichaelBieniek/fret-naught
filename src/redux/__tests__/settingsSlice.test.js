import reducer, { setTouch, setAutoStrum, setShowFretMarkers, setShowNoteMarkers } from '../settingsSlice';
describe('Redux: Settings State Slice unit tests', () => {
  it('should setTouch', async () => {
    const previousState = {};
    expect(reducer(previousState, setTouch(true))).toEqual({
      isTouch: true,
    });
  });
  it('should setAutoStrum', async () => {
    const previousState = {};
    expect(reducer(previousState, setAutoStrum(true))).toEqual({
      isAutoStrum: true,
    });
  });
  it('should setShowFretMarkers', async () => {
    const previousState = {};
    expect(reducer(previousState, setShowFretMarkers(true))).toEqual({
      isShowFretMarkers: true,
    });
  });
  it('should setShowNoteMarkers', async () => {
    const previousState = {};
    expect(reducer(previousState, setShowNoteMarkers(true))).toEqual({
      isShowNoteMarkers: true,
    });
  });
});
