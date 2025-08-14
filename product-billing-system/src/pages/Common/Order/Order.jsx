import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../../redux/Slices/OrderSlice";
import { clearOrder } from "../../../redux/Slices/orderManagementSlice";
import CustomModal from "../../../components/helperComponent/customModal";
import useModal from "../../../hooks/useModel";
import OrderView from "./OrderView";

const Order = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = React.useState("cash");
  const [referralCode, setReferralCode] = React.useState("");

  const order = useSelector((state) => state.order);
  const orderItems = order?.orderItems || [];

  const handleCreateOrderModel = () => {
    openModal();
  };

  const handleFinalOrderSubmit = () => {
    const orderPayload = {
      customerName: "Krunal", // Optional: replace with input field later
      paymentMethod,
      referralCode: referralCode?.trim() || null,
      items: orderItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      total: order.totalPrice || 0,
      status: "PENDING",
    };

    dispatch(createOrder(orderPayload));
    closeModal();
    dispatch(clearOrder());
  };

  const handleResetOrderItems = () => {
    dispatch(clearOrder());
  };

  return (
    <>
      <OrderView
        orderItems={orderItems}
        placeOrder={handleCreateOrderModel}
        clearOrderItems={handleResetOrderItems}
      />

      <CustomModal
        isOpen={isOpen}
        onCancel={closeModal}
        onSubmit={handleFinalOrderSubmit}
        title="Confirm Order"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Payment Method</label>
            <select
              className="w-full p-2 border rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
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
}

export default Order;