import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _delete, _get, _patch, _post } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { buildUrlWithParams } from "../../helper/helperFunction";

export const createCategory = createAsyncThunkHandler(API_ENDPOINT.CREATE_CATEGORY, _post, API_ENDPOINT.CREATE_CATEGORY, true);
export const getAllCategories = createAsyncThunkHandler(API_ENDPOINT.GET_ALL_CATEGORY, _get, (payload) => {
  const url = buildUrlWithParams(API_ENDPOINT.GET_ALL_CATEGORY, payload);
  return url;
});
export const getCatogory = createAsyncThunkHandler(API_ENDPOINT.GET_CATEGORY, _get, (payload) => API_ENDPOINT.GET_CATEGORY + "/" + payload.id);
export const updateCategory = createAsyncThunkHandler(
  API_ENDPOINT.UPDATE_CATEGORY,
  _patch,
  (payload) => API_ENDPOINT.UPDATE_CATEGORY + "/" + payload.id,
  true
);
export const deleteCategory = createAsyncThunkHandler(API_ENDPOINT.DELETE_CATEGORY, _delete, (payload) => {
  return API_ENDPOINT.DELETE_CATEGORY + "/" + payload.id;
});

const initialState = {
  categories: [],
  selectedCategory: {},
  totalCategories: 0,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategorySlice: (state) => {
      state.categories = [];
      state.totalCategories = 0;
      state.selectedCategory = {};
    },
    resetCategories: (state) => {
      state.categories = [];
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    deselectCategory: (state) => {
      state.selectedCategory = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = [...action.payload.data.categories];
      state.totalCategories = action.payload.data.total;
    });
  },
});

export const { resetCategorySlice, deselectCategory, setCategory } = categorySlice.actions;
export default categorySlice.reducer;
