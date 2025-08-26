import React from "react";
import FavouriteCard from "../../../components/commonComponent/ProductFullCard";

const FavouritesView = ({ product }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Favourites</h1>
      <FavouriteCard product={product} />
    </div>
  );
};

export default FavouritesView;
