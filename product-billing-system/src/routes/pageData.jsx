import React from "react";

const Login = React.lazy(() => import("../pages/auth/Login/index"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp/index"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));
const Home = React.lazy(() => import("../pages/admin/home"));
const AdminDashboard = React.lazy(() => import("../pages/admin/dashboard"));
const CategoryManagement = React.lazy(() => import("../pages/admin/category"));
const ProductManagement = React.lazy(() => import("../pages/admin/product"));
const OrderManagement = React.lazy(() => import("../pages/admin/DashboardOrders"));
const ChangePassword = React.lazy(() => import("../pages/auth/ChangePassword"));
const updateProfile = React.lazy(() => import("../pages/auth/Profile/index"));
const BillingManagement = React.lazy(() => import("../pages/admin/Billing"));
const menu = React.lazy(() => import("../pages/Common/Menu/Menu"));
const menuLayout = React.lazy(() => import("../pages/Common/LayoutOfMenu/index"));
const cart = React.lazy(() => import("../pages/Common/Cart/index"));
const favouriteProducts = React.lazy(() => import("../pages/Common/FavouriteProducts/index"));
const customerProfile = React.lazy(() => import("../pages/Common/Profile/index"));

import { ROLE } from "../constants/Role";
import { PATHS } from "../constants/RouteNames";
import StaffManagement from "../pages/admin/StaffManagement";

const PageData = [
  { path: PATHS._, component: Login, roles: [ROLE.ADMIN, ROLE.MANAGER], isPublic: true, layout: false },
  { path: PATHS.LOGIN, component: Login, roles: [ROLE.ADMIN, ROLE.MANAGER], isPublic: true, layout: false },
  { path: PATHS.SIGN_UP, component: SignUp, roles: [ROLE.ADMIN, ROLE.MANAGER], isPublic: true, layout: false },

  { path: PATHS.PROFILE_UPDATE, component: updateProfile, isPublic: true, layout: true },

  { path: PATHS.FORGOT_PASSWORD, component: ForgotPassword, isPublic: true, layout: true },
  { path: PATHS.UPDATE_PASSWORD, component: ChangePassword, isPublic: true, layout: true },

  { path: PATHS.HOME, component: Home, isPublic: true, layout: true },
  { path: PATHS.ADMIN_DASHBOARD, component: AdminDashboard, isPublic: true, layout: true },
  { path: PATHS.CATEGORY_MANAGEMENT, component: CategoryManagement, isPublic: true, layout: true },
  { path: PATHS.PRODUCT_MANAGEMENT, component: ProductManagement, isPublic: true, layout: true },
  { path: PATHS.ORDER_MANAGEMENT, component: OrderManagement, isPublic: true, layout: true },
  { path: PATHS.ADD_STAFF, component: StaffManagement, isPublic: true, layout: true },
  { path: PATHS.BILLING_MANAGEMENT, component: BillingManagement, isPublic: true, layout: true },

  //   { path: PATHS.PAGE_NOT_FOUND, component: PageNotFound, isPublic: true, layout: false },

  { path: PATHS.MENU, component: menu, isPublic: true, layout: false, MenuLayout: true },
  { path: PATHS.CART, component: cart, isPublic: true, layout: false, MenuLayout: true },
  { path: PATHS.FAV_PROD, component: favouriteProducts, isPublic: true, layout: false, MenuLayout: true },
  { path: PATHS.CUST_PROFILE, component: customerProfile, isPublic: true, layout: false, MenuLayout: true },
];

export default PageData;
