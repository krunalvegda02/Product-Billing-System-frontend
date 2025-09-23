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




// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoutes = ({ page }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   // 1. Public route → allow directly
//   if (page.isPublic) {
//     return <page.component />;
//   }

//   // 2. Not logged in → redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // 3. Role check
//   if (page.roles && !page.roles.includes(user.role)) {
//     return <Navigate to="/home" replace />;
//   }

//   // 4. Authenticated and allowed → render component with layout if needed
//   if (page.layout) {
//     return (
//       <Layout>
//         <page.component />
//       </Layout>
//     );
//   }

//   return <page.component />;
// };

// export default ProtectedRoutes;
