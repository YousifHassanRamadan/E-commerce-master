import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const deleteApi = "http://localhost:3000/user/cart/delete-item";

// دالة حذف المنتج من السلة
export const deleteProductCart = createAsyncThunk(
  "cart/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      // جلب التوكن من الـ localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      // إرسال الطلب لحذف المنتج
      const response = await fetch(deleteApi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // إرسال التوكن في الهيدرز
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      return productId; // إرجاع الـ ID للحذف من الـ state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    status: "idle",
    error: null,
    isProdDeleted: true,
  },
  reducers: {
    resetisProdDeleted: (state) => {
      state.isProdDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductCart.pending, (state) => {
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(deleteProductCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("state.status", state.status);
        state.isProdDeleted = false;
        // حذف المنتج من المصفوفة
      })
      .addCase(deleteProductCart.rejected, (state, action) => {
        state.status = "failed";
        console.log("state.status", state.status);
        state.isProdDeleted = false;
        state.error = action.payload;
      });
  },
});

export const { resetisProdDeleted } = cartSlice.actions;

export const deleteProdCart = cartSlice.reducer;
