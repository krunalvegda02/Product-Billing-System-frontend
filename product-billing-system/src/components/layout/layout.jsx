import React from "react";
import { Link } from "react-router-dom";
import { THEME_CONFIG } from "../../constants/Theme";

const Layout = ({ children, currentTheme = "GENERAL", role = "admin" }) => {
  const theme = THEME_CONFIG[currentTheme];

  const menus = {
    admin: [
      { path: "/admin/dashboard", label: "📊 Dashboard" },
      { path: "/admin/categories", label: "🗂 Categories" },
      { path: "/admin/menu-items", label: "🍽 Menu Items" },
    ],
    manager: [
      { path: "/manager/orders", label: "📦 Orders" },
      { path: "/manager/billing", label: "💰 Billing" },
    ],
    waiter: [{ path: "/waiter/orders", label: "🍽 Orders to Serve" }],
  };

  const titleMap = {
    admin: "Admin Panel",
    manager: "Manager Panel",
    waiter: "Waiter Panel",
  };

  return (
<div className={`flex min-h-screen ${theme.BACKGROUND_GRADIENT}`}>
  {/* Sidebar */}
  <aside className={`w-64 p-6 ${theme.CARD_BG} ${theme.SHADOW} flex flex-col`}>
    <h2 className={`text-2xl font-bold mb-6 ${theme.TEXT_COLOR}`}>{titleMap[role]}</h2>
    <nav className="space-y-2 flex-1">
      {menus[role]?.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block px-4 py-2 rounded-lg transition-all duration-200 ${theme.ACCENT} text-white hover:${theme.SECONDARY_ACCENT}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
    <div className="mt-6 text-xs text-center text-gray-400">
      Theme: <span className="font-bold">{currentTheme}</span>
    </div>
  </aside>

  {/* Main content area */}
  <div className="flex-1 flex flex-col h-screen">
    {/* Header */}
    <header className={`p-5 flex justify-between items-center ${theme.ACCENT} text-white shadow shrink-0`}>
      <h1 className="text-2xl font-semibold">{titleMap[role]}</h1>
      <button className={`text-sm px-3 py-1 rounded ${theme.BUTTON}`}>Logout</button>
    </header>

    {/* Page Content */}
    <main className={`flex-1 flex overflow-y-scroll hide-scrollbar  h-16 p-6 ${theme.TEXT_COLOR}`}>
      {children}
    </main>

    {/* Footer */}
    <footer className={`text-center py-3 mt-auto ${theme.CARD_BG} text-sm ${theme.TEXT_COLOR} shrink-0`}>
      © 2025 Cafe Management System
    </footer>
  </div>
</div>

  );
};

export default Layout;
