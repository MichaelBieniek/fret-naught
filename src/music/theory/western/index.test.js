import { getNoteStepsFromBase } from '.';

describe('western music unit tests', () => {
  it('should error on bad base note', () => {
    expect(() => getNoteStepsFromBase('H/2', 12)).toThrowError('Not a valid base note: H');
  });
  it('should error on bad steps', () => {
    expect(() => getNoteStepsFromBase('E/2', -1)).toThrowError('Steps is not valid: -1');
  });
  it('should be 12 steps in an octave', async () => {
    expect(getNoteStepsFromBase('E/2', 12)).toEqual('E/3');
  });
});
