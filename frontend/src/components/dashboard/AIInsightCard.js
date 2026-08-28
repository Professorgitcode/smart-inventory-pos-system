import React from "react";

const AIInsightCard = ({ theme }) => {

  return (

    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 20,
        padding: 25
      }}
    >

      <h3
        style={{
          marginTop: 0,
          color: theme.colors.text
        }}
      >
        AI Insights
      </h3>

      <p style={{ color: theme.colors.textMuted }}>
        • Sales expected to increase by 12% this week.
      </p>

      <p style={{ color: theme.colors.textMuted }}>
        • Smartphones remain the fastest moving products.
      </p>

      <p style={{ color: theme.colors.textMuted }}>
        • Consider restocking charging cables.
      </p>

    </div>

  );

};

export default AIInsightCard;