import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const editProfileApi = "http://localhost:3000/user/update-profile";

// 🟢 Async Thunk لتحديث بيانات المستخدم باستخدام JSON
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (updatedFields, { rejectWithValue }) => {
    try {
      const response = await fetch(editProfileApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedFields), // ✅ إرسال القيم المعدلة فقط
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🟢 إنشاء الـ Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    isProfileEdited: false, // قيمة افتراضية أكثر منطقية
    isEditProfLoading: true,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.status = "loading";
        state.isProfileEdited = false;
      })
      .addCase(updateUserInfo.fulfilled, (state) => {
        state.status = "succeeded";
        state.isProfileEdited = true;
        state.isEditProfLoading = false;
        console.log("status:", state.status);
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isProfileEdited = false;
        state.isEditProfLoading = false;
        console.log("status:", state.status);
      });
  },
});

// 🟢 تصدير الـ Reducer
export const userSliceState = userSlice.reducer;
