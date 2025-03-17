import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const addVariantAPI = "http://localhost:3000/admin/add-variant";

const initialState = {
  isVariantAdded: false,
  loading: false,
  error: null,
};

export const addVariant = createAsyncThunk(
  "addVariant",
  async (variant, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("productId", variant.productId || "");
      formData.append("color", variant.color || "");
      formData.append("size", variant.size || "");
      formData.append("stock", variant.stock || "");
      formData.append("price", variant.price || "");

      // ✅ التأكد من أن الصور ليست undefined قبل رفعها
      if (Array.isArray(variant.images) && variant.images.length > 0) {
        variant.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      console.log([...formData]);

      const response = await fetch(addVariantAPI, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add variant");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const variantSlice = createSlice({
  name: "variantSlice",
  initialState,
  reducers: {
    resetVariantState: (state) => {
      console.log("🔄 Resetting variant state...");
      state.isVariantAdded = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addVariant.pending, (state) => {
      state.loading = true;
      state.isVariantAdded = false;
      state.error = null;
    });
    builder.addCase(addVariant.fulfilled, (state, action) => {
      console.log("✅ Variant added successfully", action.payload);
      state.isVariantAdded = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addVariant.rejected, (state, action) => {
      console.log("❌ Failed to add variant", action.payload);
      state.isVariantAdded = false;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetVariantState } = variantSlice.actions;
export const variantState = variantSlice.reducer;
