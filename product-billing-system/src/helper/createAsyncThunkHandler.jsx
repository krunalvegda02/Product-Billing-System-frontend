import { createAsyncThunk } from "@reduxjs/toolkit";
import { _get, _post, _patch, _delete } from "./ApiClient";

export const createAsyncThunkHandler = (typePrefix, apiMethod, urlResolver, isMultipart = false) =>
  createAsyncThunk(typePrefix, async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("ProductToken");
      const url = typeof urlResolver === "function" ? urlResolver(payload) : urlResolver;
      const response = await apiMethod(
        url,
        payload || {},
        isMultipart
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          : {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  });

/*
  export const fetchItems = createAsyncThunkHandler(
    "items/fetchAll", // Type prefix
    _get,             // API method
    "/items"          // Static endpoint or resolver function
  );

  export const createItem = createAsyncThunkHandler(
    "items/create",
    _post,
    "/items"
  );
  
  export const updateItem = createAsyncThunkHandler(
    "items/update",
    _patch,
    (payload) => `/items/${payload.data.id}` // Dynamic endpoint based on payload
  );
  export const deleteItem = createAsyncThunkHandler(
    "items/delete",
    _delete,
    (payload) => `/items/${payload.data.id}`
  );

  builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.data.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.data.id);
      });
    
  */
