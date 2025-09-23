import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _post, _patch } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";

// 🔹 Async thunks using your helper
export const updateAdminProfile = createAsyncThunkHandler("profile/updateAdminProfile", _patch, API_ENDPOINT.UPDATE_PROFILEc);

 export const updateAvatar = createAsyncThunkHandler("profile/updateAvatar", _patch, API_ENDPOINT.UPDATE_AVATAR, true);

export const updateUserProfile = createAsyncThunkHandler("profile/updateUserProfile", _patch, API_ENDPOINT.UPDATE_PROFILE);

export const updateUserPassword = createAsyncThunkHandler("profile/updateUserPassword", _post, API_ENDPOINT.CHANGE_PASSWORD);

// 🔹 Initial State
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

// 🔹 Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          ...action.payload.data,
        };

        // Update refreshToken if provided
        if (action.payload.data.refreshToken) {
          state.refreshToken = action.payload.data.refreshToken;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update profile";
      })

      // Update Password
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.isLoading = false;
        // no user changes, just password updated
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update password";
      })

      // Update Avatar
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, avatar: action.payload?.data?.avatar };
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update avatar";
      })

      // Admin Profile Update
      .addCase(updateAdminProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data?.user || state.user;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update admin profile";
      });
  },
});

// 🔹 Export actions and reducer
export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
