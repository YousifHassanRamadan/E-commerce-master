import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// 🔹 API Endpoint
const deleteAddressApi = "http://localhost:3000/user/delete-address";

// 🔹 Async Thunk لحذف العنوان
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await fetch(deleteAddressApi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ addressId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      return addressId; // ✅ إرجاع ID العنوان المحذوف لتحديث الحالة
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Slice لتعريف الحالة والإجراءات
const deleteAddressSlice = createSlice({
  name: "deleteAddress",
  initialState: {
    isLoading: false,
    error: null,
    isAddressDeleted: true,
    status: "idle",
  },
  reducers: {
    resetisAddressDeleted: (state) => {
      state.isAddressDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
        console.log("state.status", state.status);
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAddressDeleted = false;
        state.error = null;
        state.status = "success";
        console.log("state.status", state.status);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isAddressDeleted = false;
        state.error = action.payload;
        state.status = "failed";
        console.log("state.status", state.status);
      });
  },
});

export const { resetisAddressDeleted } = deleteAddressSlice.actions;

export const deleteAddressState = deleteAddressSlice.reducer;
