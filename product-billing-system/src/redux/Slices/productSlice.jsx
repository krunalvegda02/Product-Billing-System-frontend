import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _delete, _get, _patch, _post } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { buildUrlWithParams } from "../../helper/helperFunction";

// 🔹 Async Thunks
export const createProduct = createAsyncThunkHandler(API_ENDPOINT.CREATE_PRODUCT, _post, API_ENDPOINT.CREATE_PRODUCT, true);

export const getAllProducts = createAsyncThunkHandler(API_ENDPOINT.GET_ALL_PRODUCT, _get, (payload) =>
  buildUrlWithParams(API_ENDPOINT.GET_ALL_PRODUCT, payload)
);

export const getCategoryById = createAsyncThunkHandler(API_ENDPOINT.GET_PRODUCT, _get, (payload) => `${API_ENDPOINT.GET_PRODUCT}/${payload.id}`);

export const fetchCategoryProducts = createAsyncThunkHandler(
  API_ENDPOINT.GET_PRODUCT_BY_CATEGORY,
  _get,
  (payload) => `${API_ENDPOINT.GET_PRODUCT_BY_CATEGORY}/${payload.categoryId}`
);

export const updateProduct = createAsyncThunkHandler(
  API_ENDPOINT.UPDATE_PRODUCT,
  _patch,
  (payload) => `${API_ENDPOINT.UPDATE_PRODUCT}/${payload.id}`,
  true
);

export const deleteProduct = createAsyncThunkHandler(
  API_ENDPOINT.DELETE_PRODUCT,
  _delete,
  (payload) => `${API_ENDPOINT.DELETE_PRODUCT}/${payload.id}`
);

export const getLikedProducts = createAsyncThunkHandler(API_ENDPOINT.GET_LIKED_PRODUCTS, _get);

export const toggleProductLiked = createAsyncThunkHandler(
  API_ENDPOINT.TOGGLE_LIKE_PRODUCT,
  _patch,
  (payload) => `${API_ENDPOINT.TOGGLE_LIKE_PRODUCT}/${payload.id}`
);

// 🔹 Initial State
const initialState = {
  products: [],
  selectedProduct: {},
  totalProducts: 0,
  loading: false,
  error: null,
};

// 🔹 Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductSlice: (state) => {
      state.products = [];
      state.totalProducts = 0;
      state.selectedProduct = {};
      state.loading = false;
      state.error = null;
    },
    setProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    deselectProduct: (state) => {
      state.selectedProduct = {};
    },
  },
  extraReducers: (builder) => {
    // 📦 Get all products
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      const data = action.payload?.data;
      state.products = data?.products || [];
      state.totalProducts = data?.total || 0;
      state.loading = false;
    });

    // 📦 Fetch products by category
    builder.addCase(fetchCategoryProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
      const data = action.payload?.data;
      state.products = data?.products || [];
      state.loading = false;
    });
    builder.addCase(fetchCategoryProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // ✅ Create product
    builder.addCase(createProduct.fulfilled, (state, action) => {
      const newProduct = action.payload?.data?.product;
      if (newProduct) state.products.unshift(newProduct);
    });

    // ✏️ Update product
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updated = action.payload?.data?.product;
      if (updated) {
        const index = state.products.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.products[index] = updated;
        }
      }
    });

    // ❌ Delete product
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const id = action.meta?.arg?.id;
      if (id) {
        state.products = state.products.filter((p) => p._id !== id);
      }
    });

    // 🔍 Get product by ID
    builder.addCase(getCategoryById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      const product = action.payload?.data?.product;
      state.selectedProduct = product || {};
      state.loading = false;
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch product";
    });

    // ❤️ Get liked products
    builder.addCase(getLikedProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLikedProducts.fulfilled, (state, action) => {
      const products = action.payload?.data?.products;
      state.products = products || [];
      state.loading = false;
    });
    builder.addCase(getLikedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch liked products";
    });

    // ❤️ Toggle liked product
    builder.addCase(toggleProductLiked.fulfilled, (state, action) => {
      const updated = action.payload?.data?.product;
      if (updated) {
        const index = state.products.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.products[index] = updated;
        }
      }
    });
  },
});

// 🔹 Exports
export const { resetProductSlice, deselectProduct, setProduct } = productSlice.actions;
export default productSlice.reducer;
