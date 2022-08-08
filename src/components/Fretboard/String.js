import { useState } from 'react';
import styled from 'styled-components';
import { GUITAR_STRINGS, GUITAR_STRING_THICKNESS_MM, GUITAR_SUPPORTED_FRETS } from '../../music/instrument/guitar/constants';
import Fret from './Fret';
import { calcMm2Pix } from './utils';

const Row = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const StringNoteLabel = styled.div`
  position: absolute;
  right: -40px;
  font-size: 1rem;
`;

const Wire = styled.div`
  position: absolute;
  left: 0;
  right: -4px;
  top: 45%;
  height: ${(props) => props.thickness}px;
  background-color: GoldenRod;
  z-index: 0;
  border: none;
  border-left: 0;
  border-right: 0;
  box-sizing: border-box;
  pointer-events: none;

  ${(props) =>
    props.isRinging
      ? `
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;
  
    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  `
      : ''}

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -1px) rotate(-0.5deg);
    }
    20% {
      transform: translate(-2px, 0px) rotate(0.5deg);
    }
    30% {
      transform: translate(2px, 1px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(0.5deg);
    }
    50% {
      transform: translate(-1px, 1px) rotate(-0.5deg);
    }
    60% {
      transform: translate(-2px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(2px, 1px) rotate(-0.5deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(0.5deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-0.5deg);
    }
  }
`;

function String({ openNote, isRinging, rootFret = 0, defaultFret = undefined, fretTapped, settings }) {
  const [fretPressed, setFretPressed] = useState(defaultFret);
  const stringInd = GUITAR_STRINGS.findIndex((x) => x === openNote);
  const thickness = calcMm2Pix(GUITAR_STRING_THICKNESS_MM[stringInd]);
  return (
    <Row>
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
    </Row>
  );
}

export default String;
