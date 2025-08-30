import React from "react";

const CircularLoading = ({ size = "w-12 h-12", color = "border-blue-500" }) => {
  return (
    <div className="flex items-center justify-center h-16">
      <div
        className={`${size} border-4 ${color} border-t-transparent border-solid rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default CircularLoading;
