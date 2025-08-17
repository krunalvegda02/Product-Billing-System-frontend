import React from "react";
import DashboardView from "./DashboardView";
import { THEME_CONFIG } from "../../../constants/Theme";

const Dashboard = () => {
  const currentTheme = "GENERAL";
  const theme = THEME_CONFIG[currentTheme];
  
  return <DashboardView theme={theme} />;
};

export default Dashboard;
