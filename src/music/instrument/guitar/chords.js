const X = undefined;
const O = 0;

export const Am = {
  chord_root: 'A',
  chord_name: 'Am',
  chord_pattern: [X, 0, 2, 2, 1, 0],
};
export const AMaj = {
  chord_root: 'A',
  chord_name: 'AMaj',
  chord_pattern: [X, 0, 2, 2, 2, 0],
};
export const Bm = {
  chord_root: 'B',
  chord_name: 'Bm',
  chord_pattern: [2, 2, 4, 4, 3, 2],
};
export const BMaj = {
  chord_root: 'B',
  chord_name: 'BMaj',
  chord_pattern: [2, 2, 4, 4, 4, 2],
};
export const Em = {
  chord_root: 'E',
  chord_name: 'Em',
  chord_pattern: [0, 2, 2, 0, 0, 0],
};
export const EMaj = {
  chord_root: 'E',
  chord_name: 'EMaj',
  chord_pattern: [0, 2, 2, 1, 0, 0],
};
export const FMaj = {
  chord_root: 'F',
  chord_name: 'FMaj',
  chord_pattern: [1, 3, 3, 2, 1, 1],
};
export const GMaj = {
  chord_root: 'G',
  chord_name: 'GMaj',
  chord_pattern: [3, 2, 0, 0, 3, 3],
};
export const CMaj = {
  chord_root: 'C',
  chord_name: 'CMaj',
  chord_pattern: [X, 3, 2, 0, 1, 0],
};
export const Dm = {
  chord_root: 'D',
  chord_name: 'Dm',
  chord_pattern: [X, X, 0, 2, 3, 1],
};
export const DMaj = {
  chord_root: 'D',
  chord_name: 'DMaj',
  chord_pattern: [X, X, 0, 2, 3, 2],
};
export const Mute = {
  chord_root: undefined,
  chord_name: 'Mute',
  chord_pattern: [X, X, X, X, X, X],
};
export const END_SENTINEL = [-1, -1, -1, -1, -1];

export default [Am, AMaj, Bm, BMaj, CMaj, Dm, DMaj, Em, EMaj, FMaj, GMaj];
