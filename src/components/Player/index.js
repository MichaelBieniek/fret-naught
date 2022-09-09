import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';
import { getByKey } from '../../api/storage/local';
import Recorder from '../../api/storage/recorder';
import chords, { Am, DMaj, Em, END_SENTINEL, GMaj, Mute } from '../../music/instrument/guitar/chords';
import { setNewChord, strum } from '../../redux/guitarSlice';
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

const ChordButton = ({ children, amIPressed, heyIamPressed }) => {
  return (
    <StyledButton amIPressed={amIPressed} onClick={heyIamPressed}>
      {children}
    </StyledButton>
  );
};

function _genMeSong(progression, quarterTime, dispatch) {
  let beatPointer = 0;
  const progressionTimed = progression.map((chord) => ({ ...chord, beatTime: (beatPointer += quarterTime) }));
  return () => {
    for (const beat of progressionTimed) {
      const { chord_name, beatTime } = beat;
      console.log(`🎼 ${beatTime}: ${chord_name}`);
      setTimeout(() => {
        dispatch(setNewChord(beat));
        dispatch(strum(beat));
      }, beatTime);
    }
  };
}

function _genMeSong2(progression, dispatch) {
  if (!progression || !progression.length) {
    throw new Error('No song');
  }
  let offset = progression[0].beatTime;
  const progressionTimed = progression.map((chord) => ({ ...chord, beatTime: chord.beatTime - offset }));
  return () => {
    for (const beat of progressionTimed) {
      const { chord_name, beatTime } = beat;
      console.log(`🎼 ${beatTime}: ${chord_name}`);
      setTimeout(() => {
        dispatch(setNewChord(beat));
        dispatch(strum(beat));
      }, beatTime);
    }
  };
}

const SONG1_VERSE = [Am, Am, Em, Em, DMaj, DMaj, Am, Am, Am, Am, GMaj];
const SONG1 = [...SONG1_VERSE];

const KEY_BUCKETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

function Player() {
  const [playTime, setPlayTime] = useState(undefined);
  const [isRecording, setRecording] = useState(false);

  const { currentChord } = useSelector((state) => state.guitar);
  const { chord_name } = currentChord;
  const dispatch = useDispatch();

  useEffect(() => {
    // play something!
    if (playTime) {
      let recordedSong = JSON.parse(getByKey('recorded_song'));
      if (!recordedSong) {
        _genMeSong(SONG1, 900, dispatch)();
      } else {
        _genMeSong2(
          recordedSong.map((item) => ({ ...item.obj, beatTime: item.time })),
          dispatch
        )();
      }
    }
  }, [playTime, dispatch]);

  // one instance of the recorder
  const recorder = useMemo(() => {
    return new Recorder('recorded_song', Mute);
  }, []);

  return (
    <Container>
      <Fretboard recorder={recorder} />
      <BarHorizontal title={'Buckets matching root note to fret?'}>
        {KEY_BUCKETS.map((keyRoot) => (
          <ChordColumn key={`chord-bucket-${keyRoot}`}>
            {chords
              .filter((x) => x.chord_root === keyRoot)
              .map((chord) => (
                <ChordButton
                  key={`chord-${chord.chord_name}`}
                  amIPressed={chord.chord_name === chord_name}
                  heyIamPressed={() => dispatch(setNewChord(chord))}
                >
                  {chord.chord_name}
                </ChordButton>
              ))}
          </ChordColumn>
        ))}
      </BarHorizontal>
      <BarHorizontal reverse>
        <span>⚙️</span>
        <button onClick={() => setPlayTime(new Date().getTime())}>Play song</button>
        <button
          onClick={() =>
            setRecording((wasRecording) => {
              if (wasRecording) {
                // time to save
                recorder.capture(Recorder.END_SENTINEL, new Date().getTime());
              } else {
                // clear previous recording
                recorder.clear();
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
