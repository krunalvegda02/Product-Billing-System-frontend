import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ChevronRight,
  Calendar,
  Users,
  DollarSign,
  Utensils,
  Clock,
  Star,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  PieChart,
  UserCheck,
  Target,
} from "lucide-react";
import { PATHS } from "../../../constants/RouteNames";
import { THEME_CONFIG } from "../../../constants/Theme"; // Import the theme config

const DashboardView = ({ theme, dashboardData, calculateChange, cardColors, currentDate }) => {
  // Get the current theme configuration
  const currentTheme = theme || THEME_CONFIG.GENERAL;
  
  return (
    <div className={`w-full rounded-2xl mx-6 px-4 p-6 ${currentTheme.BACKGROUND_COLOR}`}>
      {/* Dashboard Header */}
      <div className={`p-6 mb-5  rounded-2xl shadow-lg ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER}`}>
        <div className="flex   flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <h1 className={`text-3xl font-bold ${currentTheme.TITLE_TEXT}`}>Restaurant Dashboard</h1>
            <p className={`${currentTheme.TEXT_SECONDARY} mt-2 flex items-center`}>
              <span>Performance overview for </span>
            </p>
          </div>

          {/* Date Span */}
          <div className="mt-4 lg:mt-0 lg:ml-auto self-end lg:self-start">
            <span className={`px-3 py-1 rounded-full ${currentTheme.BADGE} flex items-center`}>
              <Calendar size={16} className="mr-1" />
              {currentDate}
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue Card */}
        <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER} transition-transform hover:scale-[1.02]`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium ${currentTheme.TEXT_SECONDARY}`}>Total Revenue</p>
              <h3 className={`text-2xl font-bold ${currentTheme.TEXT_COLOR} mt-1`}>₹{dashboardData.revenue.current.toLocaleString()}</h3>
            </div>
            <div className={`p-3 rounded-full ${currentTheme.INFO_BG}`}>
              <DollarSign size={20} className={currentTheme.INFO} />
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER} transition-transform hover:scale-[1.02]`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium ${currentTheme.TEXT_SECONDARY}`}>Customers Served</p>
              <h3 className={`text-2xl font-bold ${currentTheme.TEXT_COLOR} mt-1`}>{dashboardData.customers.current}</h3>
            </div>
            <div className={`p-3 rounded-full ${currentTheme.SUCCESS_BG}`}>
              <Users size={20} className={currentTheme.SUCCESS} />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER} transition-transform hover:scale-[1.02]`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium ${currentTheme.TEXT_SECONDARY}`}>Total Orders</p>
              <h3 className={`text-2xl font-bold ${currentTheme.TEXT_COLOR} mt-1`}>{dashboardData.orders.current}</h3>
            </div>
            <div className={`p-3 rounded-full ${currentTheme.WARNING_BG}`}>
              <ShoppingCart size={20} className={currentTheme.WARNING} />
            </div>
          </div>
        </div>

        {/* Average Order Value Card */}
        <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER} transition-transform hover:scale-[1.02]`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium ${currentTheme.TEXT_SECONDARY}`}>Avg Order Value</p>
              <h3 className={`text-2xl font-bold ${currentTheme.TEXT_COLOR} mt-1`}>₹{dashboardData.avgOrderValue?.current.toFixed(2)}</h3>
            </div>
            <div className={`p-3 rounded-full ${currentTheme.INFO_BG}`}>
              <TrendingUp size={20} className={currentTheme.INFO} />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Menu and Staff Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Menu Overview */}
        <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER}`}>
          <h3 className={`text-xl font-semibold ${currentTheme.TEXT_COLOR} mb-4 flex items-center`}>
            <Utensils size={20} className="mr-2" /> Menu Overview
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`text-center p-4 rounded-xl border ${currentTheme.INFO_BG} ${currentTheme.TABLE_BORDER}`}>
              <div className={`text-3xl font-bold ${currentTheme.INFO}`}>{dashboardData.menuItems.total}</div>
              <p className={`text-sm ${currentTheme.INFO} mt-1 font-medium`}>Total Items</p>
            </div>
            <div className={`text-center p-4 rounded-xl border ${currentTheme.WARNING_BG} ${currentTheme.TABLE_BORDER}`}>
              <div className={`text-3xl font-bold ${currentTheme.WARNING}`}>{dashboardData.menuItems.popular}</div>
              <p className={`text-sm ${currentTheme.WARNING} mt-1 font-medium`}>Popular Items</p>
            </div>
          </div>

          <h4 className={`font-medium ${currentTheme.TEXT_SECONDARY} mb-2`}>Sales by Category</h4>
          <div className="space-y-2">
            {dashboardData.topCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${currentTheme.TEXT_SECONDARY}`}>{category.name}</span>
                  <span className={`text-sm font-medium ${currentTheme.TEXT_COLOR}`}>{category.value}%</span>
                </div>
                <div className={`${currentTheme.BACKGROUND_COLOR} h-2 rounded-full overflow-hidden`}>
                  <div className={`h-full ${currentTheme.BG_ACCENT} rounded-full`} style={{ width: `${category.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Performance */}
        <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER}`}>
          <h3 className={`text-xl font-semibold ${currentTheme.TEXT_COLOR} mb-4 flex items-center`}>
            <UserCheck size={20} className="mr-2" /> Staff Performance
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`text-center p-4 rounded-xl border ${currentTheme.SUCCESS_BG} ${currentTheme.TABLE_BORDER}`}>
              <div className={`text-3xl font-bold ${currentTheme.SUCCESS}`}>{dashboardData.staff?.onDuty}</div>
              <p className={`text-sm ${currentTheme.SUCCESS} mt-1 font-medium`}>On Duty</p>
            </div>
            <div className={`text-center p-4 rounded-xl border ${currentTheme.INFO_BG} ${currentTheme.TABLE_BORDER}`}>
              <div className={`text-3xl font-bold ${currentTheme.INFO}`}>{dashboardData.staff?.total}</div>
              <p className={`text-sm ${currentTheme.INFO} mt-1 font-medium`}>Total Staff</p>
            </div>
          </div>

          <h4 className={`font-medium ${currentTheme.TEXT_SECONDARY} mb-2`}>Top Performers</h4>
          <div className="space-y-3">
            {dashboardData.topPerformers?.map((staff, index) => (
              <div key={index} className={`flex items-center justify-between p-2 rounded-lg border ${currentTheme.TABLE_ROW} ${currentTheme.TABLE_BORDER}`}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${currentTheme.INFO_BG} flex items-center justify-center mr-3`}>
                    <span className={`${currentTheme.INFO} font-medium text-sm`}>{staff.initials}</span>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${currentTheme.TEXT_COLOR}`}>{staff.name}</p>
                    <p className={`text-xs ${currentTheme.TEXT_SECONDARY}`}>{staff.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Target size={14} className={`${currentTheme.ICON_COLOR} mr-1`} />
                  <span className={`text-sm font-medium ${currentTheme.TEXT_COLOR}`}>{staff.orders} orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row - Recent Orders and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER}`}>
          <h3 className={`text-xl font-semibold ${currentTheme.TEXT_COLOR} mb-4 flex items-center`}>
            <Clock size={20} className="mr-2" /> Recent Orders
          </h3>
          <div className="space-y-4">
            {dashboardData.recentOrders.length > 0 ? (
              dashboardData.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className={`flex justify-between items-center p-3 rounded-lg border ${currentTheme.TABLE_ROW} ${currentTheme.TABLE_BORDER} ${currentTheme.TABLE_ROW_HOVER}`}
                >
                  <div>
                    <p className={`font-medium ${currentTheme.TEXT_COLOR}`}>{order.customer?.username || "Guest"}</p>
                    <p className={`text-sm ${currentTheme.TEXT_SECONDARY}`}>
                      {order.itemsCount} items • ₹{order.total?.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        order.status === "SERVED"
                          ? `${currentTheme.SUCCESS_BG} ${currentTheme.SUCCESS}`
                          : order.status === "PREPARING"
                            ? `${currentTheme.INFO_BG} ${currentTheme.INFO}`
                            : order.status === "PENDING"
                              ? `${currentTheme.WARNING_BG} ${currentTheme.WARNING}`
                              : order.status === "COMPLETED"
                                ? "bg-purple-100 text-purple-800 border border-purple-200"
                                : `${currentTheme.WARNING_BG} ${currentTheme.WARNING}`
                      }`}
                    >
                      {order.status}
                    </span>

                    <p className={`text-xs ${currentTheme.TEXT_SECONDARY} mt-1`}>
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={`text-sm ${currentTheme.TEXT_SECONDARY}`}>No recent orders</p>
            )}
          </div>
          <Link to="/admin/orders" className={`block text-center mt-4 text-sm ${currentTheme.LINK} font-medium`}>
            View all orders
          </Link>
        </div>

        {/* Recent Reviews */}
        <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER}`}>
          <h3 className={`text-xl font-semibold ${currentTheme.TEXT_COLOR} mb-4 flex items-center`}>
            <Star size={20} className="mr-2" /> Recent Reviews
          </h3>
          <div className="space-y-4">
            {dashboardData.reviews.map((review) => (
              <div key={review.id} className={`p-3 rounded-lg border ${currentTheme.TABLE_ROW} ${currentTheme.TABLE_BORDER} ${currentTheme.TABLE_ROW_HOVER}`}>
                <div className="flex justify-between items-start">
                  <p className={`font-medium ${currentTheme.TEXT_COLOR}`}>{review.user.username}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? `${currentTheme.WARNING} fill-current` : `${currentTheme.TEXT_SECONDARY}`} />
                    ))}
                  </div>
                </div>
                <p className={`text-sm mt-2 ${currentTheme.TEXT_SECONDARY}`}>{review.comment}</p>
                <p className={`text-xs ${currentTheme.TEXT_SECONDARY} mt-2`}>{review.date}</p>
              </div>
            ))}
          </div>
          <Link to="/admin/reviews" className={`block text-center mt-4 text-sm ${currentTheme.LINK} font-medium`}>
            View all reviews
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`p-6 rounded-2xl ${currentTheme.CARD_BG} ${currentTheme.CARD_HOVER}`}>
        <h3 className={`text-xl font-semibold ${currentTheme.TEXT_COLOR} mb-6`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to={PATHS.ORDER_MANAGEMENT}
            className={`p-4 text-center rounded-xl ${currentTheme.BUTTON} transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center">
              <ShoppingCart size={24} />
              <span className="mt-2 text-sm font-medium">New Order</span>
            </div>
          </Link>
          <Link
            to={PATHS.PRODUCT_MANAGEMENT}
            className={`p-4 text-center rounded-xl ${currentTheme.BUTTON} transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center">
              <Utensils size={24} />
              <span className="mt-2 text-sm font-medium">Manage Menu</span>
            </div>
          </Link>
          <Link
            to={PATHS.ADD_STAFF}
            className={`p-4 text-center rounded-xl ${currentTheme.BUTTON} transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center">
              <Users size={24} />
              <span className="mt-2 text-sm font-medium">Staff</span>
            </div>
          </Link>
          <Link
            to={PATHS.BILLING_MANAGEMENT}
            className={`p-4 text-center rounded-xl ${currentTheme.BUTTON} transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center">
              <PieChart size={24} />
              <span className="mt-2 text-sm font-medium">Billing</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;