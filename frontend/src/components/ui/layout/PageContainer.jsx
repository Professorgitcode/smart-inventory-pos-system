import React from "react";

const PageContainer = ({ theme, children }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "8px 0",
        color: theme.colors.text,
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;