import String from '../String';
import { render, screen, waitFor } from '@testing-library/react';
import { GUITAR_STRINGS } from '../../../music/instrument/guitar/constants';

describe('String unit tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render a E/4 string', async () => {
    render(<String openNote={GUITAR_STRINGS[0]} />);
    await waitFor(() => screen.getByText('E/4'));
  });
});
