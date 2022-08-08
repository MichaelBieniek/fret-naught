import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'settings',
  initialState: {
    isTouch: false,
    isAutoStrum: false,
  },
  reducers: {
    setTouch: (state, action) => {
      state.isTouch = !!action.payload;
    },
    setAutoStrum: (state, action) => {
      state.isTouch = !!action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTouch, setAutoStrum } = counterSlice.actions;

export default counterSlice.reducer;
