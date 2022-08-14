import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Mute } from '../../music/instrument/guitar/chords';
import { GUITAR_STRINGS } from '../../music/instrument/guitar/constants';
import { setFretTapped, setNewChord, strum } from '../../redux/guitarSlice';
import String from './String';
import { FretBody, Neck, StringContainer, StrumBar, StrumSpace } from './styles';

const Fretboard = ({ recorder = () => {} }) => {
  const dispatch = useDispatch();
  const { currentChord, isRinging, rootFret } = useSelector((state) => state.guitar);
  const settings = useSelector((state) => state.settings);
  const { chord_pattern } = currentChord;

  const strumGuitar = useCallback(
    function () {
      dispatch(strum(currentChord));
      recorder(chord_pattern, new Date().getTime());
    },
    [dispatch, currentChord, chord_pattern, recorder]
  );

  function fretTapped(string) {
    const newChord = [...Mute.chord_pattern];

    return (fret) => {
      newChord[string] = fret;
      dispatch(setFretTapped({ chord_name: '?', chord_pattern: newChord }));
    };
  }

  function pressFret(string) {
    const newChord = [...chord_pattern];
    return (fret) => {
      newChord[string] = fret;
      dispatch(setNewChord({ chord_name: '?', chord_pattern: newChord }));
    };
  }
  useEffect(() => {
    function strumKeyHandler(e) {
      if (e.code === 'KeyS') {
        strumGuitar();
      }
    }

    document.addEventListener('keydown', strumKeyHandler);
    return () => document.removeEventListener('keydown', strumKeyHandler);
  }, [strumGuitar]);

  return (
    <FretBody>
      <Neck>
        <StringContainer>
          {GUITAR_STRINGS.slice(0)
            .reverse()
            .map((string, ind) => {
              const fretNum = chord_pattern[GUITAR_STRINGS.length - ind - 1];
              return (
                <String
                  key={`${string}:${fretNum}`}
                  openNote={string}
                  isRinging={isRinging}
                  rootFret={rootFret}
                  settings={settings}
                  fretTapped={fretTapped(GUITAR_STRINGS.length - ind - 1)}
                  fretPressed={fretNum}
                  setFretPressed={pressFret(GUITAR_STRINGS.length - ind - 1)}
                />
              );
            })}
        </StringContainer>
      </Neck>
      <StrumSpace>
        <StrumBar onClick={strumGuitar} onTouchMove={strumGuitar}>
          <p>STRUM</p>
        </StrumBar>
      </StrumSpace>
    </FretBody>
  );
};

export default Fretboard;
