import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { _get, _post, _delete, _patch } from "../../helper/ApiClient";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";

// Thunks
export const fetchAllOrders = createAsyncThunkHandler("order/fetchAllOrders", _get, API_ENDPOINT.ORDER.GET_ALL_ORDER);



export const createOrder = createAsyncThunkHandler("order/createOrder", _post, API_ENDPOINT.ORDER.CREATE_ORDER);




export const deleteOrder = createAsyncThunkHandler("order/deleteOrder", _delete, (payload) =>
  API_ENDPOINT.ORDER.DELETE_ORDER.replace(":id", payload)
);



export const updateOrder = createAsyncThunkHandler("order/updateOrder", _patch, (payload) => ({
  url: API_ENDPOINT.ORDER.UPDATE_ORDER.replace(":id", payload.id),
  data: payload.data,
}));



export const getOrderById = createAsyncThunkHandler("order/getOrderById", _get, (id) => API_ENDPOINT.ORDER.GET_ORDERBY_ID.replace(":id", id));




// ✅ New Thunk for Staff status update
export const updateOrderStatusByStaff = createAsyncThunkHandler("order/updateOrderStatusByStaff", _patch, (payload) => ({
  url: API_ENDPOINT.ORDER.UPDATE_ORDER_STATUS_BY_STAFF.replace(":id", payload.id),
  data: payload.data,
}));




// ✅ New Thunk for Customer status update
export const updateOrderStatusByCustomer = createAsyncThunkHandler("order/updateOrderStatusByCustomer", _patch, (payload) => ({
  url: API_ENDPOINT.ORDER.UPDATE_ORDER_STATUS_BY_CUSTOMER.replace(":id", payload.id),
  data: payload.data,
}));




// ✅ Cancel Order
export const cancelOrder = createAsyncThunkHandler("order/cancelOrder", _patch, (id) => API_ENDPOINT.ORDER.CANCEL_ORDER.replace(":id", id));




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
        state.orders = state.orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
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
      })



      // ✅ Update Order Status By Staff
      .addCase(updateOrderStatusByStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatusByStaff.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data.order;
        state.orders = state.orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
      })
      .addCase(updateOrderStatusByStaff.rejected, (state) => {
        state.loading = false;
      })



      // ✅ Update Order Status By Customer
      .addCase(updateOrderStatusByCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatusByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data.order;
        state.orders = state.orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
      })
      .addCase(updateOrderStatusByCustomer.rejected, (state) => {
        state.loading = false;
      })



      // ✅ Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data; // since your backend returns updated order directly
        state.orders = state.orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Exports
export const { resetCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;

// dispatch(updateOrderStatusByStaff({ id: orderId, data: { status: "Preparing", served_by: "John" } }));

// dispatch(updateOrderStatusByCustomer({ id: orderId, data: { status: "Cancelled" } }));
