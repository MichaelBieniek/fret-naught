import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GUITAR_STRINGS } from '../../music/instrument/guitar/constants';
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

const Fretboard = ({ chord = [], autoStrum, beatTime, recorder = () => {} }) => {
  const [isRinging, setRinging] = useState(false);

  function strum() {
    recorder(chord, new Date().getTime());
    setRinging(true);
    setTimeout(() => setRinging(false), 50);
  }

  useEffect(() => {
    if (autoStrum && beatTime >= 0) {
      strum();
    }
  }, [autoStrum, beatTime]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyS') {
        strum();
      }
    });
  }, []);

  return (
    <Body>
      <Neck>
        <StringContainer>
          {GUITAR_STRINGS.map((string, ind) => {
            const fretNum = chord[GUITAR_STRINGS.length - ind - 1];
            return <String key={`${string}:${fretNum}`} openNote={string} isRinging={isRinging} defaultFret={fretNum} />;
          })}
        </StringContainer>
      </Neck>
      <StrumSpace>
        <StrumBar onClick={strum}>
          <p>STRUM (S) </p>
        </StrumBar>
      </StrumSpace>
    </Body>
  );
};

export default Fretboard;
