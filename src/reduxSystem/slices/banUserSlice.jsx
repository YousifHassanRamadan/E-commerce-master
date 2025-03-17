import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API endpoint
const banUserApi = "http://localhost:3000/admin/ban-user";

// Async thunk to ban or unban a user
export const banOrUnbanUser = createAsyncThunk(
  "admin/banOrUnbanUser",
  async ({ targetUserId, isBanned }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(banUserApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId, isBanned }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update user ban status"
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const banUserSlice = createSlice({
  name: "banUser",
  initialState: {
    isBanned: true,
    status: "idle",
    error: null,
  },
  reducers: {
    resetBanState: (state) => {
      state.isBanned = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(banOrUnbanUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("state.status", state.status);
      })
      .addCase(banOrUnbanUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isBanned = false;
        console.log("state.status", state.status);
      })
      .addCase(banOrUnbanUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
        state.isBanned = false;
        console.log("state.status", state.status);
      });
  },
});

export const { resetBanState } = banUserSlice.actions;

export const banUserState = banUserSlice.reducer;
