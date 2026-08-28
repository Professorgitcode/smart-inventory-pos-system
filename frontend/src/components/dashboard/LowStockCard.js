import React from "react";

const LowStockCard = ({ theme }) => {

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
        Low Stock
      </h3>

      <p style={{ color: theme.colors.textMuted }}>
        Samsung Charger — 5 left
      </p>

      <p style={{ color: theme.colors.textMuted }}>
        iPhone 13 Case — 3 left
      </p>

      <p style={{ color: theme.colors.textMuted }}>
        USB-C Cable — 7 left
      </p>

    </div>

  );

};

export default LowStockCard;