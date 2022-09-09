import { DEVICE_DIMENSIONS, DEVICE_PIXELS, FRET_CONSTANT, SUPPORTED_FRETS } from './constants';

export const calcFretDistMap = function (scale = 650) {
  let remainingDist = scale;
  let fretDistMap = [22.1];
  for (let i = 0; i <= SUPPORTED_FRETS; i++) {
    const spacing = Math.round(remainingDist / FRET_CONSTANT);
    remainingDist = remainingDist - spacing;
    fretDistMap.push(scale - remainingDist);
  }
  return fretDistMap;
};

export const calcFretLenMap = function (scale = 650) {
  let remainingDist = scale;
  let fretDistMap = [22.1];
  for (let i = 1; i <= 12; i++) {
    const spacing = Math.round(remainingDist / FRET_CONSTANT);
    fretDistMap.push(spacing);
    remainingDist = remainingDist - spacing;
  }
  return fretDistMap;
};

export const calcMm2Pix = function (mm, axis) {
  const [dimX, dimY] = DEVICE_DIMENSIONS;
  const [pixX, pixY] = DEVICE_PIXELS;
  if (axis === 'y') {
    return parseFloat((pixY / dimY) * mm).toFixed(1);
  }
  return parseFloat((pixX / dimX) * mm).toFixed(1);
};
