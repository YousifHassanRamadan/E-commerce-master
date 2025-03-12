import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const addProdAPI = "http://localhost:3000/admin/add-product";

const initialState = {
  isProductAdded: false,
  loading: false,
  error: null,
};

export const addProduct = createAsyncThunk(
  "addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", product.title || "");
      formData.append("price", product.price || "");
      formData.append("description", product.description || "");
      formData.append("stock", product.stock || "");
      formData.append("category", product.category || "");

      if (product.thumbnail) {
        formData.append("thumbnail", product.thumbnail);
      }

      // ✅ حل المشكلة: التأكد أن images ليست undefined قبل استخدام forEach
      if (Array.isArray(product.images) && product.images.length > 0) {
        product.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      console.log([...formData]);

      const response = await fetch(addProdAPI, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addProductSlice = createSlice({
  name: "addProductSlice",
  initialState,
  reducers: {
    resetAddState: (state) => {
      console.log("🔄 Resetting productAdded state...");
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      // console.log("✅ Product added successfully", action.payload);
      state.isProductAdded = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      // console.log("❌ Failed to add product", action.payload);
      state.isProductAdded = false;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetAddState } = addProductSlice.actions;

export const addProductState = addProductSlice.reducer;
