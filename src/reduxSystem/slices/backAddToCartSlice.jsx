import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const addProdApi = "http://localhost:3000/user/cart/add-to-cart";

// Async Thunk to add products to cart
export const addToCartApi = createAsyncThunk(
  "cart/addToCartApi",
  async (products, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(addProdApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error("Failed to add products to cart");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cartAPI",
  initialState: {
    status: "idle",
    error: null,
    isProductAdded: true,
  },
  reducers: {
    resetisProductAdded: (state) => {
      state.isProductAdded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartApi.pending, (state) => {
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(addToCartApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isProductAdded = false;
        // console.log("state.status", state.status);
      })
      .addCase(addToCartApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isProductAdded = false;
        // console.log("state.status", state.status);
      });
  },
});

export const { resetisProductAdded } = cartSlice.actions;

export const AddToCartState = cartSlice.reducer;
