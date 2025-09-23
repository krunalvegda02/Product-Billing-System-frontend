import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _get, _post } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { updateUserProfile, updateAvatar } from "./profileSlice";

// Async thunks
export const loginUser = createAsyncThunkHandler("auth/login", _post, API_ENDPOINT.LOGIN);
export const signUpUser = createAsyncThunkHandler("auth/register", _post, API_ENDPOINT.SIGNUP);
export const logoutUser = createAsyncThunkHandler("auth/logout", _post, API_ENDPOINT.LOGOUT);

// export const forgotPassword = createAsyncThunkHandler();

const initialState = {
  isAuthenticated: false,
  user: null, // user details
  accessToken: null, // JWT access token
  refreshToken: null, // JWT refresh token
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    signUp: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      // listen for updateUserProfile success
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload.data,
        };
        if (action.payload.data.refreshToken) {
          state.refreshToken = action.payload.data.refreshToken;
        }
      })
      // Add avatar on upate avatar
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload.data,
        };
        if (action.payload.data.refreshToken) {
          state.refreshToken = action.payload.data.refreshToken;
        }
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Payload matches your provided shape
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

// Export actions and reducer
export const { login, logout, signUp } = authSlice.actions;
export default authSlice.reducer;
