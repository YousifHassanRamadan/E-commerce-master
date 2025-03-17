import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API endpoint
const getSalesRep = "http://localhost:3000/admin/sales-report";

// Async thunk to fetch sales report
export const fetchSalesReport = createAsyncThunk(
  "admin/fetchSalesReport",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(getSalesRep, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch sales report");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const salesReportSlice = createSlice({
  name: "salesReport",
  initialState: {
    report: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetSalesReport: (state) => {
      state.report = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSalesReport.fulfilled, (state, action) => {
        state.report = action.payload.data;
        state.status = "success";
      })
      .addCase(fetchSalesReport.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { resetSalesReport } = salesReportSlice.actions;

export const salesReportState = salesReportSlice.reducer;
