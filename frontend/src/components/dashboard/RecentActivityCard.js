import React from "react";

const RecentActivityCard = ({ theme }) => {

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
        Recent Activity
      </h3>

      <p style={{ color: theme.colors.textMuted }}>
        New sale completed.
      </p>

      <p style={{ color: theme.colors.textMuted }}>
        Inventory updated.
      </p>

      <p style={{ color: theme.colors.textMuted }}>
        Supplier order approved.
      </p>

    </div>

  );

};

export default RecentActivityCard;