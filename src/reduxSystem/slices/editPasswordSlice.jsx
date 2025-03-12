import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 رابط الـ API
const changePasswordApi = "http://localhost:3000/user/update-password";

// 🔹 Async Thunk لتغيير كلمة المرور
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // جلب التوكن من LocalStorage

      const response = await fetch(changePasswordApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // تضمين التوكن في الهيدر
        },
        body: JSON.stringify({ currentPassword, newPassword }), // إرسال البيانات كـ JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 إنشاء Slice
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    status: "", // تم تصحيح "states" إلى "status" لتكون أكثر دقة
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.status = "success";
        console.log("status:", state.status);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.status = "failed";
        console.log("status:", state.status);
      });
  },
});

export const changePasswordstate = changePasswordSlice.reducer;
