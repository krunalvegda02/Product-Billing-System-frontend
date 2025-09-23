import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrders, createOrder } from "../../../redux/Slices/OrderSlice";
import { createRazorpayOrder } from "../../../redux/Slices/paymentSlice";
import CartView from "./CartView";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import { COMMON } from "../../../constants/Common";
import { PATHS } from "../../../constants/RouteNames";

const Cart = () => {
  const showToast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("UPI");
  const [createdOrderId, setCreatedOrderId] = useState(null);

  // Get user and orders from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user);
  const { orderItems, totalPrice } = useSelector((state) => state.order);

  // Fetch latest orders on mount
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Map backend orders to CartView structure
  const mappedOrderItems = orderItems?.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.isDiscountActive ? item.discountedPrice : item.price,
    quantity: item.quantity,
    thumbnail: item.thumbnail,
  }));

  // Handle payment selection
  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
    console.log("Selected payment method:", method);
  };

  // Handle final order submission
  const handleConfirmPayment = async (method) => {
    if (!mappedOrderItems?.length) {
      showToast("No items in order", "error");
      return;
    }

    if (!isAuthenticated) {
      navigate(PATHS.LOGIN);
      showToast("Please log in to place an order", "error");
      return;
    }

    const orderPayload = {
      customer: user._id,
      paymentMethod: method,
      menuItems: mappedOrderItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      total: totalPrice || 0,
      status: COMMON.ORDER_STATUS.PENDING,
    };

    // Create order
    const action = await dispatch(createOrder(orderPayload));

    if (action.error) {
      showToast(action.error.message || "Order creation failed", "error");
      return;
    }

    const newOrderId = action.payload?.data?.savedOrder._id;
    setCreatedOrderId(newOrderId);

    if (!newOrderId) {
      showToast("Unable to get created order ID", "error");
      return;
    }

    const amount = totalPrice || 0;

    if (method !== COMMON.PAYMENT_METHOD.CASH) {
      // Only create Razorpay order for online payments
      await dispatch(createRazorpayOrder({ orderId: newOrderId, amount }));
    } else {
      showToast("Order placed successfully. Please pay cash on delivery.", "success");
    }
  };

  return (
    <CartView
      user={user}
      orderItems={mappedOrderItems}
      paymentMethods={["UPI", "Cash", "Card", "Other"]}
      onPaymentChange={handlePaymentChange}
      onConfirmPayment={handleConfirmPayment}
      paymentCompleted={false} // Change to true if order is completed
    />
  );
};

export default Cart;
