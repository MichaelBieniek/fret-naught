import Fret, { GUITAR_STRING_IND_TO_COLOR } from '../Fret';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GUITAR_STRINGS } from '../../../music/instrument/guitar/constants';
import MOCK_STATE from '../../../redux/stateMock';

describe('Fret component unit tests', () => {
  it('should label 2nd Fret (2 semitones up) as F#2 on E/2 string', async () => {
    render(<Fret string={GUITAR_STRINGS[0]} num={2} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByTitle('F#2'));
  });
  it('should register F#2 when double clicking on 2nd Fret on E/2 string', async () => {
    const setFretPressed = jest.fn();
    render(<Fret string={GUITAR_STRINGS[0]} num={2} setFretPressed={setFretPressed} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByTitle('F#2'));
    fireEvent.doubleClick(screen.getByTitle('F#2'));
    expect(setFretPressed).toBeCalledWith(2);
  });
  it('should register F#2 being unselected when double clicking on 2nd Fret on E/2 string (if it was active before)', async () => {
    const setFretPressed = jest.fn();
    render(<Fret string={GUITAR_STRINGS[0]} num={2} isActive={true} setFretPressed={setFretPressed} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByTitle('F#2'));
    fireEvent.doubleClick(screen.getByTitle('F#2'));
    expect(setFretPressed).toBeCalledWith(undefined);
  });
  it('should register F#2 when touching on 2nd Fret on E/2 string', async () => {
    const fretTapped = jest.fn();
    render(<Fret string={GUITAR_STRINGS[0]} num={2} fretTapped={fretTapped} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByTitle('F#2'));
    fireEvent.touchStart(screen.getByTitle('F#2'));
    expect(fretTapped).toBeCalledWith(2);
  });
  it('should have a visible note marker if fret is active (selected)', async () => {
    const setFretPressed = jest.fn((stateSelector) => stateSelector);
    render(<Fret string={GUITAR_STRINGS[0]} num={2} isActive={true} setFretPressed={setFretPressed} settings={MOCK_STATE.settings} />);
    const styles = getComputedStyle(screen.getByText('F#2'));
    await waitFor(() => screen.getByText('F#2'));
    expect(styles.display).toBe('flex'); // showing
  });
  it('should change background colour when fret is active & string is ringing', async () => {
    render(
      <Fret string={GUITAR_STRINGS[0]} num={2} isActive={true} setFretPressed={jest.fn()} isRinging={true} settings={MOCK_STATE.settings} />
    );
    const styles = getComputedStyle(screen.getByRole('button'));
    await waitFor(() => screen.getByText('F#2'));
    expect(styles.backgroundColor).toBe(GUITAR_STRING_IND_TO_COLOR[0]); // showing
  });
  it('should render dots on the 12th fret', () => {
    render(
      <div>
        <Fret string={GUITAR_STRINGS[0]} num={12} settings={MOCK_STATE.settings} />
        <Fret string={GUITAR_STRINGS[1]} num={12} settings={MOCK_STATE.settings} />
        <Fret string={GUITAR_STRINGS[2]} num={12} settings={MOCK_STATE.settings} />
        <Fret string={GUITAR_STRINGS[3]} num={12} settings={MOCK_STATE.settings} />
        <Fret string={GUITAR_STRINGS[4]} num={12} settings={MOCK_STATE.settings} />
        <Fret string={GUITAR_STRINGS[5]} num={12} settings={MOCK_STATE.settings} />
      </div>
    );
  });
});
