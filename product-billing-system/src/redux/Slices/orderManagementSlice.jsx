import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const orderManagementSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItemToOrder: (state, action) => {
      const item = action.payload;
      const existing = state.orderItems.find((i) => i._id === item._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.orderItems.push({ ...item, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += item.price;
    },

    removeItemFromOrder: (state, action) => {
      const item = action.payload;
      const existing = state.orderItems.find((i) => i._id === item._id);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.orderItems = state.orderItems.filter((i) => i._id !== item._id);
        }

        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },

    decreaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.orderItems.find((i) => i._id === itemId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      } else if (item) {
        // remove completely if quantity becomes 0
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
        state.orderItems = state.orderItems.filter((i) => i._id !== itemId);
      }
    },

    clearOrder: (state) => {
      state.orderItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItemToOrder, removeItemFromOrder, decreaseItemQuantity, clearOrder } = orderManagementSlice.actions;

export default orderManagementSlice.reducer;
