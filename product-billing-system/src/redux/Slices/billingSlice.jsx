import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunkHandler } from "../../helper/createAsyncThunkHandler";
import { buildUrlWithParams } from "../../helper/helperFunction";
import { _get } from "../../helper/ApiClient";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";

// ✅ Get all billing data (with params like page, limit, search etc.)
export const getBillingData = createAsyncThunkHandler(API_ENDPOINT.GET_BILLING_DATA, _get, (payload) =>
  buildUrlWithParams(API_ENDPOINT.GET_BILLING_DATA, payload)
);

// ✅ Get invoice details (requires orderId)
export const getInvoiceDetails = createAsyncThunkHandler(API_ENDPOINT.GET_INVOICE_DETAILS, _get, (payload) =>
  API_ENDPOINT.GET_INVOICE_DETAILS.replace(":orderId", payload.id)
);

// ✅ Get billing summary (no params required)
export const getBillingSummary = createAsyncThunkHandler(API_ENDPOINT.GET_BILLING_SUMMARY, _get, API_ENDPOINT.GET_BILLING_SUMMARY);


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
      .addCase(getBillingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBillingData.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload.data;
      })
      .addCase(getBillingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Invoice Details
      .addCase(getInvoiceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceDetails = action.payload.data;
      })
      .addCase(getInvoiceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Billing Summary
      .addCase(getBillingSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBillingSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.data;
      })
      .addCase(getBillingSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBillingState } = billingSlice.actions;
export default billingSlice.reducer;
