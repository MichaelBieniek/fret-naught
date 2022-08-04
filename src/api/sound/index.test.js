import { playNote } from '.';

describe('Sound api: unit tests', () => {
  it('should play note', async () => {
    expect(playNote('E/2')).toBe('Playing 82.41');
  });
});
