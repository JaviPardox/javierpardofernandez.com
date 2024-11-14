// This file creates the actual Redux store. It's like a container that holds all our state.
// We add our loading reducer to it, and could add more reducers for other features later.

import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer, // Add our loading reducer to the store
  },
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;