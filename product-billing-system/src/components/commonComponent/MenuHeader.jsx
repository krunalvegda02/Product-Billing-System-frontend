import React from "react";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// ! This component is for top header for customer/ user ,
//  including login, favorites, cart, and profile avatar.





const MenuHeader = ({ hotelName = "My Hotel", onCartClick, onFavoritesClick, onAvatarClick }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user, isAuthenticated);

  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b">
      {/* Left: Logo or Hotel Name */}
      <div className="text-2xl font-bold text-green-700">{hotelName}</div>

      {/* Right: */}
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <button onClick={onFavoritesClick} className="text-gray-600 hover:text-red-500 transition" title="Favorites">
              <Heart size={24} />
            </button>

            <button onClick={onCartClick} className="text-gray-600 hover:text-green-500 transition" title="Cart">
              <ShoppingCart size={24} />
            </button>

            <button
              onClick={onAvatarClick}
              className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition"
              title="Profile"
            >
              <User size={20} />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-gradient-to-l from-green-600 to-green-400 text-white rounded-lg hover:from-green-700 hover:to-green-500 transition font-medium shadow-md"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default MenuHeader;
