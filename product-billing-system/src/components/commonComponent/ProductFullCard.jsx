import React from "react";

const ProductFullCard = ({ product, onUnlike }) => {
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
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex my-4 overflow-hidden">
      {/* Product Image */}
      <div className="w-32 cflex-shrink-0 relative">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover"
        />
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
            {name}
          </h2>

          {/* ✅ Category Section */}
          <div className="flex flex-wrap gap-2 mb-2">
            {categoryOfProduct?.length > 0 ? (
              categoryOfProduct.map((catId, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                >
                  {catId}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-lg">
                No Category
              </span>
            )}
          </div>

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
                  {ActiveDiscount}% OFF
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-lg">₹{price}</span>
            )}
          </div>

          {/* Unlike Button */}
          <div className="flex space-x-2">
            <button
              onClick={() => onUnlike(_id)}
              className="w-9 h-9 flex items-center justify-center border border-gray-300 hover:border-red-400 rounded-lg transition-colors duration-200 bg-gray-50 hover:bg-red-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFullCard;
