import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, cancelOrder, updateOrderStatusByCustomer } from "../../../redux/Slices/OrderSlice";
import OrderView from "./OrderView";
import { PATHS } from "../../../constants/RouteNames";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { COMMON } from "../../../constants/Common";
import { createRazorpayOrder, verifyRazorpayPayment, resetPaymentState } from "../../../redux/Slices/paymentSlice";
import { clearOrder } from "../../../redux/Slices/orderManagementSlice";
import useRazorpay from "../../../hooks/useRazorpay";
import { openFeedback, openOrderConfirm } from "../../../redux/Slices/modalSlice"; // ✅ use Redux modal

const Order = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const paymentState = useSelector((state) => state.payment);
  const { razorpayOrder } = paymentState;

  const orderState = useSelector((state) => state.order);
  const orderItems = orderState?.orderItems || [];

  const user = useSelector((state) => state.auth);

  const [createdOrderId, setCreatedOrderId] = useState(null);

  // Razorpay integration hook
  useRazorpay(paymentState.razorpayOrder, createdOrderId, user);

  // ✅ Open modal via Redux
  const handleCreateOrderModel = () => {
    if (!orderItems.length) {
      showToast("No items in order", "error");
      return;
    }
    if (!user.isAuthenticated) {
      navigate(PATHS.LOGIN);
      showToast("Please log in to place an order", "error");
      return;
    }
    dispatch(openOrderConfirm());
  };

  // Clear order
  const clearOrderItems = () => {
    dispatch(clearOrder());
  };

  // Cancel Order
  const handleCancelOrder = () => {
    if (!createdOrderId) {
      alert("No order found to cancel");
      return;
    }
    dispatch(cancelOrder(createdOrderId));
  };

  // Update Order by Customer
  const handleUpdateOrder = () => {
    if (!createdOrderId) {
      alert("No order found to update");
      return;
    }

    const updatedPayload = {
      items: orderItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      total: orderState.totalPrice || 0,
    };

    dispatch(updateOrderStatusByCustomer({ id: createdOrderId, data: updatedPayload }));
  };

  const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <OrderView
        orderItems={orderItems}
        placeOrder={handleCreateOrderModel} // ✅ opens modal from Menu
        totalAmount={totalAmount}
        clearOrderItems={clearOrderItems}
        openFeedback={() => dispatch(openFeedback())}
      />

      {/* If needed, you can keep update/cancel buttons here */}
      {/* {createdOrderId && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleCancelOrder}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel Order
          </button>
          <button
            onClick={handleUpdateOrder}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Update Order
          </button>
        </div>
      )} */}
    </>
  );
};

export default Order;
