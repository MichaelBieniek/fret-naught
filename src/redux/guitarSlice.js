import { createSlice } from '@reduxjs/toolkit';
import { Mute } from '../music/instrument/guitar/chords';

export const guitarSlice = createSlice({
  name: 'guitar',
  initialState: {
    capo: undefined,
    currentChord: Mute,
    isRinging: false,
  },
  reducers: {
    setNewChord: (state, action) => {
      console.log(state, action);
      state.currentChord = action.payload;
    },
    strum: (state) => {
      console.log(state);
      state.isRinging = true;
    },
    stopRinging: (state) => {
      state.isRinging = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewChord, strum, stopRinging } = guitarSlice.actions;

export default guitarSlice.reducer;
