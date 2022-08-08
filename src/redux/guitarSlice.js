import { createSlice } from '@reduxjs/toolkit';
import { Mute } from '../music/instrument/guitar/chords';

export const guitarSlice = createSlice({
  name: 'guitar',
  initialState: {
    capo: undefined,
    currentChord: Mute,
    isRinging: false,
    rootFret: 0,
  },
  reducers: {
    setNewChord: (state, action) => {
      state.currentChord = action.payload;
    },
    strum: (state) => {
      state.isRinging = true;
    },
    stopRinging: (state) => {
      state.isRinging = false;
    },
    setFretTapped: (state, action) => {
      state.currentChord = action.payload;
      state.isRinging = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewChord, strum, stopRinging, setFretTapped } = guitarSlice.actions;

export default guitarSlice.reducer;
