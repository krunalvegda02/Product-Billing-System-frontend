// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ROLE } from "../../constants/ROLE";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { _post } from "../../helper/apiClient";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";

export const loginUser = createAsyncThunkHandler("auth/login", _post, API_ENDPOINT.LOGIN);
export const signUpUser = createAsyncThunkHandler("auth/signUp", _post, API_ENDPOINT.CREATE_USER);

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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;