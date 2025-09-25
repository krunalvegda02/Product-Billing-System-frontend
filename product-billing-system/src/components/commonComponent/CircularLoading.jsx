import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { THEME } from "../../constants/Theme";

const CircularLoading = ({ size = "w-12 h-12", color = null, currentTheme = THEME.GENERAL }) => {
  const { theme } = useTheme(); // Use theme from context

  // Use provided color or fallback to theme's accent color
  const borderColor = color || theme.BORDER_COLOR;

  return (
    <div className="flex items-center justify-center h-16">
      <div className={`${size} border-4 ${borderColor} border-t-transparent border-solid rounded-full animate-spin`}></div>
    </div>
  );
};

export default CircularLoading;
