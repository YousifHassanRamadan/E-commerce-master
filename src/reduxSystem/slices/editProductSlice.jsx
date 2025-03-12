import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  editLoading: false,
  productEdited: false,
  error: null,
};

export const editProduct = createAsyncThunk(
  "editProduct",
  async (product, { rejectWithValue }) => {
    try {
      const prodId = product._id;
      const formData = new FormData();
      formData.append("title", product.title || "");
      formData.append("price", product.price || "");
      formData.append("productId", prodId || "");
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

      const response = await fetch(
        `http://localhost:3000/admin/products/edit-product`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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

const editProductSlice = createSlice({
  name: "editProductSlice",
  initialState,
  reducers: {
    resetEditState: (state) => {
      state.productEdited = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editProduct.pending, (state, action) => {
      state.productEdited = false;
      state.editLoading = true;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      // console.log("✅ Product Edit successfully", action.payload);
      state.productEdited = true;
      // console.log("isEdited ?", state.productEdited);

      state.editLoading = false;
      state.error = null;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      // console.log("❌ Failed to Edit product", action.payload);
      state.productEdited = false;
      state.editLoading = false;
      state.error = action.payload;
    });
  },
});
export const { resetEditState } = editProductSlice.actions;
export const editProductState = editProductSlice.reducer;
