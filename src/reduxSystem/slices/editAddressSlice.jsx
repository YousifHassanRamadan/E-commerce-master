import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const addressApi = "http://localhost:3000/user/update-address";

export const editAddress = createAsyncThunk(
  "user/editAddress",
  async (updatedFields, { rejectWithValue }) => {
    console.log("updatedFields from slice", updatedFields);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(addressApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update address");

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const editAddressSlice = createSlice({
  name: "editAddressSlice",
  initialState: {
    status: "idle",
    error: null,
    isAddressEdited: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("state.status", state.status);
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAddressEdited = false;
        console.log("state.status", state.status);
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAddressEdited = false;
        console.log("state.status", state.status);
        console.log("action.payload", action.payload);
      });
  },
});

export const editAddressState = editAddressSlice.reducer;
