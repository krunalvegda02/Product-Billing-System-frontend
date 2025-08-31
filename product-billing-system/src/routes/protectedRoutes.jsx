import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // 🚫 Logged in but role not allowed → redirect to home or unauthorized page
    return <Navigate to="/home" replace />;
  }

  // ✅ Allowed → render children
  return <Outlet />;
};

export default ProtectedRoutes;
