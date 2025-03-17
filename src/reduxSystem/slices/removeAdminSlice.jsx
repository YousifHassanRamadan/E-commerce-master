import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API endpoint
const removeAdminApi = "http://localhost:3000/admin/remove-admin";

// Async thunk to remove admin role from a user
export const removeUserAsAdmin = createAsyncThunk(
  "admin/removeUserAsAdmin",
  async (targetUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(removeAdminApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove user as admin");
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
    isRemoveAdmin: true,
    status: "idle",
    error: null,
  },
  reducers: {
    removedIsRemoveAdmin: (state) => {
      state.isRemoveAdmin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeUserAsAdmin.pending, (state) => {
        state.status = "loading";
        console.log("state.status", state.status);
        state.error = null;
      })
      .addCase(removeUserAsAdmin.fulfilled, (state) => {
        state.isRemoveAdmin = false;
        state.status = "success";
        console.log("state.status", state.status);
      })
      .addCase(removeUserAsAdmin.rejected, (state, action) => {
        state.isRemoveAdmin = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});

export const { removedIsRemoveAdmin } = adminSlice.actions;

export const removeAdminState = adminSlice.reducer;
