import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API endpoint
const setAdminApi = "http://localhost:3000/admin/set-admin";

// Async thunk to set user as admin
export const setUserAsAdmin = createAsyncThunk(
  "admin/setUserAsAdmin",
  async (targetUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(setAdminApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to set user as admin");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdminEdited: true,
    status: "idle",
    error: null,
  },
  reducers: {
    resetIsAdminEdited: (state) => {
      state.isAdminEdited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserAsAdmin.pending, (state) => {
        state.success = false;
        state.error = null;
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(setUserAsAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.status = "success";
        console.log("state.status", state.status);
      })
      .addCase(setUserAsAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});

export const { resetIsAdminEdited } = adminSlice.actions;

export const setAdminState = adminSlice.reducer;
