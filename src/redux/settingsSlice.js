import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'settings',
  initialState: {
    isTouch: false,
    isAutoStrum: true,
    isShowFretMarkers: true,
    isShowNoteMarkers: true,
  },
  reducers: {
    setTouch: (state, action) => {
      state.isTouch = !!action.payload;
    },
    setAutoStrum: (state, action) => {
      state.isAutoStrum = !!action.payload;
    },
    setShowFretMarkers: (state, action) => {
      state.isShowFretMarkers = !!action.payload;
    },
    setShowNoteMarkers: (state, action) => {
      state.isShowNoteMarkers = !!action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTouch, setAutoStrum, setShowFretMarkers, setShowNoteMarkers } = counterSlice.actions;

export default counterSlice.reducer;
