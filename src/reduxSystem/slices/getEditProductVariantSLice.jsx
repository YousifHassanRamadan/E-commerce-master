import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API Endpoint
const getProdVarApi = "http://localhost:3000/admin/get-edit-variant/";

// Async Thunk لجلب بيانات المنتج
export const fetchProductVariants = createAsyncThunk(
  "productVariant/fetchEdit",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found!");

      const response = await fetch(
        `http://localhost:3000/admin/get-edit-variant/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch variant data");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice لتعريف الحالة والمتغيرات
const productVariantSlice = createSlice({
  name: "productVariant",
  initialState: {
    variant: null,
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductVariants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(fetchProductVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.variant = action.payload.variants;
        state.status = "success";
        console.log("action.payload", action.payload);

        console.log("state.status", state.status);
      })
      .addCase(fetchProductVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});

export const getProdVariantState = productVariantSlice.reducer;
