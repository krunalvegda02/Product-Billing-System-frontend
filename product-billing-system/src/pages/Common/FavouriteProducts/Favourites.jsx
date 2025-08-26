import React from "react";
import FavouritesView from "./FavouritesView";

const Favourites = () => {
  const sampleProduct = {
    image: "https://via.placeholder.com/150",
    title: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 20 hours battery backup.",
    price: 3000,
    discountPrice: 2499,
    category: "Electronics",
  };


  return (
    <div>
      <FavouritesView product={sampleProduct} />
    </div>
  );
};

export default Favourites;
