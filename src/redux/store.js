import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import guitarReducer from './guitarSlice';
import settingsSlice from './settingsSlice';
import guitarEffects from './guitarEffects';

// apply redux toolkit listener middleware
const listenerMiddleware = createListenerMiddleware();
guitarEffects(listenerMiddleware);

export default configureStore({
  reducer: {
    guitar: guitarReducer,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
