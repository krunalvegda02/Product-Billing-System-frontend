import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/RouteNames";
import { THEME_CONFIG } from "../../constants/Theme";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";
import { Bell, Search, User, LogOut, Menu, X } from "lucide-react";

const Layout = ({ children, currentTheme = "GENERAL", role = "admin" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const logOutHandler = async () => {
    const res = await dispatch(logout());
    if (logout.fulfilled.match(res)) {
      navigate(PATHS.LOGIN);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }

      // Close mobile sidebar when clicking outside on small screens
      if (
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setShowMobileSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const theme = THEME_CONFIG[currentTheme];

  const menus = {
    admin: [
      { path: PATHS.ADMIN_DASHBOARD, label: "Dashboard", icon: "📊" },
      { path: PATHS.CATEGORY_MANAGEMENT, label: "Categories", icon: "🗂️" },
      { path: PATHS.PRODUCT_MANAGEMENT, label: "Menu Items", icon: "🍽️" },
      { path: PATHS.ADD_STAFF, label: "Staff Management", icon: "👥" },
      { path: PATHS.ORDER_MANAGEMENT, label: "Orders", icon: "📦" },
      { path: PATHS.BILLING_MANAGEMENT, label: "Billing", icon: "💰" },
      { path: PATHS.FEEDBACK_MANAGEMENT, label: "Feedback", icon: "💬" },
    ],
    manager: [
      { path: PATHS.CATEGORY_MANAGEMENT, label: "Categories", icon: "🗂️" },
      { path: PATHS.PRODUCT_MANAGEMENT, label: "Menu Items", icon: "🍽️" },
      { path: PATHS.ADD_STAFF, label: "Staff Management", icon: "👥" },
      { path: PATHS.ORDER_MANAGEMENT, label: "Orders", icon: "📦" },
      { path: PATHS.BILLING_MANAGEMENT, label: "Billing", icon: "💰" },
      { path: PATHS.FEEDBACK_MANAGEMENT, label: "Feedback", icon: "💬" },
    ],
    waiter: [{ path: "/waiter/orders", label: "Orders to Serve", icon: "🛎️" }],
  };

  const titleMap = {
    admin: "Admin Panel",
    manager: "Manager Panel",
    waiter: "Waiter Panel",
  };

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  // Close mobile sidebar when a menu item is clicked
  const handleMenuItemClick = () => {
    if (window.innerWidth < 768) {
      setShowMobileSidebar(false);
    }
  };

  return (
    <div className={`flex min-h-screen ${theme.BACKGROUND_GRADIENT}`}>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside
        ref={sidebarRef}
        className={`w-56 min-h-screen p-4 ${theme.BG_ASIDE} flex flex-col shadow-xl border-r ${theme.BORDER_COLOR} transition-all duration-300 fixed md:relative z-40
          ${showMobileSidebar ? "left-0" : "-left-56"} md:left-0`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end md:hidden ">
          <button onClick={() => setShowMobileSidebar(false)} className={`rounded-full ${theme.TEXT_COLOR} hover:bg-white hover:bg-opacity-10`}>
            <X size={20} />
          </button>
        </div>

        {/* Compact Header */}
        <div className="mb-6 ">
          <h2 className={`text-xl font-bold ${theme.TEXT_COLOR} text-center`}>{titleMap[role]}</h2>
          <div className={`h-0.5 w-12 mx-auto ${theme.BG_ACCENT} rounded-full opacity-80 mt-2`}></div>
        </div>

        {/* Compact Navigation Menu */}
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
            hover:transform hover:translate-x-0.5
            ${
              isActive
                ? `${theme.BG_ACCENT} text-white shadow-sm font-medium`
                : `${theme.BG_ASIDE} ${theme.TEXT_COLOR} hover:${theme.BG_ACCENT} hover:bg-opacity-15`
            }
            border ${isActive ? "border-transparent" : theme.BORDER_COLOR}
          `}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-sm">{item.label}</span>
                {isActive && <div className={`w-1.5 h-1.5 rounded-full bg-white`}></div>}
              </Link>
            );
          })}
        </nav>

        {/* Compact Theme indicator */}
        <div className={`mt-4 p-2 rounded-md ${theme.BG_ACCENT} bg-opacity-10 text-center border ${theme.BORDER_COLOR}`}>
          <p className={`text-xs ${theme.TEXT_COLOR}`}>
            Theme: <span className="font-medium capitalize">{currentTheme.toLowerCase()}</span>
          </p>
        </div>

        {/* Compact User info */}
        <div className="mt-4 pt-3 border-t border-gray-200 border-opacity-20">
          <div className="text-center">
            <p className={`text-xs font-medium ${theme.TEXT_COLOR}`}>Cafe Manager</p>
            <p className={`text-xs ${theme.TEXT_COLOR} opacity-60 mt-0.5`}>Welcome!</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay - Only visible on mobile when sidebar is open */}
      {showMobileSidebar && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setShowMobileSidebar(false)}></div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen w-full md:w-auto">
        {/* Header */}
        <header className={`p-4 flex justify-between items-center ${theme.BG_HEADER} shadow-md shrink-0`}>
          {/* Left Side - Menu Button and Title */}
          <div className="flex items-center gap-3">
            <button className="mobile-menu-button md:hidden" onClick={toggleMobileSidebar}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">{titleMap[role]}</h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* User role display - Now visible on all screen sizes */}
                <div className="flex items-center">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${theme.BG_ACCENT} bg-opacity-20 ${theme.TEXT_COLOR} border ${theme.BORDER_COLOR} shadow-sm`}
                  >
                    {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </div>

                {/* Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  {user?.Avatar ? (
                    <img
                      src={user.Avatar}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
                      onClick={() => setShowMenu(!showMenu)}
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-2 border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <User className="w-6 h-6" />
                    </div>
                  )}

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                      <Link
                        to={PATHS.PROFILE_UPDATE}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setShowMenu(false)}
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button
                        onClick={logOutHandler}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to={PATHS.LOGIN} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                Login
              </Link>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 flex overflow-y-scroll hide-scrollbar py-3 px-2 ${theme.TEXT_COLOR} ${theme.BACKGROUND_COLOR}`}>{children}</main>

        {/* Footer */}
        <footer className={`text-center py-3 mt-auto ${theme.CARD_BG} text-sm ${theme.TEXT_COLOR} shrink-0`}>© 2025 Cafe Management System</footer>
      </div>
    </div>
  );
};

export default Layout;
