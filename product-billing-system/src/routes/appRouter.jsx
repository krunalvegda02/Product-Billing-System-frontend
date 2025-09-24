// import { Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pageData from "./pageData";
// import Layout from "../components/layout/layout";
// import MenuPageLayout from "../pages/Common/LayoutOfMenu";
// import { THEME, THEME_CONFIG } from "../constants/Theme";
// import Loading from "../components/commonComponent/Loading";
// import ProtectedRoutes from "./protectedRoutes";

// const Loader = () => (
//   <div
//     className={`flex items-center justify-center h-screen ${THEME_CONFIG[THEME.GENERAL].BACKGROUND_COLOR}`}
//   >
//     {/* <div
//       className={`animate-spin rounded-full h-16 w-16 border-t-4 ${THEME_CONFIG[THEME.GENERAL].BORDER_COLOR} border-solid shadow-lg`}
//     ></div> */}
//     <span
//       className={`ml-4 ${THEME_CONFIG[THEME.GENERAL].TEXT_COLOR} font-semibold text-lg`}
//     >
//       <Loading />
//     </span>
//   </div>
// );

// const AppRouter = () => {
//   return (
//     <Router>
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           {/* ✅ Public normal routes */}
//           {pageData
//             .filter((page) => page.isPublic && !page.MenuLayout)
//             .map((page, index) => (
//               <Route
//                 key={index}
//                 path={page.path}
//                 element={
//                   page.layout ? (
//                     <Layout>
//                       <page.component />
//                     </Layout>
//                   ) : (
//                     <page.component />
//                   )
//                 }
//               />
//             ))}

//           {/* ✅ Protected normal routes */}
//           <Route element={<ProtectedRoutes />}>
//             {pageData
//               .filter((page) => !page.isPublic && !page.MenuLayout)
//               .map((page, index) => (
//                 <Route
//                   key={index}
//                   path={page.path}
//                   element={
//                     page.layout ? (
//                       <Layout>
//                         <page.component />
//                       </Layout>
//                     ) : (
//                       <page.component />
//                     )
//                   }
//                 />
//               ))}
//           </Route>

//           {/* ✅ Public menu routes */}
//           <Route element={<MenuPageLayout />}>
//             {pageData
//               .filter((page) => page.isPublic && page.MenuLayout)
//               .map((page, index) => (
//                 <Route
//                   key={index}
//                   path={page.path}
//                   element={<page.component />}
//                 />
//               ))}
//           </Route>

//           {/* ✅ Protected menu routes */}
//           <Route element={<ProtectedRoutes />}>
//             <Route element={<MenuPageLayout />}>
//               {pageData
//                 .filter((page) => !page.isPublic && page.MenuLayout)
//                 .map((page, index) => (
//                   <Route
//                     key={index}
//                     path={page.path}
//                     element={<page.component />}
//                   />
//                 ))}
//             </Route>
//           </Route>
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default AppRouter;


import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pageData from "./pageData";
import Layout from "../components/layout/layout";
import MenuPageLayout from "../pages/Common/LayoutOfMenu";
import { THEME, THEME_CONFIG } from "../constants/Theme";
import Loading from "../components/commonComponent/Loading";
import ProtectedRoutes from "./protectedRoutes";

const Loader = () => (
  <div
    className={`flex items-center justify-center h-screen ${THEME_CONFIG[THEME.GENERAL].BACKGROUND_COLOR}`}
  >
    <div
      className={`animate-spin rounded-full h-16 w-16 border-t-4 ${THEME_CONFIG[THEME.GENERAL].BORDER_COLOR} border-solid shadow-lg`}
    ></div>
    <span
      className={`ml-4 ${THEME_CONFIG[THEME.GENERAL].TEXT_COLOR} font-semibold text-lg`}
    >
      <Loading />
    </span>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {pageData.map((page, index) => {
            // Protected route wrapper
            const protectedElement = <ProtectedRoutes page={page} />;

            // Case 1: MenuLayout pages → use nested route
            if (page.MenuLayout) {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={<MenuPageLayout />}
                >
                  {/* nested route renders the actual component inside Outlet */}
                  <Route index element={protectedElement} />
                </Route>
              );
            }

            // Case 2: Regular layout pages
            let element = protectedElement;

            if (page.layout) {
              element = <Layout>{element}</Layout>;
            }

            return (
              <Route
                key={index}
                path={page.path}
                element={element}
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
