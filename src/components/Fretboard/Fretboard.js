import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Mute } from '../../music/instrument/guitar/chords';
import { GUITAR_STRINGS } from '../../music/instrument/guitar/constants';
import { setFretTapped, strum } from '../../redux/guitarSlice';
import { NECK_WIDTH } from './constants';
import String from './String';
import { calcFretDistMap, calcMm2Pix } from './utils';

const fretDistMap = calcFretDistMap();
const lastFretMmFromNut = fretDistMap[fretDistMap.length - 1];
const lastFretPxFromNut = calcMm2Pix(lastFretMmFromNut, 'x');
const neckWidthMm = calcMm2Pix(NECK_WIDTH, 'y');

const Body = styled.div`
  display: flex;
`;

const Neck = styled.div`
  position: relative;
  background-color: Sienna;
  height: ${neckWidthMm}px;
  width: ${lastFretPxFromNut}px;
  box-sizing: border-box;
`;

const StringContainer = styled.div`
  position: absolute;
  left: -80px;
`;

const StrumSpace = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 120px;
`;

const StrumBar = styled.button`
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
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

const Fretboard = ({ recorder = () => {} }) => {
  const dispatch = useDispatch();
  const { currentChord, isRinging, rootFret } = useSelector((state) => state.guitar);
  const settings = useSelector((state) => state.settings);
  const { chord_pattern } = currentChord;

  function strumGuitar() {
    dispatch(strum(currentChord));
    recorder(chord_pattern, new Date().getTime());
  }
  function fretTapped(string) {
    const newChord = [...Mute.chord_pattern];

    return (fret) => {
      newChord[string] = fret;
      dispatch(setFretTapped({ chord_name: '?', chord_pattern: newChord }));
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
    <Body>
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
                  defaultFret={fretNum}
                  settings={settings}
                  fretTapped={fretTapped(GUITAR_STRINGS.length - ind - 1)}
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
    </Body>
  );
};

export default Fretboard;
