import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const addFavApi = "http://localhost:3000/user/favorites";

// ✅ جلب قائمة المفضلة من الباك‌اند
export const fetchFavorites = createAsyncThunk(
  "favourite/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await fetch(addFavApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch favorites");

      const data = await response.json();
      return data; // نفترض أن البيانات هي مصفوفة من المنتجات المفضلة
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favourites: [],
    loading: true,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favourites = action.payload.favorites;
        state.loading = false;
        console.log("status:", state.status);
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
        console.log("status:", state.status);
      });
  },
});

export const getFavouritestate = favouriteSlice.reducer;
