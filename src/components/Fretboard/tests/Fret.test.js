import Fret from '../Fret';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GUITAR_STRINGS } from '../../../music/instrument/guitar/constants';

jest.mock('../../../api/sound', () => ({
  playNote: jest.fn(),
}));

describe('Fret component unit tests', () => {
  beforeEach(() => {
    global.console.warn = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should label 2nd Fret (2 semitones up) as F#4 on E/4 string', async () => {
    render(<Fret string={GUITAR_STRINGS[0]} num={2} />);
    await waitFor(() => screen.getByText('F#4'));
  });
  it('should register F#4 when pressing on 2nd Fret on E/4 string', async () => {
    const setFretPressed = jest.fn();
    render(<Fret string={GUITAR_STRINGS[0]} num={2} setFretPressed={setFretPressed} />);
    await waitFor(() => screen.getByText('F#4'));
    fireEvent.mouseDown(screen.getByText('F#4'));
    expect(setFretPressed).toBeCalled();
  });
  it('should warn that touch is not implemented', async () => {
    const setFretPressed = jest.fn();
    render(<Fret string={GUITAR_STRINGS[0]} num={2} setFretPressed={setFretPressed} />);
    await waitFor(() => screen.getByText('F#4'));
    fireEvent.touchStart(screen.getByText('F#4'));
    expect(setFretPressed).not.toBeCalled();
    expect(global.console.warn).toBeCalledWith('onTouch not implemented.');
  });
});
