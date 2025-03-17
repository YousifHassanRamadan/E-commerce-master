import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API endpoint
const editProdVariantApi = "http://localhost:3000/admin/edit-variant";

// Async thunk to update variant
export const updateProductVariant = createAsyncThunk(
  "variant/update",
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token

      const response = await fetch(editProdVariantApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in the header
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update variant");
      }

      const data = await response.json();
      return data; // Returning updated variant data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const variantSlice = createSlice({
  name: "variant",
  initialState: {
    isVariantEdited: true,
    success: "idle",
    error: null,
  },
  reducers: {
    resetIsVariantEdited: (state) => {
      state.isVariantEdited = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateProductVariant.pending, (state) => {
        state.success = "loading";
        console.log("state.success", state.success);
      })
      .addCase(updateProductVariant.fulfilled, (state, action) => {
        state.success = "success";
        state.isVariantEdited = false;
        console.log("state.success", state.success);
      })
      .addCase(updateProductVariant.rejected, (state, action) => {
        state.success = "failed";
        state.isVariantEdited = false;
        state.error = action.payload;
        console.log("state.success", state.success);
      });
  },
});

export const { resetIsVariantEdited } = variantSlice.actions;

export const editProdVariantState = variantSlice.reducer;
