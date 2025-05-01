import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Mock auth check — replace with actual auth logic
const isAuthenticated = () => {
  // Example: check localStorage or a token
  return localStorage.getItem("authToken") !== null;
};

const ProtectedRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
