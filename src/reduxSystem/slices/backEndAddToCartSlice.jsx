import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const addTocartApi = "http://localhost:3000/user/cart/add-to-cart";

// ✅ دالة غير متزامنة لإرسال المنتج للباك اند
export const addToCartBack = createAsyncThunk(
  "cart/addToCartBack",
  async ({ product }, { rejectWithValue }) => {
    try {
      const response = await fetch(addTocartApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // لو فيه توكن
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: product.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("فشل في إضافة المنتج إلى السلة");
      }

      return await response.json(); // إرجاع البيانات القادمة من الباك اند
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const backEndAddToCartSlice = createSlice({
  name: "backEndAddToCartSlice",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartBack.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartBack.fulfilled, (state, action) => {
        console.log("✅ cart added successfully", action.payload);
        state.loading = false;
      })
      .addCase(addToCartBack.rejected, (state, action) => {
        console.log("❌ Failed to add cart", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const backEndAddToCartState = backEndAddToCartSlice.reducer;
