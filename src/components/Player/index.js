import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getByKey, setByKey } from '../../api/storage/local';
import Fretboard from '../Fretboard';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const BarHorizontal = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px 0px;
  align-items: center;
  margin-left: -120px;
  justify-content: ${(props) => (props.reverse ? 'flex-end' : 'flex-start')};
  flex-direction: ${(props) => (props.reverse ? 'row' : 'row')};
  * {
    margin-left: 20px;
  }
`;

const ChordColumn = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  width: 60px;
  height: 30px;
  background-color: transparent;
  border: ${(props) => (props.amIPressed ? '3px solid' : '1px solid')};
  margin-bottom: 5px;
  color: #fff;
`;

const X = undefined;
const O = 0;

const Am = {
  chord_name: 'Am',
  chord_pattern: [X, 0, 2, 2, 1, 0],
};
const AMajor = {
  chord_name: 'AMajor',
  chord_pattern: [X, 0, 2, 2, 2, 0],
};
const Bm = {
  chord_name: 'Bm',
  chord_pattern: [2, 2, 4, 4, 3, 2],
};
const BMajor = {
  chord_name: 'BMajor',
  chord_pattern: [2, 2, 4, 4, 4, 2],
};
const Em = {
  chord_name: 'Em',
  chord_pattern: [0, 2, 2, 0, 0, 0],
};
const EMajor = {
  chord_name: 'EMaj',
  chord_pattern: [0, 2, 2, 1, 0, 0],
};
const FMaj = {
  chord_name: 'FMaj',
  chord_pattern: [1, 3, 3, 2, 1, 1],
};
const GMaj = {
  chord_name: 'GMaj',
  chord_pattern: [3, 2, 0, 0, 3, 3],
};
const CMaj = {
  chord_name: 'CMaj',
  chord_pattern: [X, 3, 2, 0, 1, 0],
};
const DMaj = {
  chord_name: 'DMaj',
  chord_pattern: [X, X, 0, 2, 3, 2],
};
const Mute = {
  chord_name: 'Mute',
  chord_pattern: [X, X, X, X, X],
};
const END_SENTINEL = [-1, -1, -1, -1, -1];

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

function _genMeSong2(progression, setCurrentChord) {
  if (!progression || !progression.length) {
    throw new Error('No song');
  }
  let offset = progression[0].beatTime;
  let beatPointer = 0;
  const progressionTimed = progression.map((chord) => ({ ...chord, beatTime: chord.beatTime - offset }));
  return () => {
    for (const beat of progressionTimed) {
      const { chord_name, chord_pattern, beatTime } = beat;
      console.log(`🎼 ${beatTime}: ${chord_name}`);
      setTimeout(() => setCurrentChord(beat), beatTime);
    }
  };
}

const SONG1_VERSE = [Am, Am, Em, Em, DMaj, DMaj, Am, Am, Am, Am, Em, Em, DMaj, DMaj, Am];
const SONG1 = [...SONG1_VERSE];

function Player() {
  const [currentChord, setCurrentChord] = useState(Mute);
  const { chord_name, chord_pattern, beatTime } = currentChord;
  const [playTime, setPlayTime] = useState(undefined);
  const [isRecording, setRecording] = useState(false);

  useEffect(() => {
    // play something!
    if (playTime) {
      let recordedSong = JSON.parse(getByKey('recorded_song'));
      if (!recordedSong) {
        _genMeSong(SONG1, 900, setCurrentChord)();
      } else {
        _genMeSong2(recordedSong, setCurrentChord)();
      }
    }
  }, [playTime]);

  const recorder = useMemo(() => {
    if (isRecording) {
      const strumArray = [];

      strumArray.push({ ...Mute, beatTime: new Date().getTime() });

      // ah yes, closures. A function with memory!
      // and it returns its thoughts with each call
      function recorderFunc(chord, time) {
        console.log('recorder being called', chord, time);
        if (chord === END_SENTINEL) {
          console.log('stop recording', strumArray);
          setByKey('recorded_song', JSON.stringify(strumArray));
          return strumArray;
        }
        strumArray.push({ chord_name: '?', chord_pattern: chord, beatTime: time });
      }
      return recorderFunc;
    }
  }, [isRecording]);

  return (
    <Container>
      <Fretboard chord={chord_pattern} autoStrum={true} beatTime={beatTime} recorder={recorder} />
      <BarHorizontal title={'Buckets matching root note to fret?'}>
        <ChordColumn>
          <ChordButton amIPressed={EMajor.chord_name === chord_name} heyIamPressed={() => setCurrentChord(EMajor)}>
            {EMajor.chord_name}
          </ChordButton>
          <ChordButton amIPressed={Em.chord_name === chord_name} heyIamPressed={() => setCurrentChord(Em)}>
            {Em.chord_name}
          </ChordButton>
        </ChordColumn>
        <ChordColumn>
          <ChordButton amIPressed={FMaj.chord_name === chord_name} heyIamPressed={() => setCurrentChord(FMaj)}>
            {FMaj.chord_name}
          </ChordButton>
        </ChordColumn>
        <ChordColumn>
          <ChordButton amIPressed={BMajor.chord_name === chord_name} heyIamPressed={() => setCurrentChord(BMajor)}>
            {BMajor.chord_name}
          </ChordButton>
          <ChordButton amIPressed={Bm.chord_name === chord_name} heyIamPressed={() => setCurrentChord(Bm)}>
            {Bm.chord_name}
          </ChordButton>
        </ChordColumn>
        <ChordColumn>
          <ChordButton amIPressed={CMaj.chord_name === chord_name} heyIamPressed={() => setCurrentChord(CMaj)}>
            {CMaj.chord_name}
          </ChordButton>
          <ChordButton amIPressed={GMaj.chord_name === chord_name} heyIamPressed={() => setCurrentChord(GMaj)}>
            {GMaj.chord_name}
          </ChordButton>
        </ChordColumn>
        <ChordColumn>
          <ChordButton amIPressed={DMaj.chord_name === chord_name} heyIamPressed={() => setCurrentChord(DMaj)}>
            {DMaj.chord_name}
          </ChordButton>
        </ChordColumn>
        <ChordColumn>
          <ChordButton amIPressed={AMajor.chord_name === chord_name} heyIamPressed={() => setCurrentChord(AMajor)}>
            {AMajor.chord_name}
          </ChordButton>
          <ChordButton amIPressed={Am.chord_name === chord_name} heyIamPressed={() => setCurrentChord(Am)}>
            {Am.chord_name}
          </ChordButton>
        </ChordColumn>
      </BarHorizontal>
      <BarHorizontal reverse>
        <span>⚙️</span>
        <button onClick={() => setPlayTime(new Date().getTime())}>Play song</button>
        <button
          onClick={() =>
            setRecording((wasRecording) => {
              if (wasRecording) {
                // time to save
                recorder(END_SENTINEL, new Date().getTime());
              }
              return !wasRecording;
            })
          }
        >
          {isRecording ? 'Stop ⏹️' : ' Rec ⏺️'}
        </button>
      </BarHorizontal>
    </Container>
  );
}

export default Player;
