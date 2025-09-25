import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext"; 
import { ShoppingBag, Trash2, CheckCircle, Sparkles, ChevronRight, X } from "lucide-react";

const OrderView = ({ orderItems = [], placeOrder, clearOrderItems, totalAmount, openFeedback }) => {
  const { theme } = useTheme();
  const themeStyles = theme?.styles || {};

  return (
    <div className={`w-full rounded-lg ${themeStyles.BACKGROUND_GRADIENT}`}>
      {/* Header */}
      <div className={`flex items-center justify-between pb-3 border-b ${themeStyles.TABLE_BORDER}`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${themeStyles.BG_ACCENT}`}>
            <ShoppingBag size={20} className="text-white" />
          </div>
          <h3 className={`text-lg font-semibold ${themeStyles.TITLE_TEXT}`}>Your Order</h3>
          {orderItems.length > 0 && (
            <span className={`${themeStyles.BADGE} ${themeStyles.BG_ACCENT}`}>
              {orderItems.length} {orderItems.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>
        {orderItems.length > 0 && (
          <button
            onClick={clearOrderItems}
            className={`p-1.5 ${themeStyles.TEXT_SECONDARY} hover:${themeStyles.ERROR} hover:${themeStyles.ERROR_BG} rounded-full transition-colors duration-200`}
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
            <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-3 ${themeStyles.BG_SECONDARY_ACCENT}`}>
              <ShoppingBag className="text-white" size={22} />
            </div>
            <p className={`${themeStyles.TEXT_SECONDARY} font-medium`}>Your cart is empty</p>
            <p className={`text-sm mt-1 ${themeStyles.TEXT_SECONDARY}`}>Add delicious items to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 group ${themeStyles.TABLE_ROW_HOVER}`}
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={item.thumbnail} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded-lg shadow-sm" 
                  />
                  <div className={`absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-white text-xs font-bold rounded-full shadow-sm ${themeStyles.BG_ACCENT}`}>
                    {item.quantity}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${themeStyles.TEXT_COLOR}`}>{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-sm ${themeStyles.TEXT_SECONDARY}`}>
                      ₹{item.price} × {item.quantity}
                    </span>
                    <span className={`font-semibold ${themeStyles.LINK}`}>₹{item.quantity * item.price}</span>
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
          <div className={`pt-3 border-t space-y-2 ${themeStyles.TABLE_BORDER}`}>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${themeStyles.TEXT_SECONDARY}`}>Subtotal</span>
              <span className={`font-medium ${themeStyles.TEXT_COLOR}`}>₹{totalAmount}</span>
            </div>

            {/* Delivery Fee (commented out but themed) */}
            {/* <div className="flex justify-between items-center">
              <span className={`text-sm ${themeStyles.TEXT_SECONDARY}`}>Delivery Fee</span>
              <span className={`text-sm ${themeStyles.TEXT_SECONDARY}`}>
                {totalAmount > 300 ? 'Free' : '₹40'}
              </span>
            </div> */}

            <div className="flex justify-between items-center pt-2">
              <span className={`font-semibold ${themeStyles.TEXT_COLOR}`}>Total Amount</span>
              <span className={`text-lg font-bold ${themeStyles.TEXT_COLOR}`}>
                ₹{totalAmount + (totalAmount > 300 ? 0 : 40)}
              </span>
            </div>

            {/* Free delivery message (commented out but themed) */}
            {/* {totalAmount < 300 && (
              <div className={`mt-2 p-2 rounded-lg border ${themeStyles.WARNING_BG} ${themeStyles.TABLE_BORDER}`}>
                <p className={`text-xs text-center ${themeStyles.WARNING}`}>
                  Add ₹{300 - totalAmount} more for free delivery!
                </p>
              </div>
            )} */}
          </div>

          {/* Actions */}
          <div className={`mt-4 pt-3 border-t ${themeStyles.TABLE_BORDER}`}>
            <button
              onClick={placeOrder}
              className={`w-full font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2 ${themeStyles.BUTTON}`}
            >
              <CheckCircle size={18} />
              Place Order
              <ChevronRight size={16} />
            </button>

            <div className="mt-3 text-center">
              <button
                onClick={openFeedback}
                className={`text-xs transition-colors duration-200 inline-flex items-center gap-1 ${themeStyles.LINK}`}
              >
                <Sparkles size={12} />
                Share Feedback
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderView;