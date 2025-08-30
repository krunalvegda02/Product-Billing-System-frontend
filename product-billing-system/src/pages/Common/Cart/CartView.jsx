import React, { useState } from "react";

const CartView = ({ user, orderItems = [], paymentMethods = [], onPaymentChange, onConfirmPayment }) => {
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0] || "");

  const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
    if (onPaymentChange) onPaymentChange(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-8">
      <div className="w-full max-w-2xl p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        {/* Header */}
        <div className="mb-8 text-start">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Order,</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* User Info Card */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              {user?.username?.charAt(0) || "G"}
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">{user?.username || "Guest User"}</h3>
              <p className="text-sm text-gray-600">Complete your purchase</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-700">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{user?.email || "Not provided"}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{user?.contact || "Not provided"}</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            Order Summary
          </h3>
          
          {orderItems.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="mt-2 text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={item.thumbnail || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-blue-500 text-white text-xs font-bold rounded-full">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">₹{item.price} each</p>
                  </div>
                  <div className="font-semibold text-gray-900">
                    ₹{item.quantity * item.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total & Payment */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-700">Total Amount</span>
            <span className="text-2xl font-bold text-blue-600">₹{totalAmount}</span>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Payment Method</label>
            <div className="relative">
              <select
                value={selectedPayment}
                onChange={handlePaymentChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none appearance-none"
              >
                {paymentMethods.map((method, idx) => (
                  <option key={idx} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={() => onConfirmPayment && onConfirmPayment(selectedPayment)}
            disabled={orderItems.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;