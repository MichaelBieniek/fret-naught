import { GUITAR_STRINGS, GUITAR_STRING_THICKNESS_MM, GUITAR_SUPPORTED_FRETS } from '../../music/instrument/guitar/constants';
import Fret from './Fret';
import { StringNoteLabel, StringRow, Wire } from './styles';
import { calcMm2Pix } from './utils';

function String({ openNote, isRinging, rootFret = 0, fretPressed, setFretPressed, fretTapped, settings }) {
  const stringInd = GUITAR_STRINGS.findIndex((x) => x === openNote);
  const thickness = calcMm2Pix(GUITAR_STRING_THICKNESS_MM[stringInd]);
  return (
    <StringRow>
      {GUITAR_SUPPORTED_FRETS.map((fretNum) => fretNum + rootFret).map((num) => (
        <Fret
          key={`${num}`}
          string={openNote}
          num={num}
          isActive={fretPressed === num}
          isRinging={isRinging}
          setFretPressed={setFretPressed}
          fretTapped={() => fretTapped(num)}
          settings={settings}
        />
      ))}
      <Wire thickness={thickness} isRinging={fretPressed >= 0 && isRinging} />
      <StringNoteLabel>{openNote}</StringNoteLabel>
    </StringRow>
  );
}

export default String;
