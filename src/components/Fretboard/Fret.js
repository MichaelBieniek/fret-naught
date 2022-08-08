import styled from 'styled-components';
import { getFriendlyNoteOnFret } from '../../music/instrument/guitar';
import { GUITAR_STRINGS } from '../../music/instrument/guitar/constants';
import { NECK_WIDTH, STRINGS } from './constants';
import { calcFretLenMap, calcMm2Pix } from './utils';

const fretDistMap = calcFretLenMap(650);

const GUITAR_STRING_IND_TO_COLOR = ['gold', 'red', 'black', 'green', 'purple', 'silver'];

const FretSpace = styled.button`
  position: relative;
  height: ${calcMm2Pix(NECK_WIDTH / STRINGS, 'y')}px;
  width: ${(props) => calcMm2Pix(fretDistMap[props.fretNum], 'x')}px;
  transition: background-color 0.5s ease-out;
  background-color: ${(props) => (props.isRinging && props.isActive ? GUITAR_STRING_IND_TO_COLOR[props.string] : 'transparent')};
  border: none;
  border-right: ${(props) => (props.isBase ? '5px solid silver' : '4px solid LightSlateGrey')};
  border-bottom: 0px dotted white;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
`;

const FloatAboveFret = styled.div`
  position: absolute;
  top: -100%;
  left: calc(50% - 0.5rem);
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 1px solid white;
  color: white;
  opacity: 60%;
`;

const NoteIcon = styled.div`
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

const FRET_MARKER_12 = (
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

const FRET_MARKER = (
  <svg height={48} width={24}>
    <defs>
      <linearGradient id="silver-vertical" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#808080"></stop>
        <stop offset="100%" stopColor="#e0e0e0"></stop>
      </linearGradient>
    </defs>
    <circle cx="12" cy="26" r="12" fill="url(#silver-vertical)" strokeWidth={'1'} stroke="black"></circle>
  </svg>
);

function Fret({ string, num, setFretPressed, isActive, settings, fretTapped, isRinging }) {
  const { isShowFretMarkers } = settings;
  const friendlyNote = getFriendlyNoteOnFret(string, num);

  function onPress() {
    // function toggles
    //setFretPressed((x) => (x === num ? undefined : num));
    fretTapped();
  }

  function handleTouchStart() {
    setFretPressed(num);
  }

  function handleTouchEnd() {
    setFretPressed(undefined);
  }

  const stringInd = GUITAR_STRINGS.findIndex((x) => x === string);

  return (
    <FretSpace
      fretNum={num}
      onMouseDown={onPress}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      isBase={num === 0}
      title={friendlyNote}
      isActive={isActive}
      isRinging={isRinging}
      string={stringInd}
    >
      {isShowFretMarkers && string === 'E/4' ? <FloatAboveFret>{num}</FloatAboveFret> : ''}
      <NoteIcon isActive={isActive} isBase={num === 0}>
        {friendlyNote}
      </NoteIcon>
      {num === 3 && string === 'G/3' ? FRET_MARKER : ''}
      {num === 5 && string === 'G/3' ? FRET_MARKER : ''}
      {num === 12 && (string === 'A/2' || string === 'B/3') ? FRET_MARKER_12 : ''}
    </FretSpace>
  );
}

export default Fret;
