import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/RouteNames";
import { THEME_CONFIG, THEME } from "../../constants/Theme";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";
import { Bell, Search, User, LogOut, Menu, X, Palette, Check, Sun, Moon, Sunset, Droplets, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// Theme Selector Component
const ThemeSelector = ({ currentTheme, setCurrentTheme, onClose }) => {
  const themeStyles = THEME_CONFIG[currentTheme];
  
  const themeIcons = {
    [THEME.LIGHT]: <Sun size={14} />,
    [THEME.DARK]: <Moon size={14} />,
    [THEME.GENERAL]: <Sparkles size={14} />,
    [THEME.SUNSET]: <Sunset size={14} />,
    [THEME.OCEAN]: <Droplets size={14} />,
  };

  const themeDescriptions = {
    [THEME.LIGHT]: "Clean & Professional",
    [THEME.DARK]: "Dark & Cozy", 
    [THEME.GENERAL]: "Warm & Inviting",
    [THEME.SUNSET]: "Vibrant Sunset",
    [THEME.OCEAN]: "Calm Ocean",
  };

  return (
    <div className={`w-64 p-3 ${themeStyles.TEXT_COLOR}`}>
      {/* Header */}
      <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${themeStyles.TABLE_BORDER}`}>
        <Palette size={16} className={themeStyles.ICON_COLOR} />
        <h3 className={`font-semibold ${themeStyles.TEXT_COLOR}`}>Choose Theme</h3>
      </div>
      
      {/* Theme Options */}
      <div className="space-y-2">
        {Object.values(THEME).map((theme) => {
          const themeConfig = THEME_CONFIG[theme];
          const isActive = currentTheme === theme;
          
          return (
            <button
              key={theme}
              onClick={() => {
                setCurrentTheme(theme);
                onClose?.();
              }}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 
                hover:scale-[1.02] hover:shadow-md group
                ${isActive 
                  ? `${themeStyles.BORDER_COLOR} ${themeStyles.BG_SECONDARY_ACCENT} bg-opacity-10 shadow-md` 
                  : `${themeStyles.TABLE_BORDER} hover:${themeStyles.TABLE_BORDER.replace('border-', 'border-')}`
                }
              `}
            >
              {/* Theme Color Preview */}
              <div className="flex-shrink-0">
                <div 
                  className={`w-8 h-8 rounded-lg ${themeConfig.BG_ACCENT} flex items-center justify-center text-white`}
                >
                  {themeIcons[theme]}
                </div>
              </div>
              
              {/* Theme Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${isActive ? themeStyles.ICON_COLOR : themeStyles.TEXT_COLOR}`}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </span>
                  {isActive && <Check size={16} className={themeStyles.ICON_COLOR} />}
                </div>
                <p className={`text-xs ${themeStyles.TEXT_SECONDARY} mt-0.5`}>
                  {themeDescriptions[theme]}
                </p>
              </div>
              
              {/* Color Indicators */}
              <div className="flex gap-1 flex-shrink-0">
                <div className={`w-2 h-2 rounded-full ${themeConfig.BG_ACCENT}`}></div>
                <div className={`w-2 h-2 rounded-full ${themeConfig.BG_SECONDARY_ACCENT}`}></div>
                <div className={`w-2 h-2 rounded-full ${themeConfig.TEXT_COLOR.replace('text-', 'bg-')}`}></div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Current Theme Indicator */}
      <div className={`mt-4 p-2 rounded-lg text-center ${themeStyles.BG_ACCENT} bg-opacity-10 border ${themeStyles.BORDER_COLOR}`}>
        <span className={`text-xs font-medium ${themeStyles.TEXT_COLOR}`}>
          Active: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
        </span>
      </div>
    </div>
  );
};

const Layout = ({ children, role = "ADMIN" }) => {
  const { theme, currentTheme, setCurrentTheme } = useTheme();
  const themeStyles = theme || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const themeRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const logOutHandler = async () => {
    const res = await dispatch(logout());
    if (logout.fulfilled.match(res)) {
      navigate(PATHS.LOGIN);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setShowThemeSelector(false);
      }
      if (window.innerWidth < 768 && sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest(".mobile-menu-button")) {
        setShowMobileSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menus = {
    ADMIN: [
      { path: PATHS.ADMIN_DASHBOARD, label: "Dashboard", icon: "📊" },
      { path: PATHS.CATEGORY_MANAGEMENT, label: "Categories", icon: "🗂️" },
      { path: PATHS.PRODUCT_MANAGEMENT, label: "Menu Items", icon: "🍽️" },
      { path: PATHS.ADD_STAFF, label: "Staff Management", icon: "👥" },
      { path: PATHS.ORDER_MANAGEMENT, label: "Orders", icon: "📦" },
      { path: PATHS.BILLING_MANAGEMENT, label: "Billing", icon: "💰" },
      { path: PATHS.FEEDBACK_MANAGEMENT, label: "Feedback", icon: "💬" },
    ],
    MANAGER: [
      { path: PATHS.CATEGORY_MANAGEMENT, label: "Categories", icon: "🗂️" },
      { path: PATHS.PRODUCT_MANAGEMENT, label: "Menu Items", icon: "🍽️" },
      { path: PATHS.ADD_STAFF, label: "Staff Management", icon: "👥" },
      { path: PATHS.ORDER_MANAGEMENT, label: "Orders", icon: "📦" },
      { path: PATHS.BILLING_MANAGEMENT, label: "Billing", icon: "💰" },
      { path: PATHS.FEEDBACK_MANAGEMENT, label: "Feedback", icon: "💬" },
    ],
    WAITER: [
      { path: PATHS.ORDER_MANAGEMENT, label: "Orders to Serve", icon: "🛎️" },
      { path: PATHS.BILLING_MANAGEMENT, label: "Billing", icon: "💰" },
    ],
  };

  const titleMap = {
    ADMIN: "Admin Panel",
    MANAGER: "Manager Panel", 
    WAITER: "Waiter Panel",
  };

  const toggleMobileSidebar = () => setShowMobileSidebar(!showMobileSidebar);
  const handleMenuItemClick = () => window.innerWidth < 768 && setShowMobileSidebar(false);

  return (
    <div className={`flex min-h-screen ${themeStyles.BACKGROUND_GRADIENT}`}>
      {/* Desktop Sidebar */}
      <aside
        ref={sidebarRef}
        className={`w-56 min-h-screen p-4 ${themeStyles.BG_ASIDE} flex flex-col ${themeStyles.SHADOW} border-r ${themeStyles.BORDER_COLOR} transition-all duration-300 fixed md:relative z-40
          ${showMobileSidebar ? "left-0" : "-left-56"} md:left-0`}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end md:hidden">
          <button
            onClick={() => setShowMobileSidebar(false)}
            className={`rounded-full p-1 ${themeStyles.TEXT_COLOR} ${themeStyles.BG_SECONDARY_ACCENT} bg-opacity-10 hover:bg-opacity-20 transition-colors`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className={`${themeStyles.HEADER_TEXT_SIZE} font-bold ${themeStyles.TEXT_COLOR} text-center ${themeStyles.FONT_PRIMARY}`}>
            {titleMap[role]}
          </h2>
          <div className={`h-0.5 w-12 mx-auto ${themeStyles.BG_ACCENT} rounded-full opacity-80 mt-2`}></div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          {menus[role]?.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleMenuItemClick}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 
                  hover:transform hover:translate-x-0.5 ${themeStyles.FONT_PRIMARY}
                  ${
                    isActive
                      ? `${themeStyles.BG_ACCENT} text-white ${themeStyles.SHADOW} font-medium`
                      : `${themeStyles.TEXT_COLOR} hover:${themeStyles.BG_ACCENT.replace("bg-", "bg-")} hover:bg-opacity-15`
                  }
                  border ${isActive ? "border-transparent" : themeStyles.BORDER_COLOR}
                `}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-sm">{item.label}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </Link>
            );
          })}
        </nav>

        {/* Theme Indicator */}
        <div className={`mt-4 p-2 rounded-md ${themeStyles.BG_ACCENT} bg-opacity-10 text-center border ${themeStyles.BORDER_COLOR}`}>
          <p className={`text-xs ${themeStyles.TEXT_COLOR} ${themeStyles.FONT_PRIMARY}`}>
            Theme: <span className="font-medium capitalize">{currentTheme.toLowerCase()}</span>
          </p>
        </div>

        {/* User Info */}
        <div className={`mt-4 pt-3 border-t ${themeStyles.TABLE_BORDER}`}>
          <div className="text-center">
            <p className={`text-xs font-medium ${themeStyles.TEXT_COLOR} ${themeStyles.FONT_PRIMARY}`}>Cafe Manager</p>
            <p className={`text-xs ${themeStyles.TEXT_SECONDARY} mt-0.5 ${themeStyles.FONT_PRIMARY}`}>Welcome!</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {showMobileSidebar && (
        <div className={`fixed inset-0 ${themeStyles.MODAL_OVERLAY} z-30 md:hidden`} 
             onClick={() => setShowMobileSidebar(false)}></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen w-full md:w-auto">
        {/* Header */}
        <header className={`p-4 flex justify-between items-center ${themeStyles.BG_HEADER} ${themeStyles.SHADOW} shrink-0`}>
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <button className="mobile-menu-button md:hidden" onClick={toggleMobileSidebar}>
              <Menu className={`w-6 h-6 ${themeStyles.TEXT_COLOR}`} />
            </button>
            <h1 className={`${themeStyles.HEADER_TEXT_SIZE} font-semibold ${themeStyles.TEXT_COLOR} ${themeStyles.FONT_PRIMARY}`}>
              {titleMap[role]}
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Role Badge */}
                <div className="flex items-center">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${themeStyles.BG_ACCENT} bg-opacity-20 ${themeStyles.TEXT_COLOR} border ${themeStyles.BORDER_COLOR} ${themeStyles.SHADOW}`}>
                    {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </div>

                {/* Theme Selector Button */}
                <div className="relative" ref={themeRef}>
                  <button
                    onClick={() => setShowThemeSelector(!showThemeSelector)}
                    className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                      showThemeSelector ? themeStyles.BG_ACCENT : themeStyles.TEXT_SECONDARY
                    } hover:${themeStyles.BG_SECONDARY_ACCENT}`}
                    title="Change Theme"
                  >
                    <Palette size={20} />
                  </button>

                  {showThemeSelector && (
                    <div className={`absolute right-0 mt-2 rounded-xl ${themeStyles.SHADOW} border ${themeStyles.TABLE_BORDER} ${themeStyles.MODAL_BG} z-50`}>
                      <ThemeSelector 
                        currentTheme={currentTheme} 
                        setCurrentTheme={setCurrentTheme}
                        onClose={() => setShowThemeSelector(false)}
                      />
                    </div>
                  )}
                </div>

                {/* User Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  {user?.Avatar ? (
                    <img
                      src={user.Avatar}
                      alt="User Avatar"
                      className={`w-10 h-10 rounded-full cursor-pointer border-2 ${themeStyles.BORDER_COLOR} hover:${themeStyles.BORDER_COLOR.replace('border-', 'border-')} transition-colors`}
                      onClick={() => setShowMenu(!showMenu)}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-2 ${themeStyles.BORDER_COLOR} ${themeStyles.BUTTON_SECONDARY} hover:${themeStyles.BG_SECONDARY_ACCENT.replace("bg-", "bg-")} transition-colors`}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <User className={`w-6 h-6 ${themeStyles.TEXT_COLOR}`} />
                    </div>
                  )}
                  
                  {showMenu && (
                    <div className={`absolute right-0 mt-2 w-56 ${themeStyles.CARD_BG} ${themeStyles.SHADOW} rounded-lg overflow-hidden z-50 border ${themeStyles.BORDER_COLOR}`}>
                      {/* User Info */}
                      <div className={`p-3 border-b ${themeStyles.TABLE_BORDER}`}>
                        <p className={`font-medium ${themeStyles.TEXT_COLOR}`}>
                          {user?.username || 'User'}
                        </p>
                        <p className={`text-xs ${themeStyles.TEXT_SECONDARY} mt-1`}>
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="p-1">
                        <Link
                          to={PATHS.PROFILE_UPDATE}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md hover:${themeStyles.BG_ACCENT.replace("bg-", "bg-")} hover:bg-opacity-10 text-sm ${themeStyles.TEXT_COLOR}`}
                          onClick={() => setShowMenu(false)}
                        >
                          <User size={16} />
                          Profile Settings
                        </Link>

                        <button
                          onClick={() => {
                            setShowThemeSelector(true);
                            setShowMenu(false);
                          }}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-md hover:${themeStyles.BG_ACCENT.replace("bg-", "bg-")} hover:bg-opacity-10 text-sm ${themeStyles.TEXT_COLOR}`}
                        >
                          <Palette size={16} />
                          Change Theme
                        </button>

                        <div className={`border-t ${themeStyles.TABLE_BORDER} my-1`}></div>

                        <button
                          onClick={logOutHandler}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-md hover:${themeStyles.ERROR_BG} text-sm ${themeStyles.ERROR}`}
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to={PATHS.LOGIN} className={`px-4 py-2 ${themeStyles.BUTTON} rounded-lg transition-colors ${themeStyles.FONT_PRIMARY}`}>
                Login
              </Link>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 flex overflow-y-scroll hide-scrollbar py-3 px-2 ${themeStyles.TEXT_COLOR} ${themeStyles.BACKGROUND_COLOR}`}>
          {children}
        </main>

        {/* Footer */}
        <footer className={`text-center py-3 mt-auto ${themeStyles.CARD_BG} text-sm ${themeStyles.TEXT_COLOR} ${themeStyles.FONT_PRIMARY} shrink-0`}>
          © 2025 Cafe Management System
        </footer>
      </div>
    </div>
  );
};

export default Layout;