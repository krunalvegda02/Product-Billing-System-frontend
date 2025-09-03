// src/redux/slices/dashboardSlice.jsx

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { _get } from "../../helper/ApiClient";
import { buildUrlWithParams } from "../../helper/helperFunction";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";

// ✅ Thunk: fetch dashboard data
export const fetchDashboardData = createAsyncThunkHandler(
  API_ENDPOINT.GET_DASHBOARD_DATA,
  _get,
  (payload) => buildUrlWithParams(API_ENDPOINT.GET_DASHBOARD_DATA, payload) // /dashboard?duration=lastMonth
);

export const fetchDashStaffData = createAsyncThunkHandler(
  API_ENDPOINT.GET_DASHBOARD_STAFF_DATA,
  _get,
  (payload) => buildUrlWithParams(API_ENDPOINT.GET_DASHBOARD_STAFF_DATA, payload) // /dashboard/staff?duration=lastMonth
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    staffData: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetDashboard: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch dashboard data";
      });
  },
});

export const { resetDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
