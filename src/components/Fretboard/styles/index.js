import styled from 'styled-components';
import { NECK_WIDTH, STRINGS, SUPPORTED_FRETS } from '../constants';
import { calcFretLenMap, calcMm2Pix } from '../utils';

const fretDistMap = calcFretLenMap(650);
const neckWidthMm = calcMm2Pix(NECK_WIDTH, 'y');

const lastFretMmFromNut = fretDistMap.slice(0, SUPPORTED_FRETS + 1).reduce((accum, curr) => {
  return accum + curr;
}, 0);
const lastFretPxFromNut = calcMm2Pix(lastFretMmFromNut, 'x');

// Fretboard styles

export const FretBody = styled.div`
  display: flex;
`;

export const Neck = styled.div`
  position: relative;
  height: ${neckWidthMm}px;
  width: ${lastFretPxFromNut}px;
  box-sizing: border-box;
`;

export const StringContainer = styled.div`
  position: absolute;
`;

export const StrumSpace = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 120px;
`;

export const StrumBar = styled.button`
  width: 40px;
  & p {
    margin: 0;
    padding: 0;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  & :active {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;

    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px);
    }
    10% {
      transform: translate(-1px, -1px);
    }
    20% {
      transform: translate(-1px, 0px);
    }
    30% {
      transform: translate(2px, 1px);
    }
    40% {
      transform: translate(1px, -1px);
    }
    50% {
      transform: translate(-1px, 2px);
    }
    60% {
      transform: translate(-2px, 1px);
    }
    70% {
      transform: translate(2px, 1px);
    }
    80% {
      transform: translate(-1px, -1px);
    }
    90% {
      transform: translate(1px, 2px);
    }
    100% {
      transform: translate(1px, -2px);
    }
  }
`;

// String styles

export const StringRow = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

export const StringNoteLabel = styled.div`
  position: absolute;
  right: -40px;
  font-size: 1rem;
`;

export const Wire = styled.div`
  position: absolute;
  left: 0;
  right: -4px;
  top: 45%;
  height: ${(props) => props.thickness}px;
  background-color: GoldenRod;
  z-index: 0;
  border: none;
  border-left: 0;
  border-right: 0;
  box-sizing: border-box;
  pointer-events: none;

  ${(props) =>
    props.isRinging
      ? `
    /* Start the shake animation and make the animation last for 0.3 seconds */
    animation: shake 0.3s;

    animation-iteration-count: infinite;
  `
      : ''}

  @keyframes shake {
    0% {
      transform: translate(1px, 1px);
    }
    10% {
      transform: translate(-1px, -1px);
    }
    20% {
      transform: translate(-2px, 0px);
    }
    30% {
      transform: translate(2px, 1px);
    }
    40% {
      transform: translate(1px, -1px);
    }
    50% {
      transform: translate(-1px, 1px);
    }
    60% {
      transform: translate(-2px, 1px);
    }
    70% {
      transform: translate(2px, 1px);
    }
    80% {
      transform: translate(-1px, -1px);
    }
    90% {
      transform: translate(1px, 2px);
    }
    100% {
      transform: translate(1px, -2px);
    }
  }
`;

// Fret styles

export const GUITAR_STRING_IND_TO_COLOR = ['gold', 'red', 'black', 'green', 'purple', 'silver'];

function calcBgColor(props) {
  const { isRinging, isActive, isBase } = props;
  if (isRinging && isActive) {
    return GUITAR_STRING_IND_TO_COLOR[props.string];
  } else if (isBase) {
    return 'transparent';
  }
  return 'Sienna';
}

export const FretSpace = styled.button`
  position: relative;
  height: ${calcMm2Pix(NECK_WIDTH / STRINGS, 'y')}px;
  width: ${(props) => calcMm2Pix(fretDistMap[props.fretNum], 'x')}px;
  transition: background-color 0.5s ease-out;
  background-color: ${(props) => calcBgColor(props)};
  border: none;
  border-right: ${(props) => (props.isBase ? '5px solid silver' : '4px solid LightSlateGrey')};
  border-bottom: 0px dotted white;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
`;

export const FloatAboveFret = styled.div`
  position: absolute;
  top: -100%;
  left: calc(50% - 0.5rem);
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 2px solid white;
  color: white;
  opacity: 60%;
`;

export const NoteIcon = styled.div`
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  justify-content: center;
  align-content: center;
  flex-direction: column;
  position: absolute;
  height: 2rem;
  width: 2rem;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  border: ${(props) => (props.isBase ? '1px solid white' : '1px solid black')};
  background-color: ${(props) => (props.isBase ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)')};
  border-radius: 50%;
  box-sizing: border-box;
  z-index: 1;
  font-size: 1rem;
  color: #000;
`;

export const FRET_MARKER_12 = (
  <svg height={24} width={24}>
    <defs>
      <linearGradient id="silver-vertical" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#808080"></stop>
        <stop offset="100%" stopColor="#e0e0e0"></stop>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="12" fill="url(#silver-vertical)" strokeWidth={'1'} stroke="black"></circle>
  </svg>
);

export const FRET_MARKER = (
  <svg height={48} width={24}>
    <defs>
      <linearGradient id="silver-vertical" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#808080"></stop>
        <stop offset="100%" stopColor="#e0e0e0"></stop>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="12" fill="url(#silver-vertical)" strokeWidth={'1'} stroke="black"></circle>
  </svg>
);
