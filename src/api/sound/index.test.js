import { noteToHz } from '.';

describe('Sound api: unit tests', () => {
  it('should see E/2 note as 82.41 HZ', async () => {
    expect(noteToHz('E/2')).toBe(82.41);
  });
});
