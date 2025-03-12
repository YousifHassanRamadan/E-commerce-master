import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// عنوان الـ API لإضافة المراجعة
const addRevApi = "http://localhost:3000/user/add-review";

// إنشاء `Thunk` لإرسال المراجعة
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        return rejectWithValue("User not authenticated");
      }

      const response = await fetch(addRevApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const responseText = await response.text();
      console.log("Server Response:", responseText);

      if (!response.ok) {
        return rejectWithValue(responseText || "Failed to add review");
      }

      return JSON.parse(responseText);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    isRevAdded: true,
    error: null,
    status: "idle",
  },
  reducers: {
    resetIsRevAdded: (state) => {
      state.isRevAdded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.error = null;
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isRevAdded = false;
        state.status = "succes";
        console.log("state.status", state.status);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isRevAdded = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});

export const { resetIsRevAdded } = reviewSlice.actions;

export const addRevState = reviewSlice.reducer;
