import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const clearUserCartApi = "http://localhost:3000/user/cart/clear-cart";

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(clearUserCartApi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isCartCleared: true,
    statue: "idle",
    error: null,
  },
  reducers: {
    resetIsCartCleared: (state) => {
      state.isCartCleared = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearCart.pending, (state) => {
        state.error = null;
        state.statue = "loading";
        console.log("state.statue", state.statue);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isCartCleared = false;
        state.statue = "success";
        console.log("state.statue", state.statue);
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
        state.isCartCleared = false;
        state.statue = "failed";
        console.log("state.statue", state.statue);
      });
  },
});

export const { resetIsCartCleared } = cartSlice.actions;

export const clearCartState = cartSlice.reducer;
