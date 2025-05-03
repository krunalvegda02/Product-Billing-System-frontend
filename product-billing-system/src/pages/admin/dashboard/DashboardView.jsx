import React from "react";
import { Link } from "react-router-dom";

const DashboardView = ({ theme }) => {
  return (
    <div className={`w-full rounded-2xl mx-6 px-4 p-6  ${theme.BACKGROUND_COLOR}`}>
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-semibold ${theme.TEXT_COLOR}`}>Welcome to Admin Dashboard</h1>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className={`bg-white shadow-lg p-6 rounded-xl ${theme.CARD_BG}`}>
          <h3 className={`text-lg font-semibold ${theme.TEXT_COLOR}`}>Total Orders</h3>
          <p className={`text-3xl font-bold ${theme.TEXT_COLOR}`}>125</p>
        </div>
        <div className={`bg-white shadow-lg p-6 rounded-xl ${theme.CARD_BG}`}>
          <h3 className={`text-lg font-semibold ${theme.TEXT_COLOR}`}>Total Revenue</h3>
          <p className={`text-3xl font-bold ${theme.TEXT_COLOR}`}>$4,500</p>
        </div>
        <div className={`bg-white shadow-lg p-6 rounded-xl ${theme.CARD_BG}`}>
          <h3 className={`text-lg font-semibold ${theme.TEXT_COLOR}`}>Menu Items</h3>
          <p className={`text-3xl font-bold ${theme.TEXT_COLOR}`}>50</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`p-6 ${theme.CARD_BG} border-2 rounded-lg ${theme.BORDER_COLOR} shadow-md`}>
          <h4 className={`text-xl font-semibold ${theme.TEXT_COLOR}`}>Manage Categories</h4>
          <Link to="/admin/categories" className={`text-sm ${theme.LINK} hover:${theme.BG_SECONDARY_ACCENT}`}>
            View Categories
          </Link>
        </div>
        <div className={`p-6 ${theme.CARD_BG} border-2 rounded-lg ${theme.BORDER_COLOR} shadow-md`}>
          <h4 className={`text-xl font-semibold ${theme.TEXT_COLOR}`}>Manage Menu Items</h4>
          <Link to="/admin/menu-items" className={`text-sm ${theme.LINK} hover:${theme.BG_SECONDARY_ACCENT}`}>
            View Menu Items
          </Link>
        </div>
        <div className={`p-6 ${theme.CARD_BG} border-2 rounded-lg ${theme.BORDER_COLOR} shadow-md`}>
          <h4 className={`text-xl font-semibold ${theme.TEXT_COLOR}`}>View Orders</h4>
          <Link to="/admin/orders" className={`text-sm ${theme.LINK} hover:${theme.BG_SECONDARY_ACCENT}`}>
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
