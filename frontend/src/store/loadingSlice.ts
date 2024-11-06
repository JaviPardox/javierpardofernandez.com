// This file creates a "slice" of our Redux store dedicated to loading state.
// Think of it like a feature module that handles everything related to loading states.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean; // Define what our state looks like
  loadingResources: string[];
  errors: Record<string, string>;
}

const initialState: LoadingState = {
  isLoading: false, // Set initial state
  loadingResources: [],
  errors: {}
};

export const loadingSlice = createSlice({
  name: 'loading', // Name of this slice of state
  initialState,    // Initial state we defined above
  reducers: {
    // Define actions that can modify this state
    startLoading: (state, action: PayloadAction<string>) => {
      if (!state.loadingResources.includes(action.payload)) {
        state.loadingResources.push(action.payload);
      }
      state.isLoading = true;
    },
    finishLoading: (state, action: PayloadAction<string>) => {
      state.loadingResources = state.loadingResources.filter(
        (resource) => resource !== action.payload
      );
      state.isLoading = state.loadingResources.length !== 0;
    },
    setError: (state, action: PayloadAction<{ resource: string; error: string }>) => {
      state.errors[action.payload.resource] = action.payload.error;
    },
    clearError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    }
  }
});

// Export the action creator and reducer
export const { startLoading, finishLoading, setError, clearError } = loadingSlice.actions;
export default loadingSlice.reducer;