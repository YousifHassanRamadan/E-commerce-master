import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// URL الخاص بحذف المراجعة
const deleteRevUrl = "http://localhost:3000/user/delete-review";

// تعريف thunk لحذف المراجعة
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      // جلب التوكن من localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(deleteRevUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // إرسال التوكن مع الطلب
        },
        body: JSON.stringify({ reviewId }), // إرسال reviewId في body
      });

      if (!response.ok) {
        throw new Error("Failed to delete the review");
      }

      return reviewId; // نعيد ID المراجعة المحذوفة فقط
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// إنشاء Slice
const deleteReviewSlice = createSlice({
  name: "deleteReview",
  initialState: { isRevDeleted: true, error: null, status: "idle" },
  reducers: {
    resetIsDeleted: (state) => {
      state.isRevDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteReview.pending, (state) => {
        state.error = null;
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.isRevDeleted = false;
        state.status = "success";
        console.log("state.status", state.status);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isRevDeleted = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});
export const { resetIsDeleted } = deleteReviewSlice.actions;

export const deleteReviewState = deleteReviewSlice.reducer;
