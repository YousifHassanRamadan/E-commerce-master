import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRTL: true,
};

const RTLSlice = createSlice({
  name: "RTLSlice",
  initialState,
  reducers: {
    handelRTL: (state, action) => {
      if (action.payload) {
        state.isRTL = true;
      } else {
        state.isRTL = false;
      }
    },
  },
});

// Export actions
export const { handelRTL } = RTLSlice.actions;

// Export reducer
export const RTLState = RTLSlice.reducer;
