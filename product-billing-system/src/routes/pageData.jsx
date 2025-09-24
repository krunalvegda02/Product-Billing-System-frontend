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
const StaffManagement = React.lazy(() => import("../pages/admin/StaffManagement"));
const Feedback = React.lazy(() => import("../pages/admin/Feedback"));

import { ROLE } from "../constants/Role";
import { PATHS } from "../constants/RouteNames";

const PageData = [
  {
    path: PATHS._,
    component: Home,
    roles: [ROLE.ADMIN, ROLE.MANAGER, ROLE.CUSTOMER, ROLE.WAITER],
    isPublic: true,
    layout: false,
  },
  {
    path: PATHS.LOGIN,
    component: Login,
    isPublic: true,
    layout: false,
  },
  {
    path: PATHS.SIGN_UP,
    component: SignUp,
    isPublic: true,
    layout: false,
  },

  {
    //TODO: PROFILE FOR STAFF MEMBER, I NEED TO VERIFY THAT IS IS WORKING FOR OTHER STAFS THEN ADMIN
    path: PATHS.PROFILE_UPDATE,
    component: updateProfile,
    roles: [ROLE.ADMIN, ROLE.MANAGER, ROLE.WAITER],
    isPublic: false,
    layout: true,
  },

  {
    path: PATHS.FORGOT_PASSWORD,
    component: ForgotPassword,
    roles: [ROLE.ADMIN, ROLE.MANAGER, ROLE.WAITER],
    isPublic: false,
    layout: false,
  },
  {
    path: PATHS.UPDATE_PASSWORD,
    component: ChangePassword,
    roles: [ROLE.ADMIN, ROLE.MANAGER, ROLE.WAITER],
    isPublic: false,
    layout: true,
  },

  {
    path: PATHS.HOME,
    component: Home,
    isPublic: true,
    layout: false,
  },
  {
    path: PATHS.ADMIN_DASHBOARD,
    component: AdminDashboard,
    roles: [ROLE.ADMIN],
    isPublic: false,
    layout: true,
  },
  {
    path: PATHS.CATEGORY_MANAGEMENT,
    component: CategoryManagement,
    roles: [ROLE.ADMIN, ROLE.MANAGER],
    isPublic: false,
    layout: true,
  },
  {
    path: PATHS.PRODUCT_MANAGEMENT,
    component: ProductManagement,
    roles: [ROLE.ADMIN, ROLE.MANAGER],
    isPublic: false,
    layout: true,
  },
  {
    path: PATHS.ORDER_MANAGEMENT,
    component: OrderManagement,
    roles: [ROLE.ADMIN, ROLE.MANAGER, ROLE.WAITER],
    isPublic: false,
    layout: true,
  },
  {
    path: PATHS.ADD_STAFF,
    component: StaffManagement,
    roles: [ROLE.ADMIN],
    isPublic: false,
    layout: true,
  },
  {
    path: PATHS.BILLING_MANAGEMENT,
    component: BillingManagement,
    roles: [ROLE.ADMIN, ROLE.MANAGER],
    isPublic: false,
    layout: true,
  },
  {
    path: PATHS.FEEDBACK_MANAGEMENT,
    component: Feedback,
    roles: [ROLE.ADMIN, ROLE.MANAGER],
    isPublic: false,
    layout: true,
  },

  //   { path: PATHS.PAGE_NOT_FOUND, component: PageNotFound, isPublic: true, layout: false },

  {
    path: PATHS.MENU,
    component: menu,
    isPublic: true,
    layout: true,
    MenuLayout: true,
  },
  {
    path: PATHS.CART,
    component: cart,
    isPublic: true,
    layout: false,
    MenuLayout: true,
  },
  {
    path: PATHS.FAV_PROD,
    component: favouriteProducts,
    roles: [ROLE.CUSTOMER],
    isPublic: false,
    MenuLayout: true,
  },
  {
    path: PATHS.CUST_PROFILE,
    component: customerProfile,
    roles: [ROLE.CUSTOMER],
    isPublic: false,
    MenuLayout: true,
  },
];

export default PageData;
