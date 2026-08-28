import React from "react";

const PageGrid = ({
  children,
  columns = "repeat(auto-fit,minmax(300px,1fr))"
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gap: "20px"
      }}
    >
      {children}
    </div>
  );
};

export default PageGrid;