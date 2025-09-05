import React, { useState } from "react";
import {
  CreditCard,
  Wallet,
  ShoppingBag,
  User,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Package,
  Clock,
  MapPin,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const CartView = ({ user, orderItems = [], paymentMethods = [], onPaymentChange, onConfirmPayment, paymentCompleted = false }) => {
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0] || "");
  // const [deliveryOption, setDeliveryOption] = useState("standard"); // Added delivery option

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="w-full max-w-4xl p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            {paymentCompleted ? <BadgeCheck size={32} className="text-white" /> : <ShoppingBag size={32} className="text-white" />}
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {paymentCompleted ? "Order Confirmed!" : "Complete Your Order"}
          </h2>
          <p className="text-gray-500 mt-2">{paymentCompleted ? "Your payment was successful" : "Review your items and payment method"}</p>
        </div>

        {paymentCompleted ? (
          /* Payment Confirmed View */
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl border border-green-200/50 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mb-4">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful</h3>
              <p className="text-gray-600">Your order has been confirmed and will be processed shortly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <User size={18} className="text-blue-500 mr-2" />
                  Customer Information
                </h4>
                <p className="text-gray-800">{user?.username || "Guest User"}</p>
                <p className="text-gray-600 text-sm mt-1">{user?.email || "Not provided"}</p>
                <p className="text-gray-600 text-sm">{user?.contact || "Not provided"}</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <CreditCard size={18} className="text-purple-500 mr-2" />
                  Payment Method
                </h4>
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg mr-3">{getPaymentIcon(selectedPayment)}</div>
                  <span className="text-gray-800">{selectedPayment}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                <Package size={18} className="text-amber-500 mr-2" />
                Order Summary
              </h4>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">{item.quantity} ×</span>
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-gray-800 font-medium">₹{item.quantity * item.price}</span>
                  </div>
                ))}

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center">
                <ShieldCheck size={20} className="text-blue-500 mr-2" />
                <p className="text-blue-700 text-sm">Your order is protected by our satisfaction guarantee</p>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Selection View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - User Info & Payment */}
            <div className="space-y-6">
              {/* User Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100/50 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg mr-2">
                    <User size={18} className="text-white" />
                  </div>
                  Customer Information
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-700 p-3 bg-white/70 rounded-lg">
                    <div className="p-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-3">
                      <Mail size={14} className="text-white" />
                    </div>
                    <span className="truncate">{user?.email || "Not provided"}</span>
                  </div>
                  <div className="flex items-center text-gray-700 p-3 bg-white/70 rounded-lg">
                    <div className="p-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3">
                      <Phone size={14} className="text-white" />
                    </div>
                    <span>{user?.contact || "Not provided"}</span>
                  </div>
                  <div className="flex items-center text-gray-700 p-3 bg-white/70 rounded-lg">
                    <div className="p-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3">
                      <Phone size={14} className="text-white" />
                    </div>
                    <span>{user?.contact || "Not provided"}</span>
                  </div>
                  <div className="flex items-center text-gray-700 p-3 bg-white/70 rounded-lg">
                    <div className="p-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3">
                      <Phone size={14} className="text-white" />
                    </div>
                    <span>{user?.contact || "Not provided"}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100/50 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-2">
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
                          ? "bg-white border-purple-300 shadow-md"
                          : "bg-white/70 border-gray-200 hover:bg-white hover:shadow-sm"
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
                        <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mr-3">{getPaymentIcon(method)}</div>
                        <span className="text-gray-700">{method}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100/50 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg mr-2">
                    <ShoppingBag size={18} className="text-white" />
                  </div>
                  Order Summary
                </h3>

                {orderItems.length === 0 ? (
                  <div className="text-center py-8 bg-white/70 rounded-xl border border-dashed border-amber-300">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full mb-3">
                      <ShoppingBag size={24} className="text-amber-600" />
                    </div>
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[332px] overflow-y-auto pr-2">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="relative">
                          <img
                            src={item.thumbnail || "https://via.placeholder.com/60"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-xl border shadow-sm group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-md">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="font-semibold text-blue-600">₹{item.quantity * item.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total & Confirm */}
              {orderItems.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border border-green-100/50 shadow-sm">
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="text-gray-800 font-medium">₹{totalAmount}</span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2"></div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{finalTotal}
                      </span>
                    </div>
                  </div>

                  {totalAmount < 500 && (
                    <div className="mb-4 p-3 bg-amber-100/50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-700 text-center">Add ₹{500 - totalAmount} more for free delivery!</p>
                    </div>
                  )}

                  <button
                    onClick={() => onConfirmPayment && onConfirmPayment(selectedPayment)}
                    disabled={orderItems.length === 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Confirm & Pay
                    <ArrowRight size={18} />
                  </button>

                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <ShieldCheck size={16} className="mr-1 text-blue-500" />
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
