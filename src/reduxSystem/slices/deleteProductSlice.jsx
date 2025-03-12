import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

export const deleteAdminProducts = createAsyncThunk(
  "deleteAdminProducts",

  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/products/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        // console.log("✅ Product deleted successfully:", data);
      }

      return data;
    } catch (error) {
      // console.error("❌ Error deleting product:", error.message);
    }
  }
);

const deleteAdminProductsSlice = createSlice({
  name: "deleteAdminProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteAdminProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const deleteAdminProductsState = deleteAdminProductsSlice.reducer;
