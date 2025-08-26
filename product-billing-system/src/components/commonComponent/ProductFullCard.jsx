import React from "react";

const ProductFullCard = ({ product }) => {
  const { image, title, description, price, discountPrice, category } = product;

  const isDiscountAvailable = discountPrice && discountPrice < price;

  return (
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex my-4 overflow-hidden">
      {/* Product Image */}
      <div className="w-32 h-32 flex-shrink-0 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
            {category || "General"}
          </span>
        </div>
        {isDiscountAvailable && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-md shadow-sm">
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-snug">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Price Section */}
          <div className="flex items-center">
            {isDiscountAvailable ? (
              <>
                <span className="text-gray-400 line-through text-sm mr-2">
                  ₹{price}
                </span>
                <span className="text-green-600 font-bold text-lg">
                  ₹{discountPrice}
                </span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-lg">
                  {Math.round((1 - discountPrice / price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-lg">
                ₹{price}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-medium py-1.5 px-4 rounded-lg shadow-sm transition-all duration-200">
              Add to Cart
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200 bg-gray-50 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFullCard;
