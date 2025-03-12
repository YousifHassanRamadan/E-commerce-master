import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getUserOrderApi = "http://localhost:3000/user/orders";

// ✅ تعريف Async Thunk لجلب الطلبات
export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // ✅ جلب التوكن من Local Storage
      if (!token) throw new Error("User is not authenticated");

      const response = await fetch(getUserOrderApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user orders");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const ordersUserState = ordersSlice.reducer;
