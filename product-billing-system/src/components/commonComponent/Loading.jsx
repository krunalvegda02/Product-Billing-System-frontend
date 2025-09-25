import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { THEME } from "../../constants/Theme";

const Loading = ({ 
  color = null, // Allow overriding with custom color
  currentTheme = THEME.GENERAL 
}) => {
  const { theme } = useTheme();
  
  // Use provided color or fallback to theme's accent color
  const dotColor = color || theme.BG_ACCENT;

  return (
    <div className="flex items-center justify-center space-x-2 h-16">
      <span className={`w-3 h-3 ${dotColor} rounded-full animate-bounce`}></span>
      <span className={`w-3 h-3 ${dotColor} rounded-full animate-bounce [animation-delay:-0.2s]`}></span>
      <span className={`w-3 h-3 ${dotColor} rounded-full animate-bounce [animation-delay:-0.4s]`}></span>
    </div>
  );
};

export default Loading;