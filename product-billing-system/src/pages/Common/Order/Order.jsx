import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, cancelOrder, updateOrderStatusByCustomer } from "../../../redux/Slices/OrderSlice";
import CustomModal from "../../../components/helperComponent/customModal";
import useModal from "../../../hooks/useModel";
import useRazorpay from "../../../hooks/useRazorpay";
import OrderView from "./OrderView";
import { PATHS } from "../../../constants/RouteNames";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { COMMON } from "../../../constants/Common";
import { createRazorpayOrder, verifyRazorpayPayment, resetPaymentState } from "../../../redux/Slices/paymentSlice";
import { clearOrder } from "../../../redux/Slices/orderManagementSlice";

const Order = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const paymentState = useSelector((state) => state.payment);
  const { loading, error, razorpayOrder, paymentStatus } = paymentState;

  const orderState = useSelector((state) => state.order);
  const orderLoading = orderState.loading;

  const orderItems = orderState?.orderItems || [];

  const user = useSelector((state) => state.auth);
  // console.log(user);

  const [paymentMethod, setPaymentMethod] = useState(COMMON.PAYMENT_METHOD.CASH);
  const [referralCode, setReferralCode] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState(null);

  // // ✅ Safely get createdOrderId
  // let createdOrderId =
  //   orderState?.currentOrder?._id || (Array.isArray(orderState?.orders) && orderState.orders.length > 0 ? orderState.orders[0]?._id : null);

  useRazorpay(paymentState.razorpayOrder, createdOrderId, user);

  // Show modal for order confirmation
  const handleCreateOrderModel = () => {
    openModal();
  };

  // Create order API call
  const handleFinalOrderSubmit = async () => {
    if (!orderItems.length) {
      showToast("No items in order", "error");
      return;
    }

    if (!user.isAuthenticated) {
      navigate(PATHS.LOGIN);
      showToast("Please log in to place an order", "error");
      return;
    }

    const orderPayload = {
      customer: user.userData._id, // later replace with input field
      paymentMethod,
      referralCode: referralCode?.trim() || null,
      menuItems: orderItems.map((item) =>
        // console.log("item", item),
        ({
          productId: item._id,
          quantity: item.quantity,
        })
      ),
      total: orderState.totalPrice || 0,
      status: COMMON.ORDER_STATUS.PENDING,
    };

    const action = await dispatch(createOrder(orderPayload));
    closeModal();

    if (action.error) {
      showToast(action.error.message || "Order creation failed", "error");
      return;
    }

    // console.log(action.payload);

    const newOrderId = action.payload?.data?.savedOrder._id;
    setCreatedOrderId(newOrderId);
    if (!newOrderId) {
      showToast("Unable to get created order ID", "error");
      return;
    }
    console.log("new order id", newOrderId);

    const amount = orderState.totalPrice || 0;

    if (paymentMethod !== COMMON.PAYMENT_METHOD.CASH) {
      // Initiate Razorpay order creation, which will trigger the hook to open checkout modal
      await dispatch(createRazorpayOrder({ orderId: newOrderId, amount }));
    } else {
      showToast("Order placed successfully. Please pay cash on delivery.", "success");
    }
  };

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
      paymentMethod,
      referralCode: referralCode?.trim() || null,
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
      <OrderView orderItems={orderItems} placeOrder={handleCreateOrderModel} totalAmount={totalAmount} clearOrderItems={clearOrderItems} />

      {createdOrderId && (
        <div className="flex gap-2 mt-4">
          <button onClick={handleCancelOrder} className="bg-red-500 text-white px-4 py-2 rounded">
            Cancel Order
          </button>
          <button onClick={handleUpdateOrder} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update Order
          </button>
        </div>
      )}

      <CustomModal isOpen={isOpen} onCancel={closeModal} onSubmit={handleFinalOrderSubmit} title="Confirm Order">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Payment Method</label>
            <select className="w-full p-2 border rounded" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value={COMMON.PAYMENT_METHOD.CASH}>{COMMON.PAYMENT_METHOD.CASH}</option>
              <option value={COMMON.PAYMENT_METHOD.UPI}>{COMMON.PAYMENT_METHOD.UPI}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Referral Code (optional)</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default Order;
