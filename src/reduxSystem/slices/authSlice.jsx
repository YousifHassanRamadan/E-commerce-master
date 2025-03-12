import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const signUpApi = "http://localhost:3000/user/auth/signup";
const logInApi = "http://localhost:3000/user/auth/login";
const userDataApi = "http://localhost:3000/user/data";

const getUserData = () => {
  try {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    // console.error("Error parsing userData from localStorage:", error);
    return null;
  }
};

const initialState = {
  isLogged: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  signUpErr: null,
  token: localStorage.getItem("token") || null,
  userData: getUserData(),
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(signUpApi, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to sign up");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(logInApi, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed To Log In");
      const data = await response.json();
      localStorage.setItem("token", data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (token, { rejectWithValue }) => {
    try {
      if (!token) throw new Error("No token provided");
      const response = await fetch(userDataApi, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLogged = false;
      state.token = null;
      state.userData = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.signUpErr = false;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.signUpErr = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.signUpErr = true;
      })
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        state.token = action.payload.accessToken;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.isLogged = false;
        state.error = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export const authState = authSlice.reducer;
