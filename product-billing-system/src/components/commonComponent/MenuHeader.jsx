import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { PATHS } from "../../constants/RouteNames";

const MenuHeader = ({
  hotelName = "Orly's Cafe",
  onCartClick,
  onFavoritesClick,
}) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    console.log("Logout clicked");
    // dispatch(logoutAction()) if you have one
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 ${theme.BG_HEADER} ${theme.SHADOW} border-b ${theme.BORDER_COLOR}`}
    >
      {/* Left: Logo or Hotel Name */}
      <div className={`text-2xl font-bold ${theme.TEXT_COLOR}`}>
        {hotelName}
      </div>

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

            {/* Avatar with dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`w-9 h-9 rounded-full ${theme.BG_SECONDARY_ACCENT} flex items-center justify-center ${theme.TEXT_COLOR} hover:${theme.BG_ACCENT} transition-all duration-200 shadow-md`}
                title="Profile"
              >
                <User size={20} />
              </button>

              {menuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg border ${theme.BG_ACCENT} bg-white dark:bg-gray-800 z-50`}
                >
                  <ul className="flex flex-col py-2">
                    <li>
                      <button
                        onClick={() => {
                          navigate(PATHS.CUST_PROFILE);
                          setMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          toggleTheme();
                          setMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Change Theme
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
