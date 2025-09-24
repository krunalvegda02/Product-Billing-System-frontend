// LoginView.jsx (alternative approach)
import React from "react";
import { useTheme } from "../../../hooks/useTheme";

const LoginView = ({ loginData, handleChange, submitClick }) => {
  const { theme } = useTheme(); // Use hook directly in view component

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.BACKGROUND_GRADIENT} p-4`}>
      <div className={`max-w-md w-full ${theme.MODAL_BG} rounded-2xl ${theme.SHADOW} p-8`}>
        {/* ... rest of the component */}
      </div>
    </div>
  );
};

export default LoginView;