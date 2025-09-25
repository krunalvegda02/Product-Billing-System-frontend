import React from "react";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { THEME } from "../../constants/Theme";

const MenuHeader = ({ 
  hotelName = "Roast & Relax", 
  onCartClick, 
  onFavoritesClick, 
  onAvatarClick,
  currentTheme = THEME.GENERAL 
}) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { theme } = useTheme();

  console.log(user, isAuthenticated);

  return (
    <header className={`flex items-center justify-between px-6 py-4 ${theme.BG_HEADER} ${theme.SHADOW} border-b ${theme.BORDER_COLOR}`}>
      {/* Left: Logo or Hotel Name */}
      <div className={`text-2xl font-bold ${theme.TEXT_COLOR}`}>{hotelName}</div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <button 
              onClick={onFavoritesClick} 
              className={`${theme.TEXT_SECONDARY} hover:${theme.ERROR} transition-all duration-200 p-2 rounded-lg hover:${theme.ERROR_BG}`}
              title="Favorites"
            >
              <Heart size={24} />
            </button>

            <button 
              onClick={onCartClick} 
              className={`${theme.TEXT_SECONDARY} hover:${theme.SUCCESS} transition-all duration-200 p-2 rounded-lg hover:${theme.SUCCESS_BG}`}
              title="Cart"
            >
              <ShoppingCart size={24} />
            </button>

            <button
              onClick={onAvatarClick}
              className={`w-9 h-9 rounded-full ${theme.BG_SECONDARY_ACCENT} flex items-center justify-center ${theme.TEXT_COLOR} hover:${theme.BG_ACCENT} transition-all duration-200 shadow-md`}
              title="Profile"
            >
              <User size={20} />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className={`${theme.BUTTON} px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default MenuHeader;