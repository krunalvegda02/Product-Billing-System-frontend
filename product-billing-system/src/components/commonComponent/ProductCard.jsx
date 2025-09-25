import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToOrder, decreaseItemQuantity } from "../../redux/Slices/orderManagementSlice";
import { toggleProductLiked } from "../../redux/Slices/productSlice";
import { Heart, Plus, Minus, ShoppingCart, Star } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import LoginPromptModal from "../helperComponent/LoginPromptModal";
import { useTheme } from "../../context/ThemeContext";

const ProductCard = ({ product = {} }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  
  // Use theme context
  const { theme } = useTheme();
  const themeStyles = theme?.styles || {};

  const userId = useSelector((state) => state.auth.user?._id);

  // Local state
  const [liked, setLiked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const quantity = useSelector((state) => {
    const item = state.order.orderItems.find((i) => i._id === product._id);
    return item ? item.quantity : 0;
  });

  const handleLikeToggle = async () => {
    if (!userId) {
      setShowLoginModal(true);
      return;
    }

    if (!product?._id) return;

    // Optimistic update
    setLiked((prev) => !prev);

    try {
      await dispatch(toggleProductLiked({ id: product._id })).unwrap();
      showToast(liked ? "Removed from favorites" : "Added to favorites", "success");
    } catch (err) {
      setLiked((prev) => !prev);
      showToast(err?.message, "error");
    }
  };

  const increment = () => {
    dispatch(addItemToOrder(product));
    showToast("Added to cart", "success");
  };

  const decrement = () => {
    if (quantity > 0) {
      dispatch(decreaseItemQuantity(product._id));
      showToast("Removed from cart", "info");
    }
  };

  if (!product || !product._id) {
    return (
      <div className={`p-4 border rounded-lg ${themeStyles.ERROR_BG} ${themeStyles.ERROR} border-red-200 shadow-sm ${themeStyles.FONT_PRIMARY}`}>
        Invalid Product Data
      </div>
    );
  }

  return (
    <>
      <div className={`${themeStyles.CARD_BG} ${themeStyles.CARD_HOVER} rounded-2xl overflow-hidden border group ${themeStyles.FONT_PRIMARY}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={
              imageError
                ? "https://via.placeholder.com/300x200?text=No+Image"
                : product.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={product.name}
            className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div
              className={`absolute inset-0 animate-pulse h-48 ${themeStyles.TABLE_ROW}`}
            ></div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleLikeToggle}
            className={`absolute top-3 right-3 p-2 ${themeStyles.BG_ACCENT} rounded-full text-white ${themeStyles.HOVER_SECONDARY_ACCENT} transition-all duration-300 hover:scale-110 ${themeStyles.SHADOW}`}
          >
            <Heart size={18} fill={liked ? "white" : "transparent"} stroke="white" />
          </button>

          {/* Rating Badge */}
          {product.rating && (
            <div
              className={`absolute top-3 left-3 flex items-center gap-1 backdrop-blur-sm px-2 py-1 rounded-full ${themeStyles.CARD_BG} ${themeStyles.TEXT_COLOR}`}
            >
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5">
          <h3 className={`text-lg font-semibold ${themeStyles.TEXT_COLOR} mb-2 line-clamp-1 group-hover:${themeStyles.LINK} transition-colors`}>
            {product.name}
          </h3>

          {product.description && (
            <p className={`${themeStyles.TEXT_SECONDARY} text-sm mb-3 line-clamp-2`}>
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-4">
            <div>
              <p className={`font-bold text-xl ${themeStyles.LINK}`}>
                ₹{product.price}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className={`${themeStyles.TEXT_SECONDARY} text-sm line-through`}>
                  ₹{product.originalPrice}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={decrement}
                className={`p-2 rounded-full transition-all duration-300 ${themeStyles.SHADOW} ${
                  quantity === 0
                    ? `${themeStyles.TABLE_ROW} ${themeStyles.TEXT_SECONDARY} cursor-not-allowed`
                    : `${themeStyles.BUTTON_SECONDARY} hover:${themeStyles.SHADOW}`
                }`}
                disabled={quantity === 0}
              >
                <Minus size={16} />
              </button>

              <span className={`text-lg font-semibold ${themeStyles.TEXT_COLOR} min-w-[24px] text-center`}>
                {quantity > 0 ? quantity : <ShoppingCart size={16} className={`${themeStyles.ICON_SECONDARY} mx-auto`} />}
              </span>

              <button 
                onClick={increment} 
                className={`p-2 ${themeStyles.BUTTON} rounded-full transition-all duration-300 hover:scale-105`}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginPromptModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default ProductCard;