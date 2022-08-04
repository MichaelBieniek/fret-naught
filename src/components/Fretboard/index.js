import styled from 'styled-components';
import { STRINGS } from '../../music/instrument/guitar';
import { NECK_WIDTH, SUPPORTED_FRETS } from './constants';
import Fret from './Fret';
import { calcFretDistMap, calcMm2Pix } from './utils';

const fretDistMap = calcFretDistMap();
const lastFretMmFromNut = fretDistMap[fretDistMap.length - 1];
const lastFretPxFromNut = calcMm2Pix(lastFretMmFromNut, 'x');
const neckWidthMm = calcMm2Pix(NECK_WIDTH, 'y');

const Neck = styled.div`
  background-color: brown;
  height: ${neckWidthMm}px;
  width: ${lastFretPxFromNut}px;
  border-left: 5px solid silver;
  box-sizing: border-box;
`;

const Row = styled.div`
  position: relative;
  display: flex;
`;

const StringNoteLabel = styled.div`
  position: absolute;
  right: -40px;
  font-size: 1rem;
`;

const FRETS = [1, 2, 3, 4, 5];

const Fretboard = () => {
  return (
    <Neck>
      {STRINGS.map((string) => (
        <Row key={`${string}`}>
          {FRETS.map((num) => (
            <Fret key={`${num}`} string={string} num={num} />
          ))}
          <StringNoteLabel>{string}</StringNoteLabel>
        </Row>
      ))}
    </Neck>
  );
};

export default Fretboard;
