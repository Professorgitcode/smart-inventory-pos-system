import React from "react";

const SalesChartCard = ({ theme }) => {

  return (

    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 20,
        padding: 25,
        minHeight: 330
      }}
    >

      <h3
        style={{
          marginTop: 0,
          color: theme.colors.text
        }}
      >
        Sales Overview
      </h3>

      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.colors.textMuted
        }}
      >
        Chart will be added here
      </div>

    </div>

  );

};

export default SalesChartCard;