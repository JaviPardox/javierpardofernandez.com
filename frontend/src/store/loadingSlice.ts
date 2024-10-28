// This file creates a "slice" of our Redux store dedicated to loading state.
// Think of it like a feature module that handles everything related to loading states.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean; // Define what our state looks like
}

const initialState: LoadingState = {
  isLoading: false // Set initial state
};

export const loadingSlice = createSlice({
  name: 'loading', // Name of this slice of state
  initialState,    // Initial state we defined above
  reducers: {
    // Define actions that can modify this state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;  // Update state based on action
    }
  }
});

// Export the action creator and reducer
export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;