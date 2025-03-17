import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const addDiscountAPI = "http://localhost:3000/admin/create-offer";

const initialState = {
  isDiscountAdded: false,
  loading: false,
  error: null,
};

// ✅ إضافة الخصم بدون FormData
export const addDiscount = createAsyncThunk(
  "addDiscount",
  async (discountData, { rejectWithValue }) => {
    try {
      const response = await fetch(addDiscountAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...discountData }), // إرسال البيانات كـ JSON
      });

      if (!response.ok) {
        throw new Error("Failed to add discount");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const discountSlice = createSlice({
  name: "discountSlice",
  initialState,
  reducers: {
    resetDiscountState: (state) => {
      console.log("🔄 Resetting discount state...");
      state.isDiscountAdded = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDiscount.pending, (state) => {
      state.loading = true;
      state.isDiscountAdded = false;
      state.error = null;
    });
    builder.addCase(addDiscount.fulfilled, (state, action) => {
      console.log("✅ Discount added successfully", action.payload);
      state.isDiscountAdded = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addDiscount.rejected, (state, action) => {
      console.log("❌ Failed to add discount", action.payload);
      state.isDiscountAdded = false;
      state.loading = false;
      state.error = action.payload;

      console.log("action.payload", action.payload);
    });
  },
});

export const { resetDiscountState } = discountSlice.actions;
export const discountState = discountSlice.reducer;
