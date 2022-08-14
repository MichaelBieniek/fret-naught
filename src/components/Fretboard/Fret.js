import { useCallback } from 'react';
import { getFriendlyNoteOnFret } from '../../music/instrument/guitar';
import { GUITAR_STRINGS } from '../../music/instrument/guitar/constants';
import { FloatAboveFret, FretSpace, FRET_MARKER, FRET_MARKER_12, NoteIcon } from './styles';

function Fret({ string, num, setFretPressed, isActive, settings, fretTapped, isRinging }) {
  const { isShowFretMarkers } = settings;
  const friendlyNote = getFriendlyNoteOnFret(string, num);

  const onDoubleClick = useCallback(
    function () {
      // function toggles
      setFretPressed(isActive ? undefined : num);
    },
    [setFretPressed, isActive, num]
  );

  const handleTouchStart = useCallback(
    function () {
      fretTapped(num);
    },
    [fretTapped, num]
  );

  const stringInd = GUITAR_STRINGS.findIndex((x) => x === string);

  return (
    <FretSpace
      fretNum={num}
      onTouchStart={handleTouchStart}
      onDoubleClick={onDoubleClick}
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
