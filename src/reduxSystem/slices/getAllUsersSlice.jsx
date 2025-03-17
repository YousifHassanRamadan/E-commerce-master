import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch users with search query
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/all-users?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // If authentication is required
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Redux slice
const getAllUsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const getAllUsersState = getAllUsersSlice.reducer;
