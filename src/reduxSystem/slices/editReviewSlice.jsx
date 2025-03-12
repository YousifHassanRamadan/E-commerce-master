import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const editRev = "http://localhost:3000/user/update-review";

// Async Thunk to update the review
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(editRev, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update review");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    isEdited: true,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateReview.pending, (state) => {
        state.error = null;
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isEdited = false;
        state.status = "success";
        console.log("state.status", state.status);
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isEdited = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});

export const reviewState = reviewSlice.reducer;
