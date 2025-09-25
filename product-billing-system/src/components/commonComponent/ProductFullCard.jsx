import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { THEME } from "../../constants/Theme";

const ProductFullCard = ({ product, onUnlike, currentTheme = THEME.GENERAL }) => {
  const { theme } = useTheme();
  
  const {
    thumbnail,
    name,
    description,
    price,
    isDiscountActive,
    ActiveDiscount,
    categoryOfProduct,
    _id,
  } = product;

  const isDiscountAvailable = isDiscountActive && ActiveDiscount > 0;
  const discountPrice = isDiscountAvailable
    ? Math.round(price - (price * ActiveDiscount) / 100)
    : null;

  return (
    <div className={`w-full ${theme.CARD_BG} rounded-3xl ${theme.SHADOW} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border ${theme.CARD_HOVER} flex my-6 overflow-hidden group`}>
      
      {/* Product Image with Gradient Overlay */}
      <div className="w-40 flex-shrink-0 relative overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* Discount Badge */}
        {isDiscountAvailable && (
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1.5 ${theme.BG_ACCENT} text-white text-xs font-bold rounded-full shadow-lg`}>
              {ActiveDiscount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          {/* Title */}
          <h2 className={`text-xl font-bold ${theme.TEXT_COLOR} mb-2 line-clamp-1 group-hover:${theme.TEXT_COLOR} transition-colors duration-300`}>
            {name}
          </h2>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categoryOfProduct?.length > 0 ? (
              categoryOfProduct.map((catId, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 ${theme.BADGE_SECONDARY || theme.BG_SECONDARY_ACCENT + ' bg-opacity-10'} ${theme.TEXT_SECONDARY} text-xs font-medium rounded-full border ${theme.BORDER_COLOR} border-opacity-20`}
                >
                  {catId}
                </span>
              ))
            ) : (
              <span className={`px-3 py-1 ${theme.BG_SECONDARY_ACCENT + ' bg-opacity-10'} ${theme.TEXT_SECONDARY} text-xs font-medium rounded-full`}>
                No Category
              </span>
            )}
          </div>

          {/* Description */}
          <p className={`text-sm ${theme.TEXT_SECONDARY} line-clamp-2 mb-4 leading-relaxed`}>
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-opacity-20 border-gray-300">
          {/* Price Section */}
          <div className="flex items-center space-x-3">
            {isDiscountAvailable ? (
              <>
                <span className={`text-lg line-through ${theme.TEXT_SECONDARY} opacity-70`}>
                  ₹{price}
                </span>
                <span className={`text-2xl font-bold ${theme.SUCCESS}`}>
                  ₹{discountPrice}
                </span>
              </>
            ) : (
              <span className={`text-2xl font-bold ${theme.TEXT_COLOR}`}>₹{price}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Unlike Button */}
            <button
              onClick={() => onUnlike(_id)}
              className={`p-3 rounded-2xl ${theme.ERROR_BG} ${theme.ERROR} hover:${theme.BG_ACCENT} hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg group/unlike`}
              title="Remove from favorites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover/unlike:scale-125"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            </button>

            {/* Add to Cart Button */}
            <button
              className={`px-6 py-3 ${theme.BUTTON} rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className={`absolute inset-0 rounded-3xl border-2 ${theme.BORDER_COLOR} opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  );
};

export default ProductFullCard;