import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API endpoint
const deleteProdVariantApi =
  "http://localhost:3000/admin/delete-product-variant";

// Async thunk to delete a variant
export const deleteProductVariant = createAsyncThunk(
  "variant/delete",
  async (variantId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token

      const response = await fetch(deleteProdVariantApi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in the header
        },
        body: JSON.stringify({ variantId }), // Send variantId in body
      });

      if (!response.ok) {
        throw new Error("Failed to delete variant");
      }

      return variantId; // Returning the deleted variant's ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteVariantSlice = createSlice({
  name: "deleteVariant",
  initialState: {
    isVariantDeleted: true,
    success: "idle",
    error: null,
  },
  reducers: {
    resetIsVariantDeleted: (state) => {
      state.isVariantDeleted = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleteProductVariant.pending, (state) => {
        state.success = "loading";
      })
      .addCase(deleteProductVariant.fulfilled, (state, action) => {
        state.success = "success";
        state.isVariantDeleted = false;
      })
      .addCase(deleteProductVariant.rejected, (state, action) => {
        state.success = "failed";
        state.isVariantDeleted = false;
        state.error = action.payload;
      });
  },
});

export const { resetIsVariantDeleted } = deleteVariantSlice.actions;
export const deleteProdVariantState = deleteVariantSlice.reducer;
