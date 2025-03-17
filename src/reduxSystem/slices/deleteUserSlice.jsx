import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API endpoint
const deleteUserApi = "http://localhost:3000/admin/delete-user";

// Async thunk to delete a user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (targetUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(deleteUserApi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
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
    isUserDeleted: true,
    status: "idle",
    error: null,
  },
  reducers: {
    resetDeleteUserState: (state) => {
      state.isUserDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("state.status", state.status);
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isUserDeleted = false;
        state.status = "success";
        console.log("state.status", state.status);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isUserDeleted = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});

export const { resetDeleteUserState } = adminSlice.actions;

export const deleteUserState = adminSlice.reducer;
