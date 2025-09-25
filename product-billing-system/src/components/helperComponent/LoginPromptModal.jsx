import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/RouteNames";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";

const LoginPromptModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  // Get current theme from Redux store
  const { theme } = useTheme();

  if (!open) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${theme.MODAL_OVERLAY} z-50 p-4`}>
      <div className={`${theme.MODAL_BG} p-8 rounded-2xl w-full max-w-md relative overflow-hidden border ${theme.FONT_PRIMARY}`}>
        {/* Decorative elements */}
        <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full ${theme.BACKGROUND_GRADIENT} opacity-70`}></div>
        <div className={`absolute -bottom-10 -left-10 w-20 h-20 rounded-full ${theme.BACKGROUND_GRADIENT} opacity-70`}></div>

        {/* Close button */}
        <button onClick={onClose} className={`absolute top-4 right-4 ${theme.ICON_SECONDARY} hover:${theme.TEXT_COLOR} transition-colors`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-full ${theme.BG_ACCENT} flex items-center justify-center ${theme.SHADOW}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h2 className={`text-2xl font-bold text-center mb-3 ${theme.TEXT_COLOR}`}>Authentication Required</h2>
        <p className={`${theme.TEXT_SECONDARY} text-center mb-8`}>Please log in to access this feature and enjoy a personalized experience.</p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onClose} className={`px-6 py-3 rounded-lg font-medium ${theme.BUTTON_SECONDARY} transition-all ${theme.SHADOW} w-full`}>
            Cancel
          </button>
          <button onClick={() => navigate(PATHS.LOGIN)} className={`px-6 py-3 rounded-lg font-medium ${theme.BUTTON} ${theme.SHADOW} w-full`}>
            Login
          </button>
        </div>

        {/* Additional option */}
        <p className={`text-center text-sm ${theme.TEXT_SECONDARY} mt-6`}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate(PATHS.REGISTER)}
            className={`${theme.LINK} font-medium underline px-2 py-1 rounded ${theme === THEME.DARK ? "bg-opacity-20" : "bg-opacity-10"} ${theme.BG_ACCENT} bg-opacity-10`}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPromptModal;
