import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToOrder, decreaseItemQuantity } from "../../redux/Slices/orderManagementSlice";
import { toggleProductLiked } from "../../redux/Slices/productSlice";
import { Heart, Plus, Minus, ShoppingCart, Star } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import LoginPromptModal from "../helperComponent/LoginPromptModal";

const ProductCard = ({ product = {} }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

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
    return <div className="p-4 border rounded-lg bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200 shadow-sm">Invalid Product Data</div>;
  }

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={imageError ? "https://via.placeholder.com/300x200?text=No+Image" : product.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={product.name}
            className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse h-48"></div>
          )}
          
          {/* Favorite Button */}
          <button
            onClick={handleLikeToggle}
            className="absolute top-3 right-3 p-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full text-white hover:from-pink-500 hover:to-red-600 transition-all duration-300 hover:scale-110 shadow-md"
          >
            <Heart
              size={18}
              fill={liked ? "white" : "transparent"}
              stroke="white"
            />
          </button>
          
          {/* Rating Badge */}
          {product.rating && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
          
          {product.description && (
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-green-600 font-bold text-xl bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">₹{product.price}</p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-gray-400 text-sm line-through">₹{product.originalPrice}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={decrement}
                className={`p-2 rounded-full transition-all duration-300 shadow-sm ${
                  quantity === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 hover:from-blue-200 hover:to-indigo-200 hover:shadow-md"
                }`}
                disabled={quantity === 0}
              >
                <Minus size={16} />
              </button>
              
              <span className="text-lg font-semibold text-gray-700 min-w-[24px] text-center">
                {quantity > 0 ? quantity : <ShoppingCart size={16} className="text-gray-400 mx-auto" />}
              </span>
              
              <button
                onClick={increment}
                className="p-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:from-green-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
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