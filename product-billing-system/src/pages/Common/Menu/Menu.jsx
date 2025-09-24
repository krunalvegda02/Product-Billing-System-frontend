import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/Slices/categorySlice";
import { fetchCategoryProducts, getAllProducts } from "../../../redux/Slices/productSlice";
import { useToast } from "../../../context/ToastContext";
import FeedBackModal from "../../../components/helperComponent/FeedBackModal";
import CustomModal from "../../../components/helperComponent/customModal";
import { COMMON } from "../../../constants/Common";
import MenuView from "./MenuView";

import { closeOrderConfirm, closeFeedback } from "../../../redux/Slices/modalSlice";
import { createOrder, resetCurrentOrder } from "../../../redux/Slices/OrderSlice";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState("");

  const dispatch = useDispatch();
  const { showToast } = useToast();

  const order = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const modalState = useSelector((state) => state.modal);
  // console.log(modalState);

  const [paymentMethod, setPaymentMethod] = useState(COMMON.PAYMENT_METHOD.CASH);
  const [referralCode, setReferralCode] = useState("");

  // --- Load Categories ---
  const loadAllCategories = async () => {
    try {
      const res = await dispatch(getAllCategories()).unwrap();
      const allCategories = res.data.categories;
      setCategories(allCategories);
      if (allCategories.length > 0) {
        setSelectedCategoryID(""); // Default to all products
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      showToast("Failed to load categories", "error");
    }
  };

  // --- Load Products ---
  const loadProducts = async () => {
    try {
      if (selectedCategoryID) {
        const res = await dispatch(fetchCategoryProducts({ categoryId: selectedCategoryID })).unwrap();
        setProducts(res.data.products);
      } else {
        const res = await dispatch(getAllProducts()).unwrap();
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      showToast("Failed to load products", "error");
    }
  };

  useEffect(() => {
    loadAllCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategoryID]);

  // --- Final Order Submit ---
  const handleFinalOrderSubmit = async () => {
    if (!order.orderItems?.length) {
      showToast("No items in order", "error");
      return;
    }

    const payload = {
      customer: user._id,
      paymentMethod,
      referralCode: referralCode.trim() || null,
      menuItems: order.orderItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      total: order.totalPrice || 0,
      status: COMMON.ORDER_STATUS.PENDING,
    };

    const action = await dispatch(createOrder(payload));
    dispatch(closeOrderConfirm());

    if (action.error) {
      showToast(action.error.message || "Order creation failed", "error");
    } else {
      showToast("Order placed successfully!", "success");
      dispatch(clearOrder());
    }
  };

  return (
    <>
      <MenuView categories={categories} products={products} selectedCategoryID={selectedCategoryID} handleCategorySelect={setSelectedCategoryID} />

      {/* Order Confirm Modal */}
      <CustomModal
        isOpen={modalState?.orderConfirmOpen}
        onCancel={() => dispatch(closeOrderConfirm())}
        onSubmit={handleFinalOrderSubmit}
        title="Confirm Order"
      >
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

      {/* Feedback Modal */}
      <FeedBackModal isOpen={modalState?.feedbackOpen} onClose={() => dispatch(closeFeedback())} />
    </>
  );
};

export default Menu;
