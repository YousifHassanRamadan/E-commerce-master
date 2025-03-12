import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const addressApi = "http://localhost:3000/user/add-address";

// 🟢 Async Thunk for Posting Address
export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await fetch(addressApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Include token
        },
        body: JSON.stringify(addressData), // ✅ Send address data as JSON
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add address");
      }

      return data; // ✅ Return API response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🟢 User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    isAddressAdded: true,
  },
  reducers: {
    resetIsisAddressAdded: (state) => {
      state.isAddressAdded = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("state.status", state.status);
        state.isAddressAdded = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("state.status", state.status);
        state.isAddressAdded = false;
      });
  },
});

export const { resetIsisAddressAdded } = userSlice.actions;

// 🟢 Export Reducer
export const addAddressState = userSlice.reducer;
