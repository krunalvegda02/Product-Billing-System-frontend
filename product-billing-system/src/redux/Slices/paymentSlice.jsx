import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler.jsx";
import { _post } from "../../helper/ApiClient.jsx";

// Create Razorpay order thunk
export const createRazorpayOrder = createAsyncThunkHandler(
  "payment/createOrder", 
  _post, 
  "/payments/create" 
);

// Verify Razorpay payment thunk
export const verifyRazorpayPayment = createAsyncThunkHandler(
  "payment/verifyPayment", 
  _post, 
  "/payments/verify" 
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    razorpayOrder: null,
    paymentStatus: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.razorpayOrder = null;
      state.paymentStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayOrder = action.payload.data;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyRazorpayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRazorpayPayment.fulfilled, (state) => {
        state.loading = false;
        state.paymentStatus = "success";
      })
      .addCase(verifyRazorpayPayment.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
