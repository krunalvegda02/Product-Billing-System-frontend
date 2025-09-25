import React from "react";
import FavouriteCard from "../../../components/commonComponent/ProductFullCard";

const FavouritesView = ({ product }) => {
  // console.log("product", product);
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-6">My Favourites</h1>
      {product.map((prod) => (
        <FavouriteCard key={prod._id} product={prod} />
      ))}
    </div>
  );
};

export default FavouritesView;
