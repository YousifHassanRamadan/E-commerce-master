import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],
  loading: false,
  isLoading: false,
};

// ✅ رابط API لإضافة/إزالة المنتج من المفضلة
const addFavApi = "http://localhost:3000/user/favorites/toggle";

// ✅ Thunk لإرسال الطلب إلى السيرفر
export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async (product, { rejectWithValue }) => {
    try {
      const productId = product._id; // استخراج الـ ID من المنتج
      const response = await fetch(addFavApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // إرسال التوكن للمصادقة
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to toggle favorite");
      }

      return data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice لإدارة حالة المفضلة
const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourite: (state, action) => {
      state.favourites = action.payload || [];
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.isLoading = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoading = false;

        // ✅ تحديث `state.favourites` مباشرةً من استجابة الـ API (مصفوفة الـ IDs)
        state.favourites = action.payload.favorites;

        // ✅ تحديث localStorage لضمان بقاء البيانات متزامنة
        localStorage.setItem("favourites", JSON.stringify(state.favourites));

        console.log("Favorites updated successfully!");
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.isLoading = false;
        state.error = action.payload;
        console.log("Failed to update favorites:", action.payload);
      });
  },
});

export const { setFavourite } = favouriteSlice.actions;
export const favouriteState = favouriteSlice.reducer;
