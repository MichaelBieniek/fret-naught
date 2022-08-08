import Fret from '../Fret';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GUITAR_STRINGS } from '../../../music/instrument/guitar/constants';
import MOCK_STATE from '../../../redux/stateMock';

describe('Fret component unit tests', () => {
  it('should label 2nd Fret (2 semitones up) as F#2 on E/2 string', async () => {
    render(<Fret string={GUITAR_STRINGS[0]} num={2} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByTitle('F#2'));
  });
  it('should register F#2 when pressing on 2nd Fret on E/2 string', async () => {
    const setFretPressed = jest.fn();
    render(<Fret string={GUITAR_STRINGS[0]} num={2} setFretPressed={setFretPressed} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByTitle('F#2'));
    fireEvent.mouseDown(screen.getByTitle('F#2'));
    expect(setFretPressed).toBeCalled();
  });
  it('should register F#2 when touching on 2nd Fret on E/2 string', async () => {
    const setFretPressed = jest.fn((stateSelector) => stateSelector);
    render(<Fret string={GUITAR_STRINGS[0]} num={2} setFretPressed={setFretPressed} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByTitle('F#2'));
    fireEvent.touchStart(screen.getByTitle('F#2'));
    expect(setFretPressed).toBeCalledWith(2);
  });
  it('should register lifting off of 2nd Fret on E/2 string', async () => {
    const setFretPressed = jest.fn((stateSelector) => stateSelector);
    render(<Fret string={GUITAR_STRINGS[0]} num={2} setFretPressed={setFretPressed} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByTitle('F#2'));
    fireEvent.touchEnd(screen.getByTitle('F#2'));
    expect(setFretPressed).toBeCalledWith(undefined);
  });
  it('should have a visible note marker if fret is active (selected)', async () => {
    const setFretPressed = jest.fn((stateSelector) => stateSelector);
    render(<Fret string={GUITAR_STRINGS[0]} num={2} isActive={true} setFretPressed={setFretPressed} settings={MOCK_STATE.settings} />);
    const styles = getComputedStyle(screen.getByText('F#2'));
    await waitFor(() => screen.getByText('F#2'));
    expect(styles.display).toBe('flex'); // showing
  });
});
