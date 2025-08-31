import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

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

// Enhanced Toast component with improved styling
const Toast = ({ toasts }) => {
  const [visibleToasts, setVisibleToasts] = useState(toasts);

  useEffect(() => {
    setVisibleToasts(toasts);
  }, [toasts]);

  const handleClose = (id) => {
    setVisibleToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative p-3 shadow-lg border transition-all duration-300 pr-9 backdrop-blur-sm transform hover:scale-[1.02] ${
            toast.type === "success"
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-600/30 shadow-emerald-200/50"
              : toast.type === "error"
                ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white border-rose-600/30 shadow-rose-200/50"
                : toast.type === "warning"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600/30 shadow-amber-200/50"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-indigo-600/30 shadow-blue-200/50"
          }`}
          style={{
            animation: "slideInRight 0.3s ease-out",
            maxWidth: "350px",
            backdropFilter: "blur(10px)",
            borderRadius: "12px 0 12px 0", // Top-left and bottom-right rounded
            borderTopLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          {/* Progress bar - adjusted for new border radius */}
          <div
            className="absolute bottom-0 left-0 h-1 bg-white/20 w-full overflow-hidden"
            style={{
              borderBottomRightRadius: "12px",
              borderBottomLeftRadius: "0px",
            }}
          >
            <div
              className={`h-full ${
                toast.type === "success"
                  ? "bg-emerald-200"
                  : toast.type === "error"
                    ? "bg-rose-200"
                    : toast.type === "warning"
                      ? "bg-amber-200"
                      : "bg-blue-200"
              }`}
              style={{
                animation: "progressBar 3s linear forwards",
                borderBottomRightRadius: "12px",
              }}
            />
          </div>

          {/* Close button */}
          <button
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 text-white/80 hover:text-white"
            onClick={() => handleClose(toast.id)}
            style={{
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "12px",
            }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Toast content */}
          <div className="flex items-start">
            {/* Icon based on toast type - improved contrast */}
            <div
              className={`mr-3 p-1 rounded-full ${
                toast.type === "success"
                  ? "bg-white/30"
                  : toast.type === "error"
                    ? "bg-white/30"
                    : toast.type === "warning"
                      ? "bg-white/30"
                      : "bg-white/30"
              }`}
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                {toast.type === "success" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                ) : toast.type === "error" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : toast.type === "warning" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
            </div>

            <p className="font-semibold text-sm leading-tight py-0.5 flex-1">{toast.message}</p>
          </div>
        </div>
      ))}

      {/* CSS animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes progressBar {
          from {
            width: 100%;
            border-bottom-right-radius: 12px;
          }
          to {
            width: 0%;
            border-bottom-right-radius: 12px;
          }
        }
      `}</style>
    </div>
  );
};
