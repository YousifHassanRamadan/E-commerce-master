import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const addCategoryAPI = "http://localhost:3000/admin/add-category";

const initialState = {
  categoryAdded: false,
  error: null,
};

export const addCategory = createAsyncThunk(
  "addCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await fetch(addCategoryAPI, {
        method: "POST",
        body: JSON.stringify({ name: category }),
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

const addCategorySlice = createSlice({
  name: "addCategorySlice",
  initialState,
  reducers: {
    resetAddCategoryState: (state) => {
      state.categoryAdded = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCategory.fulfilled, (state, action) => {
      // console.log("✅ Product added successfully");

      state.categoryAdded = true;
      state.error = null;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      // console.log("❌ Failed to add product", action.payload);
      state.categoryAdded = false;
      state.error = action.payload;
    });
  },
});

export const { resetAddCategoryState } = addCategorySlice.actions;

export const addCategoryState = addCategorySlice.reducer;
