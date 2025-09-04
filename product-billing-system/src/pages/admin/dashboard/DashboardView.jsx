import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Utensils, Clock, Star, ShoppingCart, ArrowUp, ArrowDown, PieChart, UserCheck, Target } from "lucide-react";
import { PATHS } from "../../../constants/RouteNames";

const DashboardView = ({ theme, dashboardData, calculateChange, cardColors, currentDate }) => {
  return (
    <div className={`w-full rounded-2xl mx-6 px-4 p-6 ₹{theme.BACKGROUND_COLOR}`}>
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ₹{theme.TEXT_COLOR}`}>Restaurant Management Dashboard</h1>
          <p className={`text-lg ₹{theme.TEXT_SECONDARY} mt-2`}>Welcome back! Here's today's performance overview.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium`}>
            Today: {currentDate}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue Card */}
        <div
          className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transition-transform hover:scale-[1.02]`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-blue-700">Total Revenue</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">₹{dashboardData.revenue.current.toLocaleString()}</h3>
              {/* <div className="flex items-center mt-2">
                {dashboardData.revenue.trend === "up" ? (
                  <ArrowUp size={14} className="text-green-600 mr-1" />
                ) : (
                  <ArrowDown size={14} className="text-red-600 mr-1" />
                )}
                <span className={`text-sm ₹{dashboardData.revenue.trend === "up" ? "text-green-600" : "text-red-600"} font-medium`}>
                  {calculateChange(dashboardData.revenue.current, dashboardData.revenue.previous)}% from last week
                </span>
              </div> */}
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <DollarSign size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div
          className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200 transition-transform hover:scale-[1.02]`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-green-700">Customers Served</p>
              <h3 className="text-2xl font-bold text-green-900 mt-1">{dashboardData.customers.current}</h3>
              {/* <div className="flex items-center mt-2">
                {dashboardData.customers.trend === "up" ? (
                  <ArrowUp size={14} className="text-green-600 mr-1" />
                ) : (
                  <ArrowDown size={14} className="text-red-600 mr-1" />
                )}
                <span className={`text-sm ₹{dashboardData.customers.trend === "up" ? "text-green-600" : "text-red-600"} font-medium`}>
                  {calculateChange(dashboardData.customers.current, dashboardData.customers.previous)}% from last week
                </span>
              </div> */}
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Users size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div
          className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 transition-transform hover:scale-[1.02]`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-amber-700">Total Orders</p>
              <h3 className="text-2xl font-bold text-amber-900 mt-1">{dashboardData.orders.current}</h3>
              {/* <div className="flex items-center mt-2">
                {dashboardData.orders.trend === "up" ? (
                  <ArrowUp size={14} className="text-green-600 mr-1" />
                ) : (
                  <ArrowDown size={14} className="text-red-600 mr-1" />
                )}
                <span className={`text-sm ₹{dashboardData.orders.trend === "up" ? "text-green-600" : "text-red-600"} font-medium`}>
                  {calculateChange(dashboardData.orders.current, dashboardData.orders.previous)}% from last week
                </span>
              </div> */}
            </div>
            <div className="p-3 rounded-full bg-amber-100">
              <ShoppingCart size={20} className="text-amber-600" />
            </div>
          </div>
        </div>

        {/* Average Order Value Card */}
        <div
          className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 transition-transform hover:scale-[1.02]`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-purple-700">Avg Order Value</p>
              <h3 className="text-2xl font-bold text-purple-900 mt-1">₹{dashboardData.avgOrderValue?.current.toFixed(2)}</h3>
              {/* <div className="flex items-center mt-2">
                {dashboardData.avgOrderValue?.trend === "up" ? (
                  <ArrowUp size={14} className="text-green-600 mr-1" />
                ) : (
                  <ArrowDown size={14} className="text-red-600 mr-1" />
                )}
                <span className={`text-sm ₹{dashboardData.avgOrderValue?.trend === "up" ? "text-green-600" : "text-red-600"} font-medium`}>
                  {calculateChange(dashboardData.avgOrderValue?.current, dashboardData.avgOrderValue?.previous)}% from last week
                </span>
              </div> */}
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Menu and Staff Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Menu Overview */}
        <div className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-rose-50 to-pink-100 border border-pink-200`}>
          <h3 className="text-xl font-semibold text-rose-800 mb-4 flex items-center">
            <Utensils size={20} className="mr-2" /> Menu Overview
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-700">{dashboardData.menuItems.total}</div>
              <p className="text-sm text-blue-600 mt-1 font-medium">Total Items</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl border border-amber-200">
              <div className="text-3xl font-bold text-amber-700">{dashboardData.menuItems.popular}</div>
              <p className="text-sm text-amber-600 mt-1 font-medium">Popular Items</p>
            </div>
          </div>

          <h4 className="font-medium text-rose-700 mb-2">Sales by Category</h4>
          <div className="space-y-2">
            {dashboardData.topCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-rose-700">{category.name}</span>
                  <span className="text-sm font-medium text-rose-800">{category.value}%</span>
                </div>
                <div className="bg-rose-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ₹{category.color} rounded-full`} style={{ width: `₹{category.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Performance */}
        <div className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-teal-50 to-cyan-100 border border-cyan-200`}>
          <h3 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center">
            <UserCheck size={20} className="mr-2" /> Staff Performance
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl border border-green-200">
              <div className="text-3xl font-bold text-green-700">{dashboardData.staff?.onDuty}</div>
              <p className="text-sm text-green-600 mt-1 font-medium">On Duty</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-700">{dashboardData.staff?.total}</div>
              <p className="text-sm text-blue-600 mt-1 font-medium">Total Staff</p>
            </div>
          </div>

          <h4 className="font-medium text-cyan-700 mb-2">Top Performers</h4>
          <div className="space-y-3">
            {dashboardData.topPerformers?.map((staff, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border border-cyan-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
                    <span className="text-cyan-700 font-medium text-sm">{staff.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cyan-900">{staff.name}</p>
                    <p className="text-xs text-cyan-600">{staff.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Target size={14} className="text-cyan-600 mr-1" />
                  <span className="text-sm font-medium text-cyan-800">{staff.orders} orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row - Recent Orders and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200`}>
          <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <Clock size={20} className="mr-2" /> Recent Orders
          </h3>
          <div className="space-y-4">
            {dashboardData.recentOrders.length > 0 ? (
              dashboardData.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex justify-between items-center p-3 bg-white rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-medium text-indigo-900">{order.customer?.username || "Guest"}</p>
                    <p className="text-sm text-indigo-600">
                      {order.itemsCount} items • ₹{order.total?.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "SERVED"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : order.status === "PREPARING"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : order.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                              : order.status === "COMPLETED"
                                ? "bg-purple-100 text-purple-800 border border-purple-200"
                                : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {order.status}
                    </span>

                    <p className="text-xs text-indigo-500 mt-1">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-indigo-500">No recent orders</p>
            )}
          </div>
          <Link to="/admin/orders" className="block text-center mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
            View all orders
          </Link>
        </div>

        {/* Recent Reviews */}
        <div className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200`}>
          <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
            <Star size={20} className="mr-2" /> Recent Reviews
          </h3>
          <div className="space-y-4">
            {dashboardData.reviews.map((review) => (
              <div key={review.id} className="p-3 bg-white rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-amber-900">{review.user.username}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-amber-200"} />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2 text-amber-700">{review.comment}</p>
                <p className="text-xs text-amber-600 mt-2">{review.date}</p>
              </div>
            ))}
          </div>
          <Link to="/admin/reviews" className="block text-center mt-4 text-sm text-amber-600 hover:text-amber-800 font-medium hover:underline">
            View all reviews
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to={PATHS.ORDER_MANAGEMENT}
            className="p-4 text-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              <ShoppingCart size={24} />
              <span className="mt-2 text-sm font-medium">New Order</span>
            </div>
          </Link>
          <Link
            to={PATHS.PRODUCT_MANAGEMENT}
            className="p-4 text-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              <Utensils size={24} />
              <span className="mt-2 text-sm font-medium">Manage Menu</span>
            </div>
          </Link>
          <Link
            to={PATHS.ADD_STAFF}
            className="p-4 text-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              <Users size={24} />
              <span className="mt-2 text-sm font-medium">Staff</span>
            </div>
          </Link>
          <Link
            to={PATHS.BILLING_MANAGEMENT}
            className="p-4 text-center rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white hover:from-purple-600 hover:to-fuchsia-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
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
