import React, { useState } from "react";
import { CreditCard, Wallet, ShoppingBag, User, Mail, Phone, ArrowRight, CheckCircle, Package, ShieldCheck, BadgeCheck, MapPin } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const CartView = ({ user, orderItems = [], paymentMethods = [], onPaymentChange, onConfirmPayment, paymentCompleted = false }) => {
  const { theme } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0] || "");

  const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = totalAmount;

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
    if (onPaymentChange) onPaymentChange(e.target.value);
  };

  // Payment method icons
  const getPaymentIcon = (method) => {
    if (method.includes("Credit")) return <CreditCard size={18} />;
    if (method.includes("Debit")) return <CreditCard size={18} />;
    if (method.includes("PayPal")) return "PP";
    if (method.includes("Google")) return "G";
    if (method.includes("Apple")) return "A";
    if (method.includes("UPI")) return "UPI";
    return <Wallet size={18} />;
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${theme.BACKGROUND_GRADIENT}`}>
      <div className={`w-full max-w-4xl p-8 rounded-3xl shadow-2xl border ${theme.MODAL_BG}`}>
        {/* Header */}
        <div className="mb-8 text-center">
          <div className={`inline-flex items-center justify-center p-3 rounded-2xl shadow-lg mb-4 ${theme.BG_ACCENT}`}>
            {paymentCompleted ? <BadgeCheck size={32} className="text-white" /> : <ShoppingBag size={32} className="text-white" />}
          </div>
          <h2 className={`text-4xl font-bold ${theme.TITLE_TEXT}`}>{paymentCompleted ? "Order Confirmed!" : "Complete Your Order"}</h2>
          <p className={`mt-2 ${theme.TEXT_SECONDARY}`}>
            {paymentCompleted ? "Your payment was successful" : "Review your items and payment method"}
          </p>
        </div>

        {paymentCompleted ? (
          /* Payment Confirmed View */
          <div className={`p-8 rounded-2xl border shadow-sm ${theme.SUCCESS_BG} ${theme.CARD_BORDER}`}>
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${theme.BG_ACCENT}`}>
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl font-semibold mb-2 ${theme.TITLE_TEXT}`}>Payment Successful</h3>
              <p className={theme.TEXT_SECONDARY}>Your order has been confirmed and will be processed shortly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className={`p-5 rounded-xl border shadow-sm ${theme.CARD_BG}`}>
                <h4 className={`font-semibold mb-3 flex items-center ${theme.TITLE_TEXT}`}>
                  <User size={18} className={`${theme.ICON_COLOR} mr-2`} />
                  Customer Information
                </h4>
                <p className={theme.TEXT_COLOR}>{user?.username || "Guest User"}</p>
                <p className={`text-sm mt-1 ${theme.TEXT_SECONDARY}`}>{user?.email || "Not provided"}</p>
                <p className={`text-sm ${theme.TEXT_SECONDARY}`}>{user?.contact || "Not provided"}</p>
                {user?.address && <p className={`text-sm ${theme.TEXT_SECONDARY}`}>{user.address}</p>}
              </div>

              <div className={`p-5 rounded-xl border shadow-sm ${theme.CARD_BG}`}>
                <h4 className={`font-semibold mb-3 flex items-center ${theme.TITLE_TEXT}`}>
                  <CreditCard size={18} className={`${theme.ICON_COLOR} mr-2`} />
                  Payment Method
                </h4>
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${theme.BG_SECONDARY_ACCENT}`}>{getPaymentIcon(selectedPayment)}</div>
                  <span className={theme.TEXT_COLOR}>{selectedPayment}</span>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-xl border shadow-sm ${theme.CARD_BG}`}>
              <h4 className={`font-semibold mb-4 flex items-center ${theme.TITLE_TEXT}`}>
                <Package size={18} className={`${theme.ICON_COLOR} mr-2`} />
                Order Summary
              </h4>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className={`flex justify-between items-center py-2 border-b last:border-b-0 ${theme.TABLE_BORDER}`}>
                    <div className="flex items-center">
                      <span className={`mr-2 ${theme.TEXT_SECONDARY}`}>{item.quantity} ×</span>
                      <span className={theme.TEXT_COLOR}>{item.name}</span>
                    </div>
                    <span className={`font-medium ${theme.TEXT_COLOR}`}>₹{item.quantity * item.price}</span>
                  </div>
                ))}

                <div className={`pt-3 border-t ${theme.TABLE_BORDER}`}>
                  <div className={`flex justify-between items-center text-lg font-semibold ${theme.TEXT_COLOR}`}>
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-6 p-4 rounded-xl border ${theme.INFO_BG} ${theme.TABLE_BORDER}`}>
              <div className="flex items-center">
                <ShieldCheck size={20} className={`${theme.ICON_COLOR} mr-2`} />
                <p className={`text-sm ${theme.INFO}`}>Your order is protected by our satisfaction guarantee</p>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Selection View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - User Info & Payment */}
            <div className="space-y-6">
              {/* User Info Card */}
              <div className={`p-6 rounded-2xl border shadow-sm ${theme.CARD_BG}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${theme.TITLE_TEXT}`}>
                  <div className={`p-2 rounded-lg mr-2 ${theme.BG_ACCENT}`}>
                    <User size={18} className="text-white" />
                  </div>
                  Customer Information
                </h3>

                <div className="space-y-3 text-sm">
                  {/* Email */}
                  <div className={`flex items-center p-3 rounded-lg ${theme.TABLE_ROW}`}>
                    <div className={`p-1.5 rounded-full mr-3 ${theme.BG_ACCENT}`}>
                      <Mail size={14} className="text-white" />
                    </div>
                    <span className={`truncate ${theme.TEXT_COLOR}`}>{user?.email || "Not provided"}</span>
                  </div>

                  {/* Contact */}
                  <div className={`flex items-center p-3 rounded-lg ${theme.TABLE_ROW}`}>
                    <div className={`p-1.5 rounded-full mr-3 ${theme.BG_ACCENT}`}>
                      <Phone size={14} className="text-white" />
                    </div>
                    <span className={theme.TEXT_COLOR}>{user?.contact || "Not provided"}</span>
                  </div>

                  {/* Optional Address */}
                  {user?.address && (
                    <div className={`flex items-center p-3 rounded-lg ${theme.TABLE_ROW}`}>
                      <div className={`p-1.5 rounded-full mr-3 ${theme.BG_ACCENT}`}>
                        <MapPin size={14} className="text-white" />
                      </div>
                      <span className={theme.TEXT_COLOR}>{user.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className={`p-6 rounded-2xl border shadow-sm ${theme.CARD_BG}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${theme.TITLE_TEXT}`}>
                  <div className={`p-2 rounded-lg mr-2 ${theme.BG_ACCENT}`}>
                    <CreditCard size={18} className="text-white" />
                  </div>
                  Payment Method
                </h3>

                <div className="space-y-3">
                  {paymentMethods.map((method, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        selectedPayment === method
                          ? `${theme.BG_ACCENT} text-white border-transparent shadow-md`
                          : `${theme.CARD_BG} ${theme.TABLE_BORDER} hover:shadow-sm`
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={selectedPayment === method}
                        onChange={handlePaymentChange}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${selectedPayment === method ? "bg-white/20" : theme.BG_SECONDARY_ACCENT}`}>
                          {getPaymentIcon(method)}
                        </div>
                        <span className={selectedPayment === method ? "text-white" : theme.TEXT_COLOR}>{method}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className={`p-6 rounded-2xl border shadow-sm ${theme.CARD_BG}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${theme.TITLE_TEXT}`}>
                  <div className={`p-2 rounded-lg mr-2 ${theme.BG_ACCENT}`}>
                    <ShoppingBag size={18} className="text-white" />
                  </div>
                  Order Summary
                </h3>

                {orderItems.length === 0 ? (
                  <div className={`text-center py-8 rounded-xl border border-dashed ${theme.TABLE_BORDER}`}>
                    <div className={`inline-flex items-center justify-center p-3 rounded-full mb-3 ${theme.BG_SECONDARY_ACCENT}`}>
                      <ShoppingBag size={24} className="text-white" />
                    </div>
                    <p className={theme.TEXT_SECONDARY}>Your cart is empty</p>
                    <p className={`text-sm mt-1 ${theme.TEXT_SECONDARY}`}>Add items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[332px] overflow-y-auto pr-2">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 group ${theme.CARD_BG} ${theme.CARD_HOVER}`}
                      >
                        <div className="relative">
                          <img
                            src={item.thumbnail || "https://via.placeholder.com/60"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-xl border shadow-sm group-hover:scale-105 transition-transform duration-300"
                          />
                          <div
                            className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-white text-xs font-bold rounded-full shadow-md ${theme.BG_ACCENT}`}
                          >
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${theme.TEXT_COLOR}`}>{item.name}</p>
                          <p className={`text-sm ${theme.TEXT_SECONDARY}`}>
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className={`font-semibold ${theme.TEXT_COLOR}`}>₹{item.quantity * item.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total & Confirm */}
              {orderItems.length > 0 && (
                <div className={`p-6 rounded-2xl border shadow-sm ${theme.CARD_BG}`}>
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-center">
                      <span className={theme.TEXT_COLOR}>Subtotal</span>
                      <span className={`font-medium ${theme.TEXT_COLOR}`}>₹{totalAmount}</span>
                    </div>

                    <div className={`h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2`}></div>

                    <div className="flex justify-between items-center">
                      <span className={`text-lg font-semibold ${theme.TEXT_COLOR}`}>Total</span>
                      <span className={`text-xl font-bold ${theme.TEXT_COLOR}`}>₹{finalTotal}</span>
                    </div>
                  </div>

                  {totalAmount < 500 && (
                    <div className={`mb-4 p-3 rounded-lg border ${theme.WARNING_BG} ${theme.TABLE_BORDER}`}>
                      <p className={`text-sm text-center ${theme.WARNING}`}>Add ₹{500 - totalAmount} more for free delivery!</p>
                    </div>
                  )}

                  <button
                    onClick={() => onConfirmPayment && onConfirmPayment(selectedPayment)}
                    disabled={orderItems.length === 0}
                    className={`w-full text-lg font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${theme.BUTTON}`}
                  >
                    <CheckCircle size={20} />
                    Confirm & Pay
                    <ArrowRight size={18} />
                  </button>

                  <div className={`mt-4 flex items-center justify-center text-sm ${theme.TEXT_SECONDARY}`}>
                    <ShieldCheck size={16} className={`mr-1 ${theme.ICON_COLOR}`} />
                    Secure payment encrypted
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
