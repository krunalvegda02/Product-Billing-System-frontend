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

  const userId = useSelector((state) => state.auth.user?._id);
  const currentTheme = useSelector((state) => state.theme.currentTheme) || THEME.GENERAL;

  // Get theme configuration
  const theme = useTheme();

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
      <div className={`p-4 border rounded-lg bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200 shadow-sm ${theme.FONT_PRIMARY}`}>
        Invalid Product Data
      </div>
    );
  }

  return (
    <>
      <div className={`${theme.CARD_BG} ${theme.CARD_HOVER} rounded-2xl overflow-hidden border group ${theme.FONT_PRIMARY}`}>
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
              className={`absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse h-48 ${currentTheme === THEME.DARK ? "from-gray-700 to-gray-800" : ""}`}
            ></div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleLikeToggle}
            className={`absolute top-3 right-3 p-2 ${theme.BG_ACCENT} rounded-full text-white ${theme.HOVER_SECONDARY_ACCENT} transition-all duration-300 hover:scale-110 ${theme.SHADOW}`}
          >
            <Heart size={18} fill={liked ? "white" : "transparent"} stroke="white" />
          </button>

          {/* Rating Badge */}
          {product.rating && (
            <div
              className={`absolute top-3 left-3 flex items-center gap-1 backdrop-blur-sm px-2 py-1 rounded-full ${currentTheme === THEME.DARK ? "bg-gray-800/90 text-gray-200" : "bg-white/90 text-gray-700"}`}
            >
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5">
          <h3 className={`text-lg font-semibold ${theme.TEXT_COLOR} mb-2 line-clamp-1 group-hover:${theme.LINK} transition-colors`}>
            {product.name}
          </h3>

          {product.description && <p className={`${theme.TEXT_SECONDARY} text-sm mb-3 line-clamp-2`}>{product.description}</p>}

          <div className="flex items-center justify-between mt-4">
            <div>
              <p className={`font-bold text-xl ${theme.LINK}`}>₹{product.price}</p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className={`${theme.TEXT_SECONDARY} text-sm line-through`}>₹{product.originalPrice}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={decrement}
                className={`p-2 rounded-full transition-all duration-300 ${theme.SHADOW} ${
                  quantity === 0
                    ? `${currentTheme === THEME.DARK ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-400"} cursor-not-allowed`
                    : `${theme.BUTTON_SECONDARY} hover:${theme.SHADOW}`
                }`}
                disabled={quantity === 0}
              >
                <Minus size={16} />
              </button>

              <span className={`text-lg font-semibold ${theme.TEXT_COLOR} min-w-[24px] text-center`}>
                {quantity > 0 ? quantity : <ShoppingCart size={16} className={`${theme.ICON_SECONDARY} mx-auto`} />}
              </span>

              <button onClick={increment} className={`p-2 ${theme.BUTTON} rounded-full transition-all duration-300 hover:scale-105`}>
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
