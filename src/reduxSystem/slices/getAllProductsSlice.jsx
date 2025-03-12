import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ProductsAPI = "http://localhost:3000/products";

const initialState = {
  Allproducts: [],
  loading: true,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(ProductsAPI);

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

const getAllProductsSlice = createSlice({
  name: "getAllProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.Allproducts = action.payload.products;
      state.error = null;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const allProductsState = getAllProductsSlice.reducer;
