import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _delete, _get, _patch, _post } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { buildUrlWithParams } from "../../helper/helperFunction";

// ✅ Thunks
export const createCategory = createAsyncThunkHandler(
  API_ENDPOINT.CREATE_CATEGORY,
  _post,
  API_ENDPOINT.CREATE_CATEGORY,
  true
);

export const getAllCategories = createAsyncThunkHandler(
  API_ENDPOINT.GET_ALL_CATEGORY,
  _get,
  (payload) => buildUrlWithParams(API_ENDPOINT.GET_ALL_CATEGORY, payload)
);

// export const getCatogory = createAsyncThunkHandler(
//   API_ENDPOINT.GET_CATEGORY,
//   _get,
//   (payload) => API_ENDPOINT.GET_CATEGORY + "/" + payload.id
// );

export const updateCategory = createAsyncThunkHandler(
  API_ENDPOINT.UPDATE_CATEGORY,
  _patch,
  (payload) => API_ENDPOINT.UPDATE_CATEGORY + "/" + payload.id,
  true
);

export const deleteCategory = createAsyncThunkHandler(
  API_ENDPOINT.DELETE_CATEGORY,
  _delete,
  (payload) => API_ENDPOINT.DELETE_CATEGORY + "/" + payload.id
);

export const getCategoryProducts = createAsyncThunkHandler(
  API_ENDPOINT.CATEGORY_PRODDUCTS,
  _get,
  (payload) => API_ENDPOINT.CATEGORY_PRODDUCTS.replace(":id", payload.id)
);

// ✅ Initial state
const initialState = {
  categories: [],
  selectedCategory: {},
  categoryProducts: [],
  totalCategories: 0,
  loading: false,
  error: null,
};

// ✅ Slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategorySlice: (state) => {
      state.categories = [];
      state.totalCategories = 0;
      state.selectedCategory = {};
      state.categoryProducts = [];
      state.error = null;
    },
    resetCategories: (state) => {
      state.categories = [];
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    deselectCategory: (state) => {
      state.selectedCategory = {};
      state.categoryProducts = [];
    },
  },
  extraReducers: (builder) => {
    // ✅ Create
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Get All
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data.categories || [];
        state.totalCategories = action.payload.data.total || 0;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Get One
    // builder
    //   .addCase(getCatogory.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getCatogory.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.selectedCategory = action.payload.data || {};
    //   })
    //   .addCase(getCatogory.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });

    // ✅ Update
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload.data._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload.data;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Delete
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.meta.arg.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Get Category Products
    builder
      .addCase(getCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = {
          _id: action.payload.data._id,
          products: action.payload.data.products || [],
        };
        state.categoryProducts = action.payload.data.products || [];
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCategorySlice, deselectCategory, setCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
