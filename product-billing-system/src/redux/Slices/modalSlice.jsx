// redux/Slices/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderConfirmOpen: false,
  feedbackOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openOrderConfirm: (state) => {
      state.orderConfirmOpen = true;
    },
    closeOrderConfirm: (state) => {
      state.orderConfirmOpen = false;
    },
    openFeedback: (state) => {
      state.feedbackOpen = true;
    },
    closeFeedback: (state) => {
      state.feedbackOpen = false;
    },
  },
});

export const {
  openOrderConfirm,
  closeOrderConfirm,
  openFeedback,
  closeFeedback,
} = modalSlice.actions;

export default modalSlice.reducer;
