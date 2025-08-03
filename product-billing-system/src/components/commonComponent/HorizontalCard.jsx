import React from 'react';

const HorizontalCard = ({ product }) => {
  const {
    image,
    title,
    description,
    price,
    inStock,
  } = product;

  return (
    <div className="flex max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Left: Product Image */}
      <div className="w-1/3">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Product Info */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <p className="text-lg font-bold text-gray-900">₹{price}</p>
        </div>
        
        {/* Stock Status */}
        <div
          className={`mt-4 px-3 py-1 rounded-md text-white text-sm font-medium w-fit ${
            inStock ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
