import String from '../String';
import { render, screen, waitFor } from '@testing-library/react';
import { GUITAR_STRINGS } from '../../../music/instrument/guitar/constants';
import MOCK_STATE from '../../../redux/stateMock';

describe('String unit tests', () => {
  it('should render a E/2 string', async () => {
    render(<String openNote={GUITAR_STRINGS[0]} isRinging={true} settings={MOCK_STATE.settings} />);
    await waitFor(() => screen.getByText('E/2'));
  });
});
