import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API endpoint
const getDashboardStatsAPi = "http://localhost:3000/admin/dashboard-stats";

// Async thunk to fetch dashboard statistics
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(getDashboardStatsAPi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch dashboard stats");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const dashboardStatsSlice = createSlice({
  name: "dashboardStats",
  initialState: {
    stats: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetDashboardStats: (state) => {
      state.stats = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
        state.status = "success";
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { resetDashboardStats } = dashboardStatsSlice.actions;

export const dashboardStatsState = dashboardStatsSlice.reducer;
