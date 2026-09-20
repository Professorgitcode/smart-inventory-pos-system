import React from "react";
import { useTheme } from "../../../context/ThemeContext";

const PageContainer = ({ children, style }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;