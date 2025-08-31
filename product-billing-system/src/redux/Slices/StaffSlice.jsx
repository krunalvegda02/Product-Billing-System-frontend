// src/redux/slices/staffSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { _get, _post, _patch, _delete } from "../../helper/ApiClient";
import { buildUrlWithParams } from "../../helper/helperFunction";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";

// 🔹 API Thunks
export const fetchStaffs = createAsyncThunkHandler(API_ENDPOINT.STAFF.GET_STAFF, _get, (params) =>
  buildUrlWithParams(API_ENDPOINT.STAFF.GET_STAFF, params)
);

export const fetchServants = createAsyncThunkHandler(API_ENDPOINT.STAFF.GET_SERVER, _get, (params) =>
  buildUrlWithParams(API_ENDPOINT.STAFF.GET_SERVER, params)
);

export const addStaff = createAsyncThunkHandler(API_ENDPOINT.STAFF.CREATE_STAFF, _post, API_ENDPOINT.STAFF.CREATE_STAFF);

export const updateStaff = createAsyncThunkHandler(
  API_ENDPOINT.STAFF.UPDATE_STAFF,
  _patch,
  (payload) => `${API_ENDPOINT.STAFF.UPDATE_STAFF.replace(":id", payload.id)}`
);

export const deleteStaff = createAsyncThunkHandler(
  API_ENDPOINT.STAFF.DELETE_STAFF,
  _delete,
  (payload) => `${API_ENDPOINT.STAFF.DELETE_STAFF.replace(":id", payload.id)}`
);



// 🔹 Initial State
const initialState = {
  list: [],
  servants: [],
  loading: false, // for global loading
  actionLoading: false, // for add/update/delete
  error: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===================== Fetch Staffs =====================
      .addCase(fetchStaffs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || [];
      })
      .addCase(fetchStaffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===================== Fetch Servants =====================
      .addCase(fetchServants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServants.fulfilled, (state, action) => {
        state.servants = action.payload.data || [];
      })

      // ===================== Add Staff =====================
      .addCase(addStaff.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.list.push(action.payload.data);
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ===================== Update Staff =====================
      .addCase(updateStaff.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.list.findIndex((s) => s.id === action.payload.data.id);
        if (index !== -1) {
          state.list[index] = action.payload.data;
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ===================== Delete Staff =====================
      .addCase(deleteStaff.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.list = state.list.filter((s) => s.id !== action.payload.data.id);
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export default staffSlice.reducer;
