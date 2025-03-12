import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const placeOrderApi = "http://localhost:3000/user/place-order";

// إنشاء thunk لإرسال الطلب
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // ✅ جلب التوكن من Local Storage

      const response = await fetch(placeOrderApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ إرسال التوكن في الهيدر
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const placeOrderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {}, // لا يوجد Reducer عادي، فقط Thunk
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        console.log("state.status", state.status);
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        console.log("state.status", state.status);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});

export const placeOrderState = placeOrderSlice.reducer;
