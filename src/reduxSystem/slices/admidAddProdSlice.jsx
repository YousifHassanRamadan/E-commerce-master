import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const addProdAPI = "http://localhost:3000/admin/add-product"; // استبدل بالرابط الفعلي

export const AdminAddProduct = createAsyncThunk(
  "products/AdminAddProduct",
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

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    isProductAdded: false,
  },
  reducers: {
    resetState: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
      state.isProductAdded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminAddProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AdminAddProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isProductAdded = true;
        state.products.push(action.payload);
      })
      .addCase(AdminAddProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = productSlice.actions;
export const AdminAddProductState = productSlice.reducer;
