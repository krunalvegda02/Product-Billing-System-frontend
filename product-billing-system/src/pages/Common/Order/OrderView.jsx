import { useState } from "react";
import { ShoppingBag, Trash2, CheckCircle, Sparkles, ChevronRight, X } from "lucide-react";
import FeedBackModal from "../../../components/helperComponent/FeedBackModal";

const OrderView = ({ orderItems = [], placeOrder, clearOrderItems, totalAmount }) => {
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50/30 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Your Order</h3>
          {orderItems.length > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
              {orderItems.length} {orderItems.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>
        {orderItems.length > 0 && (
          <button 
            onClick={clearOrderItems}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
            title="Clear order"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Order Items */}
      <div className="py-4 max-h-80 overflow-y-auto">
        {orderItems.length === 0 ? (
          <div className="text-center py-6">
            <div className="mx-auto w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="text-blue-400" size={22} />
            </div>
            <p className="text-gray-500 font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">Add delicious items to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors duration-200 group"
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={item.thumbnail} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded-lg shadow-sm" 
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold rounded-full shadow-sm">
                    {item.quantity}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600">₹{item.price} × {item.quantity}</span>
                    <span className="font-semibold text-blue-600">₹{item.quantity * item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {orderItems.length > 0 && (
        <>
          {/* Summary */}
          <div className="pt-3 border-t border-gray-200/60 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">₹{totalAmount}</span>
            </div>
            
            {/* <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Delivery Fee</span>
              <span className="text-sm text-gray-600">{totalAmount > 300 ? 'Free' : '₹40'}</span>
            </div> */}
            
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold text-gray-800">Total Amount</span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ₹{totalAmount + (totalAmount > 300 ? 0 : 40)}
              </span>
            </div>

            {totalAmount < 300 && (
              <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200/50">
                <p className="text-xs text-amber-700 text-center">
                  Add ₹{300 - totalAmount} more for free delivery!
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 pt-3 border-t border-gray-200/60">
            <button
              onClick={placeOrder}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} />
              Place Order
              <ChevronRight size={16} />
            </button>

            <div className="mt-3 text-center">
              <button 
                onClick={() => setFeedbackModalOpen(true)} 
                className="text-xs text-blue-500 hover:text-blue-700 transition-colors duration-200 inline-flex items-center gap-1"
              >
                <Sparkles size={12} />
                Share Feedback
              </button>
            </div>
          </div>
        </>
      )}

      <FeedBackModal isOpen={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
    </div>
  );
};

export default OrderView;