import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _get, _post, _delete, _patch } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";

// Thunks
export const fetchAllOrders = createAsyncThunkHandler("order/fetchAllOrders", _get, API_ENDPOINT.ORDER.GET_ALL_ORDER);

export const createOrder = createAsyncThunkHandler("order/createOrder", _post, API_ENDPOINT.ORDER.CREATE_ORDER);

export const deleteOrder = createAsyncThunkHandler("order/deleteOrder", _delete, (payload) =>
  API_ENDPOINT.ORDER.DELETE_ORDER.replace(":id", payload.id)
);

export const updateOrder = createAsyncThunkHandler("order/updateOrder", _patch, (payload) =>
  API_ENDPOINT.ORDER.UPDATE_ORDER.replace(":id", payload.id)
);

export const getOrderById = createAsyncThunkHandler("order/getOrderById", _get, (payload) =>
  API_ENDPOINT.ORDER.GET_ORDERBY_ID.replace(":id", payload.id)
);

export const updateOrderStatusByStaff = createAsyncThunkHandler("order/updateOrderStatusByStaff", _patch, (payload) =>
  API_ENDPOINT.ORDER.UPDATE_ORDER_STATUS_BY_STAFF.replace(":id", payload.id)
);

export const updateOrderStatusByCustomer = createAsyncThunkHandler("order/updateOrderStatusByCustomer", _patch, (payload) =>
  API_ENDPOINT.ORDER.UPDATE_ORDER_STATUS_BY_CUSTOMER.replace(":id", payload.id)
);

export const cancelOrder = createAsyncThunkHandler("order/cancelOrder", _patch, (payload) =>
  API_ENDPOINT.ORDER.CANCEL_ORDER.replace(":id", payload.id)
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
  name: "tableorder",
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
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data?.orders || [];
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload.data?.order);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((o) => o._id !== action.meta.arg.id);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data?.order;
        if (updatedOrder) {
          state.orders = state.orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Order by ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data?.order || null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status By Staff
      .addCase(updateOrderStatusByStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusByStaff.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data?.order;
        if (updatedOrder) {
          state.orders = state.orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
        }
      })
      .addCase(updateOrderStatusByStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status By Customer
      .addCase(updateOrderStatusByCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data?.order;
        if (updatedOrder) {
          state.orders = state.orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
        }
      })
      .addCase(updateOrderStatusByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data?.order;
        if (updatedOrder) {
          state.orders = state.orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
