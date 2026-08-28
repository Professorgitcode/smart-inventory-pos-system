import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import themeSystem from "../theme/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = useMemo(() => {
    return themeSystem.getMode(isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);