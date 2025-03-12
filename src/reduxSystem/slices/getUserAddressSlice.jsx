import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userAddressApi = "http://localhost:3000/user/addresses";

export const fetchUserAddress = createAsyncThunk(
  "address/fetchUserAddress",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(userAddressApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch address");

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    userAddress: null,
    status: "idle",
    error: null,
    isAddress: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("state.status", state.status);
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAddress = false;
        state.userAddress = action.payload.addresses;
        console.log("state.status", state.status);
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAddress = false;
        console.log("state.status", state.status);
      });
  },
});

export const userAddressState = addressSlice.reducer;
