import React, { createContext, useCallback, useContext, useState, useEffect } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Move this here or import from another file
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
          <button className="absolute top-1 right-2 text-sm font-bold hover:text-black transition" onClick={() => handleClose(toast.id)}>
            ✕
          </button>
          <p className="font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
