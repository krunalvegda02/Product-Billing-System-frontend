import React from "react";

const Login = React.lazy(() => import("../pages/auth/Login/index"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp/index"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));
// const Home = React.lazy(() => import("../pages/common/home"));

import { ROLE } from "../constants/Role";
import { PATHS } from "../constants/RouteNames";

const PageData = [
  { path: PATHS._, component: Login, roles: [ROLE.ADMIN, ROLE.MANAGER], isPublic: true, layout: false },
  { path: PATHS.LOGIN, component: Login, roles: [ROLE.ADMIN, ROLE.MANAGER], isPublic: true, layout: false },
  { path: PATHS.SIGN_UP, component: SignUp, roles: [ROLE.ADMIN, ROLE.MANAGER], isPublic: true, layout: false },
  { path: PATHS.FORGOT_PASSWORD, component: ForgotPassword, isPublic: true, layout: true },
//   { path: PATHS.PAGE_NOT_FOUND, component: PageNotFound, isPublic: true, layout: false },
];

export default PageData
