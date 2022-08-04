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

function Fret({ string, num, setFretPressed, isActive }) {
  const note = getNoteOnFret(string, num);
  const friendlyNote = getFriendlyNoteOnFret(string, num);

  function onHold() {
    console.log(`Pressing fret: ${num} on ${string}`);
    setFretPressed(num);
  }

  function onRelease() {
    setFretPressed(0);
  }

  return (
    <FretSpace fretNum={num} onMouseDown={onHold} isBase={num === 0}>
      <NoteIcon isActive={isActive} isBase={num === 0}>
        {friendlyNote}
      </NoteIcon>
    </FretSpace>
  );
}

export default Fret;
