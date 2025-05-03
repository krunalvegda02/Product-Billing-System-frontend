import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import pageData from "./pageData"; // Your page definitions
import ProtectedRoutes from "./protectedRoutes"; // Protected route wrapper
import Layout from "../components/layout/layout";
import { THEME, THEME_CONFIG } from "../constants/Theme";

// Themed fallback loader
const Loader = () => (
  <div className={`flex items-center justify-center h-screen ${THEME_CONFIG[THEME.GENERAL].BACKGROUND_COLOR}`}>
    <div className={`animate-spin rounded-full h-16 w-16 border-t-4  ${THEME_CONFIG[THEME.GENERAL].BORDER_COLOR} border-solid shadow-lg`}></div>
    <span className={`ml-4 ${THEME_CONFIG[THEME.GENERAL].TEXT_COLOR} font-semibold text-lg`}>Loading...</span>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {pageData.map((page, index) => (
            <Route
              key={index}
              path={page.path}
              element={
                // <ProtectedRoutes page={page}>
                <>
                  {page.layout ? (
                    <Layout>
                      <page.component />
                    </Layout>
                  ) : (
                    <page.component />
                  )}
                </>
                // </ProtectedRoutes>
              }
            />
          ))}
        </Routes>
        {/* <Routes>
          {pageData.map((page, index) => (
            <Route key={index} path={page.path} element={<page.component />} />
          ))}
        </Routes> */}
      </Suspense>
    </Router>
  );
};

export default AppRouter;
