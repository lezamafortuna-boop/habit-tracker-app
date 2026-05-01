import React, { createContext, useContext, useState } from "react";
import { LayoutAnimation } from "react-native";
import { darkTheme, lightTheme } from "../constants/theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  function toggleTheme() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTheme((prev) => (prev.mode === "light" ? darkTheme : lightTheme));
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
