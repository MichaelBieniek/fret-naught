import styled from 'styled-components';
import { getFriendlyNoteOnFret, getNoteOnFret } from '../../music/instrument/guitar';
import { NECK_WIDTH, STRINGS } from './constants';
import { calcFretLenMap, calcMm2Pix } from './utils';

const fretDistMap = calcFretLenMap(650);

const FretSpace = styled.button`
  position: relative;
  height: ${calcMm2Pix(NECK_WIDTH / STRINGS, 'y')}px;
  width: ${(props) => calcMm2Pix(fretDistMap[props.fretNum], 'x')}px;
  background-color: transparent;
  border: none;
  border-right: ${(props) => (props.isBase ? '5px solid silver' : '4px solid LightSlateGrey')};
  border-bottom: 0px dotted white;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
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

const FRET_MARKER = (
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

function Fret({ string, num, setFretPressed, isActive }) {
  const note = getNoteOnFret(string, num);
  const friendlyNote = getFriendlyNoteOnFret(string, num);

  function onPress() {
    console.log(`Pressing fret: ${num} on ${string}`);
    setFretPressed((x) => (x === num ? undefined : num));
  }

  function onRelease() {
    setFretPressed(0);
  }

  function onTouch() {
    console.warn('onTouch not implemented.');
  }

  return (
    <FretSpace fretNum={num} onMouseDown={onPress} onTouchStart={onTouch} isBase={num === 0}>
      <NoteIcon isActive={isActive} isBase={num === 0}>
        {friendlyNote}
      </NoteIcon>
      {num === 5 && (string === 'A/2' || string === 'B/3') ? FRET_MARKER : ''}
    </FretSpace>
  );
}

export default Fret;
