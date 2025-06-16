// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _post } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";

export const loginUser = createAsyncThunkHandler("auth/login", _post, API_ENDPOINT.LOGIN);
export const signUpUser = createAsyncThunkHandler("auth/register", _post, API_ENDPOINT.SIGNUP);
export const logoutUser = createAsyncThunkHandler("auth/logout", _post, API_ENDPOINT.LOGOUT);

const initialState = {
  isAuthenticated: false,
  userData: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.token = null;
    },
    signUpUser: (state,action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
    // For Login
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload.data.user_data;
        state.token = action.payload.data.access_token;

        localStorage.setItem("CDUser", JSON.stringify(action.payload.data.user_data));
        localStorage.setItem("CDToken", action.payload.data.access_token);
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthenticated = false;
      })
      // For SignUp
      .addCase(signUpUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload.data.user_data;
        state.token = action.payload.data.access_token;

        localStorage.setItem("CDUser", JSON.stringify(action.payload.data.user_data));
        localStorage.setItem("CDToken", action.payload.data.access_token);
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
