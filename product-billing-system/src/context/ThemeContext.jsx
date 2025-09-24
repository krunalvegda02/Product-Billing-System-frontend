// ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { THEME, THEME_CONFIG } from '../constants/Theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(THEME.GENERAL);

  const value = {
    theme: THEME_CONFIG[currentTheme],
    currentTheme,
    setCurrentTheme,
    THEME // Export THEME enum for easy access
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};