import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/products";

const initialState = {
  Allproducts: [],
  loading: true,
  error: null,
  status: "idle",
};

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ category = "", search = "" } = {}, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}?sort=true`;

      if (category) url += `&category=${category}`;

      if (search) url += `&search=${search}`;

      const response = await fetch(url, { method: "GET" });

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
      state.status = "loading";
      console.log("state.status", state.status);
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.Allproducts = action.payload.products;
      state.error = null;
      state.status = "success";
      console.log("state.status", state.status);
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.Allproducts = []; // ✅ تصفير المنتجات عند حدوث خطأ
      state.error = action.payload;
      state.status = "failed";
      console.log("state.error", state.error);
      console.log("state.status", state.status);
    });
  },
});

export const allProductsState = getAllProductsSlice.reducer;
