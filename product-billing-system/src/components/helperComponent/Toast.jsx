
import React, { useState, useEffect } from "react";

const Toast = ({ toasts }) => {
  const [visibleToasts, setVisibleToasts] = useState(toasts);

  useEffect(() => {
    setVisibleToasts(toasts);
  }, [toasts]);

  const handleClose = (id) => {
    setVisibleToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative p-4 rounded-xl shadow-md border-2 transition-all duration-300 pr-10 ${
            toast.type === "success"
              ? "bg-[#FFDBC4E5] text-[#FF6200] border-[#FFA167]"
              : toast.type === "error"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-[#ff8f18e4] text-white border-[#FFA167]"
          }`}
        >
          {/* Close Button */}
          <button className="absolute top-1 right-2 text-sm font-bold hover:text-black transition" onClick={() => handleClose(toast.id)}>
            ✕
          </button>

          <p className="font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Toast;
