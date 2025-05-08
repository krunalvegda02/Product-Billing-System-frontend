import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _delete, _get, _patch, _post } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { buildUrlWithParams } from "../../helper/helperFunction";

export const createProduct = createAsyncThunkHandler(API_ENDPOINT.CREATE_PRODUCT, _post, API_ENDPOINT.CREATE_PRODUCT, true);
export const getAllProducts = createAsyncThunkHandler(API_ENDPOINT.GET_ALL_PRODUCT, _get, (payload) => {
  const url = buildUrlWithParams(API_ENDPOINT.GET_ALL_PRODUCT, payload);
  return url;
});
export const getCatogory = createAsyncThunkHandler(API_ENDPOINT.GET_PRODUCT, _get, (payload) => API_ENDPOINT.GET_PRODUCT + "/" + payload.id);
export const updateProduct = createAsyncThunkHandler(
  API_ENDPOINT.UPDATE_PRODUCT,
  _patch,
  (payload) => API_ENDPOINT.UPDATE_PRODUCT + "/" + payload.id,
  true
);
export const deleteProduct = createAsyncThunkHandler(API_ENDPOINT.DELETE_PRODUCT, _delete, (payload) => {
  return API_ENDPOINT.DELETE_PRODUCT + "/" + payload.id;
});

const initialState = {
  products: [],
  selectedProduct: {},
  totalProducts: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: { 
    resetProductSlice: (state) => {
      state.products = [];
      state.totalProducts = 0;
      state.selectedProduct = {};
    },
    setProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    deselectProduct: (state) => {
      state.selectedProduct = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.data.products;
      state.totalProducts = action.payload.data.total;
    });
  },
});

export const { resetProductSlice, deselectProduct, setProduct } = productSlice.actions;
export default productSlice.reducer;
