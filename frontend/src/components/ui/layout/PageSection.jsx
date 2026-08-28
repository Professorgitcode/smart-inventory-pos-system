import React from "react";

const PageSection = ({ theme, children }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {children}
    </section>
  );
};

export default PageSection;