// src/hooks/useRazorpay.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyRazorpayPayment, resetPaymentState } from "../redux/Slices/paymentSlice";
import { NAMES } from "../constants/Names";

const useRazorpay = (razorpayOrder, createdOrderId, user) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!razorpayOrder) return;

    const razorpay_secret = import.meta.env.VITE_RAZORPAY_TESTKEY_SECRET;
    const razorpay_key = import.meta.env.VITE_RAZORPAY_TESTKEY_ID;
    console.log("razorpay", razorpay_key);

    const restaurant_name = NAMES.PRIMARY_NAME;

    const options = {
      key: razorpay_key,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
      name: restaurant_name,
      description: `Order ID: ${createdOrderId}`,
      handler: function (response) {
          console.log("Razorpay payment response:", response);
        dispatch(
          verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: createdOrderId,
            method: response.method,
          })
        );
      },
      prefill: {
        name: user?.userData?.name,
        email: user?.userData?.email,
        contact: user?.userData?.phone,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    dispatch(resetPaymentState());
  }, [razorpayOrder, createdOrderId, user, dispatch]);
};

export default useRazorpay;
