import React from "react";
import { ShoppingCart, Heart, User } from "lucide-react";

const MenuHeader = ({ hotelName = "My Hotel", onCartClick, onFavoritesClick, onAvatarClick }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b">
      {/* Left: Logo or Hotel Name */}
      <div className="text-2xl font-bold text-green-700">
        {hotelName}
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">
        <button
          onClick={onFavoritesClick}
          className="text-gray-600 hover:text-red-500 transition"
          title="Favorites"
        >
          <Heart size={24} />
        </button>

        <button
          onClick={onCartClick}
          className="text-gray-600 hover:text-green-500 transition"
          title="Cart"
        >
          <ShoppingCart size={24} />
        </button>

        <button
          onClick={onAvatarClick}
          className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition"
          title="Profile"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default MenuHeader;
