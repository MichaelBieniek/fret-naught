import String from '../String';
import { render, screen, waitFor } from '@testing-library/react';
import { GUITAR_STRINGS } from '../../../music/instrument/guitar/constants';
import { playNote } from '../../../api/sound';

jest.mock('../../../api/sound', () => ({
  playNote: jest.fn(),
}));

describe('String unit tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render a E/4 string', async () => {
    render(<String openNote={GUITAR_STRINGS[0]} />);
    await waitFor(() => screen.getByText('E/4'));
  });
  it('should play E/4 note if E/4 string is rung open', async () => {
    render(<String openNote={GUITAR_STRINGS[0]} isRinging={true} defaultFret={0} />);
    await waitFor(() => screen.getByText('E/4'));
    expect(playNote).toBeCalledWith('E/4', 0);
  });
  it('should not play E/4 note if E/4 string is rung muted', async () => {
    render(<String openNote={GUITAR_STRINGS[0]} isRinging={true} />);
    await waitFor(() => screen.getByText('E/4'));
    expect(playNote).not.toBeCalledWith('E/4', 0);
  });
});
