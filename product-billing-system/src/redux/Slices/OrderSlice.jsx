import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _get, _post, _delete, _patch } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";

// Thunks
export const fetchAllOrders = createAsyncThunkHandler(
  "order/fetchAllOrders",
  _get,
  API_ENDPOINT.ORDER.GET_ALL_ORDER
);

export const createOrder = createAsyncThunkHandler(
  "order/createOrder",
  _post,
  API_ENDPOINT.ORDER.CREATE_ORDER
);

export const deleteOrder = createAsyncThunkHandler(
  "order/deleteOrder",
  _delete,
  (payload) => API_ENDPOINT.ORDER.DELETE_ORDER.replace(":id", payload)
);

export const updateOrder = createAsyncThunkHandler(
  "order/updateOrder",
  _patch,
  (payload) => ({
    url: API_ENDPOINT.ORDER.UPDATE_ORDER.replace(":id", payload.id),
    data: payload.data,
  })
);

export const getOrderById = createAsyncThunkHandler(
  "order/getOrderById",
  _get,
  (id) => API_ENDPOINT.ORDER.GET_ORDERBY_ID.replace(":id", id)
);

// Initial State
const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
    
    // Fetch All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data.orders || [];
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.loading = false;
      })



      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload.data.order);
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      })



      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.orders = state.orders.filter((o) => o._id !== deletedId);
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.loading = false;
      })



      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data.order;
        state.orders = state.orders.map((o) =>
          o._id === updatedOrder._id ? updatedOrder : o
        );
      })
      .addCase(updateOrder.rejected, (state) => {
        state.loading = false;
      })



      // Get Order by ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data.order;
      })
      .addCase(getOrderById.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Exports
export const { resetCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
