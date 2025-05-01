import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* You can add header or sidebar here */}
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
