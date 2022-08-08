import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Fretboard from '../Fretboard.js';
import { useDispatch, useSelector } from 'react-redux';
import MOCK_STATE from '../../../redux/stateMock.js';
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Fretboard unit tests', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector(MOCK_STATE));
  });
  it('should render Fretboard w/ strum bar', async () => {
    render(<Fretboard />);
    waitFor(() => screen.getByText('STRUM'));
  });
  it('should call strum dispatch when strum clicked', async () => {
    render(<Fretboard />);
    waitFor(() => screen.getByText('STRUM'));
    fireEvent.click(screen.getByText('STRUM'));
    expect(dispatch).toBeCalledWith({
      payload: { chord_pattern: [undefined, undefined, undefined, undefined, undefined, undefined] },
      type: 'guitar/strum',
    });
  });
  it('should call strum dispatch when strum shortcut pressed (s)', async () => {
    render(<Fretboard />);
    fireEvent.keyDown(screen.getByText('STRUM'), { key: 's', code: 'KeyS' });
    expect(dispatch).toBeCalledWith({
      payload: { chord_pattern: [undefined, undefined, undefined, undefined, undefined, undefined] },
      type: 'guitar/strum',
    });
  });

  it('should not call strum dispatch when any other key is pressed (s)', async () => {
    render(<Fretboard />);
    fireEvent.keyDown(screen.getByText('STRUM'), { key: 'a', code: 'KeyA' });
    expect(dispatch).not.toBeCalled();
  });
});
