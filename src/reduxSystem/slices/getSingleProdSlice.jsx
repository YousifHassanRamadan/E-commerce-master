import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {
    product: null,
    isLoading: true,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.error = null;
        state.status = "loading";
        console.log("state.status", "Fetching product...");
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.product;
        state.status = "success";
        console.log("state.status", "Product fetched successfully");
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
        console.error(
          "state.status",
          "Failed to fetch product:",
          action.payload
        );
      });
  },
});

export const singleProductState = singleProductSlice.reducer;
