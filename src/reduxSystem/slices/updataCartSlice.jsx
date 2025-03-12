import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const updateCartApi = "http://localhost:3000/user/cart/update-cart";

// دالة تحديث المنتج في السلة
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      // جلب التوكن من الـ localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      // إرسال الطلب للتحديث
      const response = await fetch(updateCartApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // إرسال التوكن في الهيدرز
        },
        body: JSON.stringify({ productId, quantity }), // إرسال الـ ID والكمية الجديدة
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update cart item");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    isEdited: true,
  },
  reducers: {
    resetEditCartState: (state) => {
      state.isEdited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("state.status", state.status);
        state.isEdited = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("state.status", state.status);
        state.isEdited = false;
      });
  },
});

export const { resetEditCartState } = cartSlice.actions;

export const editCartState = cartSlice.reducer;
