import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pageData from "./pageData";
import Layout from "../components/layout/layout";
import MenuPageLayout from "../pages/Common/LayoutOfMenu";
import { THEME, THEME_CONFIG } from "../constants/Theme";

// Loader
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
      Loading...
    </span>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ✅ 1. Normal routes */}
          {pageData
            .filter((page) => !page.MenuLayout)
            .map((page, index) => (
              <Route
                key={index}
                path={page.path}
                element={
                  page.layout ? (
                    <Layout>
                      <page.component />
                    </Layout>
                  ) : (
                    <page.component />
                  )
                }
              />
            ))}

          {/* ✅ 2. Nested MenuLayout routes */}
          <Route element={<MenuPageLayout />}>
            {pageData
              .filter((page) => page.MenuLayout)
              .map((page, index) => (
                <Route
                  key={index}
                  path={page.path}
                  element={<page.component />}
                />
              ))}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
