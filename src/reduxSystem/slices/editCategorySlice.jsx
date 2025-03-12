import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const editCategoryAPI = "http://localhost:3000/admin/categories/update";

export const editCategory = createAsyncThunk(
  "editCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await fetch(editCategoryAPI, {
        method: "PUT",
        body: JSON.stringify({
          name: category.name,
          categoryId: category.categoryId,
        }),
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

const editCategorySlice = createSlice({
  name: "editCategorySlice",
  initialState: { isCategoryEdited: false, error: null },
  reducers: {
    resetEditCatState: (state) => {
      state.isCategoryEdited = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editCategory.fulfilled, (state, action) => {
      console.log("✅ Category Edited successfully");

      state.isCategoryEdited = true;

      state.error = null;
    });
    builder.addCase(editCategory.rejected, (state, action) => {
      console.log("❌ Failed to  Edit Category", action.payload);
      state.error = action.payload;
      state.isCategoryEdited = false;
    });
  },
});

export const { resetEditCatState } = editCategorySlice.actions;

export const editCategoryState = editCategorySlice.reducer;
