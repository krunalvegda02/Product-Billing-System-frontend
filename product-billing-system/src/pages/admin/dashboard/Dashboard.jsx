import React, { useEffect, useState } from "react";
import DashboardView from "./DashboardView";
import axios from "axios";
import { THEME_CONFIG } from "../../../constants/Theme";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData, fetchDashOrders } from "../../../redux/Slices/dashboardSlice";
import { API_ENDPOINT } from "../../../constants/ApiEndPoints";

const Dashboard = () => {
  const currentTheme = "GENERAL";
  const theme = THEME_CONFIG[currentTheme];
  const APIURL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);

  const [dashboardData, setDashboardData] = useState(null); // start with null

   const categoryColors = [
    "bg-gradient-to-r from-blue-500 to-indigo-600",
    "bg-gradient-to-r from-green-500 to-emerald-600",
    "bg-gradient-to-r from-amber-500 to-orange-500",
    "bg-gradient-to-r from-purple-500 to-fuchsia-600",
  ];

  const initDashboard = async () => {
    try {
      const dashboardRes = await dispatch(fetchDashboardData()).unwrap(); // 👈 your new API response
      const ordersRes = await dispatch(fetchDashOrders()).unwrap(); // recent orders
      const feedbackRes = await axios.get(`${APIURL}v1/${API_ENDPOINT.GET_FEEDBACKS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = dashboardRes.data; // ✅ unwrap
      const orders = ordersRes.data || []; // ✅ unwrap

      const mappedData = {
        revenue: { current: response.revenue || 0 },
        customers: { current: response.customersServed || 0 },
        orders: { current: response.totalServedOrders || 0 },
        avgOrderValue: { current: response.avgOrderValue || 0 },
        menuItems: {
          total: response.totalProducts || 0,
          popular: response.popularProducts?.length || 0,
        },
        topCategories:
          response.salesByCategory?.map((cat, idx) => ({
            name: `Category ${idx + 1}`,
            value: cat.percentage,
            color: categoryColors[idx % categoryColors.length],
          })) || [],
        staff: {
          total: response.staff?.total || 0,
          onDuty: response.staff?.onDuty || 0,
        },
        topPerformers:
          response.topPerformers?.map((p) => ({
            name: p.email,
            role: "Waiter",
            orders: p.totalOrders,
            initials: p.email?.substring(0, 2).toUpperCase(),
          })) || [],
        recentOrders: orders,
       reviews: feedbackRes.data?.slice(0, 4) || [],
      };

      setDashboardData(mappedData);
    } catch (error) {
      console.error("❌ Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    initDashboard();
  }, []);

  console.log(dashboardData);

  // Calculate percentage change
  const calculateChange = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  // Card background colors
  const cardColors = [
    "bg-gradient-to-br from-blue-50 to-indigo-100",
    "bg-gradient-to-br from-green-50 to-emerald-100",
    "bg-gradient-to-br from-amber-50 to-orange-100",
    "bg-gradient-to-br from-purple-50 to-fuchsia-100",
    "bg-gradient-to-br from-rose-50 to-pink-100",
    "bg-gradient-to-br from-cyan-50 to-teal-100",
  ];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (!dashboardData) return <p>Loading dashboard...</p>;

  const viewProps = {
    theme,
    dashboardData,
    calculateChange,
    cardColors,
    currentDate,
  };

  return <DashboardView {...viewProps} />;
};

export default Dashboard;
