import { getNoteOnFret } from '.';

describe('Instrument: Guitar unit tests', () => {
  it('should error on bad string', () => {
    expect(() => getNoteOnFret('H/2', 12)).toThrowError('Bad base string: H/2');
  });
  it('should error on bad fret', () => {
    expect(() => getNoteOnFret('E/2', -1)).toThrowError('Bad base fret: -1');
  });
  it('should be E/3 12 semitones / fret up on E/2 string', () => {
    expect(getNoteOnFret('E/2', 12)).toBe('E/3');
  });
});
