import styled from 'styled-components';
import { getFriendlyNoteOnFret } from '../../music/instrument/guitar';
import { NECK_WIDTH, STRINGS } from './constants';
import { calcFretLenMap, calcMm2Pix } from './utils';

const fretDistMap = calcFretLenMap(650);

const FretSpace = styled.div`
  position: relative;
  height: ${calcMm2Pix(NECK_WIDTH / STRINGS, 'y')}px;
  width: ${(props) => calcMm2Pix(fretDistMap[props.fretNum], 'x')}px;
  border-right: 2px solid silver;
  border-bottom: 0px dotted white;
  box-sizing: border-box;
`;

const String = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 45%;
  height: 3px;
  background-color: gold;
  z-index: 0;
`;

const NoteIcon = styled.div`
  position: absolute;
  height: 1.4rem;
  width: 2.8rem;
  top: calc(50% - 0.7rem);
  left: calc(50% - 0.7rem);
  border: 1px solid black;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  box-sizing: border-box;
  z-index: 1;
  font-size: 1rem;
  color: #000;
`;

function Fret({ string, num }) {
  return (
    <FretSpace fretNum={num}>
      <String />
      <NoteIcon>{getFriendlyNoteOnFret(string, num)}</NoteIcon>
    </FretSpace>
  );
}

export default Fret;
