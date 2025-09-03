import React, { useEffect, useState } from "react";
import DashboardView from "./DashboardView";
import axios from "axios";
import { THEME_CONFIG } from "../../../constants/Theme";
import { useDispatch } from "react-redux";
import { fetchDashboardData, fetchDashStaffData } from "../../../redux/Slices/dashboardSlice";
import { API_ENDPOINT } from "../../../constants/ApiEndPoints";

const Dashboard = () => {
  const currentTheme = "GENERAL";
  const theme = THEME_CONFIG[currentTheme];
  const APIURL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const categoryColors = [
    "bg-gradient-to-r from-blue-500 to-indigo-600",
    "bg-gradient-to-r from-green-500 to-emerald-600",
    "bg-gradient-to-r from-amber-500 to-orange-500",
    "bg-gradient-to-r from-purple-500 to-fuchsia-600",
  ];

  const [dashboardData, setDashboardData] = useState({
    revenue: {
      current: 12500,
      previous: 10800,
      trend: "up",
    },
    customers: {
      current: 842,
      previous: 768,
      trend: "up",
    },
    orders: {
      current: 324,
      previous: 298,
      trend: "up",
    },
    avgOrderValue: {
      current: 38.5,
      previous: 36.2,
      trend: "up",
    },
    menuItems: {
      total: 42,
      popular: 12,
    },
    staff: {
      total: 15,
      onDuty: 8,
    },

    topCategories: [
      { name: "Main Courses", value: 38, color: categoryColors[0] },
      { name: "Appetizers", value: 24, color: categoryColors[1] },
      { name: "Desserts", value: 18, color: categoryColors[2] },
      { name: "Beverages", value: 20, color: categoryColors[3] },
    ],
    topPerformers: [
      { name: "Sarah Johnson", role: "Server", orders: 42, initials: "SJ" },
      { name: "Michael Chen", role: "Bartender", orders: 38, initials: "MC" },
      { name: "Emma Rodriguez", role: "Server", orders: 35, initials: "ER" },
    ],
    recentOrders: [
      { id: 1, customer: "Table #5", items: 3, total: 86.5, status: "served", time: "12 min ago" },
      { id: 2, customer: "Takeaway #42", items: 2, total: 32.0, status: "preparing", time: "8 min ago" },
      { id: 3, customer: "Table #12", items: 4, total: 104.25, status: "served", time: "5 min ago" },
      { id: 4, customer: "Online #38", items: 5, total: 78.75, status: "pending", time: "2 min ago" },
    ],
    reviews: [
      { id: 1, customer: "Emily Johnson", rating: 5, comment: "Excellent food and service!", date: "Yesterday" },
      { id: 2, customer: "Michael Chen", rating: 4, comment: "Great atmosphere, will come back", date: "2 days ago" },
      { id: 3, customer: "David Wilson", rating: 5, comment: "Sarah provided exceptional service!", date: "Today" },
    ],
  });

  console.log(dashboardData);

    const [staffData, setStaffData] = useState(null);
    const [feedback, setFeedback] = useState({});

  const initDashboard = async () => {
    try {
      const dashboard = await dispatch(fetchDashboardData({ duration: "lastMonth" })).unwrap();

      const feedbacks = await axios.get(`${APIURL}v1/${API_ENDPOINT.GET_FEEDBACKS}`);
      setFeedback(feedbacks.data);

      console.log("✅ Dashboard Data Response:", dashboard, "staff", staffData, "feedback", feedback);
    } catch (error) {
      console.error("❌ Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    initDashboard();
  }, []);

  // Calculate percentage change
  const calculateChange = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  // Card background colors with gradients
  const cardColors = [
    "bg-gradient-to-br from-blue-50 to-indigo-100",
    "bg-gradient-to-br from-green-50 to-emerald-100",
    "bg-gradient-to-br from-amber-50 to-orange-100",
    "bg-gradient-to-br from-purple-50 to-fuchsia-100",
    "bg-gradient-to-br from-rose-50 to-pink-100",
    "bg-gradient-to-br from-cyan-50 to-teal-100",
  ];


  
  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Props to pass to the view component
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
