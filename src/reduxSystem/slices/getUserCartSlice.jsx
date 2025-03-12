import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getCartApi = "http://localhost:3000/user/cart";

// إنشاء thunk لجلب بيانات السلة مع استخدام التوكن من localStorage
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // جلب التوكن من localStorage
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(getCartApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "getCart",
  initialState: {
    userCart: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    totalCartPrice: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userCart = action.payload.cart;
        state.totalCartPrice = action.payload.totalCartPrice;

        console.log("action.payload", action.payload.cart);

        console.log("state.status", state.status);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("state.status", state.status);
      });
  },
});

export const getCartState = cartSlice.reducer;
