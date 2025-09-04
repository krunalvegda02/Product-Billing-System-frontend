import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { buildUrlWithParams } from "../../helper/helperFunction";
import { _get } from "../ApiClient";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";

// Thunks
export const fetchBillingData = createAsyncThunkHandler(
  API_ENDPOINT.GET_BILLING_DATA,
  _get,
  (params) => buildUrlWithParams(API_ENDPOINT.GET_BILLING_DATA, params) // ✅ using url builder
);

export const fetchInvoiceDetails = createAsyncThunkHandler("billing/fetchInvoiceDetails", _get, ({ orderId }) =>
  API_ENDPOINT.GET_INVOICE_DETAILS(orderId)
);

export const fetchBillingSummary = createAsyncThunkHandler("billing/fetchBillingSummary", _get, API_ENDPOINT.GET_BILLING_SUMMARY);

// Slice
const billingSlice = createSlice({
  name: "billing",
  initialState: {
    bills: [],
    invoiceDetails: null,
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBillingState: (state) => {
      state.bills = [];
      state.invoiceDetails = null;
      state.summary = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Billing Data
      .addCase(fetchBillingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillingData.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload.data; 
      })
      .addCase(fetchBillingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Invoice Details
      .addCase(fetchInvoiceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceDetails = action.payload.data;
      })
      .addCase(fetchInvoiceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Billing Summary
      .addCase(fetchBillingSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillingSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.data;
      })
      .addCase(fetchBillingSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBillingState } = billingSlice.actions;
export default billingSlice.reducer;
