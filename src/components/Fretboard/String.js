import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { playNote } from '../../api/sound';
import { getNoteOnFret, GUITAR_STRINGS } from '../../music/instrument/guitar';
import { GUITAR_STRING_THICKNESS_MM } from '../../music/instrument/guitar/constants';
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

const FRETS = [0, 1, 2, 3, 4, 5];

function String({ openNote, isRinging }) {
  const [fretPressed, setFretPressed] = useState(0);
  const stringInd = GUITAR_STRINGS.findIndex((x) => x === openNote);
  const thickness = calcMm2Pix(GUITAR_STRING_THICKNESS_MM[stringInd]);

  useEffect(() => {
    if (isRinging) {
      const note = getNoteOnFret(openNote, fretPressed);
      playNote(note, stringInd);
    }
  }, [isRinging]);

  return (
    <Row>
      {FRETS.map((num) => (
        <Fret key={`${num}`} string={openNote} num={num} isActive={fretPressed === num} setFretPressed={setFretPressed} />
      ))}
      <Wire thickness={thickness} isRinging={isRinging} />
      <StringNoteLabel>{openNote}</StringNoteLabel>
    </Row>
  );
}

export default String;
