import React from "react";

const Loading = ({ color = "bg-blue-500" }) => {
  return (
    <div className="flex items-center justify-center space-x-2 h-16">
      <span className={`w-3 h-3 ${color} rounded-full animate-bounce`}></span>
      <span className={`w-3 h-3 ${color} rounded-full animate-bounce [animation-delay:-0.2s]`}></span>
      <span className={`w-3 h-3 ${color} rounded-full animate-bounce [animation-delay:-0.4s]`}></span>
    </div>
  );
};

export default Loading;
