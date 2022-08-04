import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Fretboard from '../Fretboard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BarHorizontal = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px 0px;
  align-items: center;
  justify-content: ${(props) => (props.reverse ? 'flex-end' : 'flex-start')};
  flex-direction: ${(props) => (props.reverse ? 'row' : 'row')};
  * {
    margin-left: 20px;
  }
`;

const StyledButton = styled.button`
  width: 60px;
  height: 30px;
  border: ${(props) => (props.amIPressed ? '1px solid' : '1px transparent')};
`;

const X = undefined;
const O = 0;

const Am = {
  chord_name: 'Am',
  chord_pattern: [X, 0, 2, 2, 2, 0],
};
const Em = {
  chord_name: 'Em',
  chord_pattern: [0, 2, 2, 0, 0, 0],
};
const DMaj = {
  chord_name: 'DMaj',
  chord_pattern: [X, X, 0, 2, 3, 2],
};
const Mute = {
  chord_name: 'Mute',
  chord_pattern: [X, X, X, X, X],
};

const CHORDS_LIST = [
  {
    chord_name: 'CMaj',
    chord_pattern: [X, 3, 2, 0, 1, 0],
  },
  DMaj,
  {
    chord_name: 'EMaj',
    chord_pattern: [0, 2, 2, 1, 0, 0],
  },
  Em,
  {
    chord_name: 'FMaj',
    chord_pattern: [1, 3, 3, 2, 1, 1],
  },
  {
    chord_name: 'GMaj',
    chord_pattern: [3, 2, 0, 0, 3, 3],
  },
  {
    chord_name: 'AMaj',
    chord_pattern: [X, 0, 2, 2, 1, 0],
  },
  Am,
  Mute,
];

const ChordButton = ({ children, amIPressed, heyIamPressed }) => {
  return (
    <StyledButton amIPressed={amIPressed} onClick={heyIamPressed}>
      {children}
    </StyledButton>
  );
};

function _genMeSong(progression, quarterTime, setCurrentChord) {
  let beatPointer = 0;
  const progressionTimed = progression.map((chord) => ({ ...chord, beatTime: (beatPointer += quarterTime) }));
  return () => {
    for (const beat of progressionTimed) {
      const { chord_name, chord_pattern, beatTime } = beat;
      console.log(`🎼 ${beatTime}: ${chord_name}`);
      setTimeout(() => setCurrentChord(beat), beatTime);
    }
  };
}

const SONG1_VERSE = [Am, Am, Em, Em, DMaj, DMaj, Am, Am, Am, Am, Em, Em, DMaj, DMaj];
const SONG1 = [...SONG1_VERSE];

function Player() {
  const [currentChord, setCurrentChord] = useState(Mute);
  const { chord_name, chord_pattern, beatTime } = currentChord;
  const [playTime, setPlayTime] = useState(undefined);

  useEffect(() => {
    // play something!
    if (playTime) {
      _genMeSong(SONG1, 900, setCurrentChord)();
    }
  }, [playTime]);

  return (
    <Container>
      <Fretboard chord={chord_pattern} autoStrum={true} beatTime={beatTime} />
      <BarHorizontal title={'Buckets matching root note to fret?'}>
        {CHORDS_LIST.map((chord) => (
          <ChordButton amIPressed={chord.chord_name === chord_name} heyIamPressed={() => setCurrentChord(chord)}>
            {chord.chord_name}
          </ChordButton>
        ))}
      </BarHorizontal>
      <BarHorizontal reverse>
        <span>⚙️</span>
        <button onClick={() => setPlayTime(new Date().getTime())}>Play song</button>
      </BarHorizontal>
    </Container>
  );
}

export default Player;
