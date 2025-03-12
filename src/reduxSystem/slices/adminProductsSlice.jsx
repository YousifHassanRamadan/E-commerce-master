import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ProductsAPI = "http://localhost:3000/admin/products";

const initialState = {
  Allproducts: [],
  productLoading: false,
  error: null,
};

export const getAdminProducts = createAsyncThunk(
  "getAdminProducts",

  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(ProductsAPI, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminProductsSlice = createSlice({
  name: "adminProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminProducts.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.productLoading = false;
      state.Allproducts = action.payload.products;
      state.error = null;
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      state.productLoading = null;
      state.error = action.payload;
    });
  },
});

export const adminProductsState = adminProductsSlice.reducer;
