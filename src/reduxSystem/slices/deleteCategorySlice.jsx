import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const deleteCategoryAPI = "http://localhost:3000/admin/categories/delete";

export const deleteCategory = createAsyncThunk(
  "deleteAllCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(deleteCategoryAPI, {
        method: "DELETE",
        body: JSON.stringify({ categoryId: id }),
        headers: {
          "Content-Type": "application/json",
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

const deleteCategorySlice = createSlice({
  name: "deleteCategorySlice",
  initialState: {
    categoryDeleted: false,
    error: null,
  },
  reducers: {
    resetDeletedState: (state) => {
      state.categoryDeleted = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      console.log("✅ category deleted successfully");
      state.categoryDeleted = true;
      state.error = false;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      console.log("❌ Failed to delete category", action.payload);
      state.categoryDeleted = true;
      state.error = true;
    });
  },
});

export const { resetDeletedState } = deleteCategorySlice.actions;

export const deleteCategoryState = deleteCategorySlice.reducer;
