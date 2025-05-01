import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../components/layout/layout";
import pageData from "./pageData"; // Your page definitions
import ProtectedRoutes from "./protectedRoutes"; // Protected route wrapper

// Themed fallback loader
const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-[#FFDBC4E5]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FF6200] border-solid shadow-lg"></div>
    <span className="ml-4 text-[#FF6200] font-semibold text-lg">Loading...</span>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        {/* <Routes>
          {pageData.map((page, index) => (
            <Route
              key={index}
              path={page.path}
              element={
                <ProtectedRoutes page={page}>
                  {page.layout ? (
                    <Layout>
                      <page.component />
                    </Layout>
                  ) : (
                    <page.component />
                  )}
                </ProtectedRoutes>
              }
            />
          ))}
        </Routes> */}
        <Routes>
          {pageData.map((page, index) => (
            <Route key={index} path={page.path} element={<page.component />} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
