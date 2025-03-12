import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const CategoryiesAPI = "http://localhost:3000/admin/categories";

const initialState = {
  Allcategories: [],
  categoryLoading: false,
  error: null,
};

export const getAllCategory = createAsyncThunk(
  "getAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(CategoryiesAPI, {
        method: "GET",
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

const getCategorySlice = createSlice({
  name: "getCategorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state) => {
      state.categoryLoading = true;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      // console.log("✅ Categories fetched successfully", action.payload);
      state.categoryLoading = false;
      state.Allcategories = action.payload.categories;
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      // console.log("❌ Failed to add product", action.payload);
      state.categoryLoading = false;
      state.error = action.payload;
    });
  },
});

export const getCategoryState = getCategorySlice.reducer;
