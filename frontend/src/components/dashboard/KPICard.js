import React from "react";

const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  theme,
  color
}) => {

  return (

    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 18,
        padding: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "0.25s",
        boxShadow: shadows.lgs.md
      }}
    >

      <div>

        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: theme.colors.textMuted
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: "10px 0",
            fontSize: 30,
            color: theme.colors.text
          }}
        >
          {value}
        </h2>

        <small
          style={{
            color: theme.colors.textMuted
          }}
        >
          {subtitle}
        </small>

      </div>

      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: color
        }}
      >
        <Icon
          size={28}
          color="#fff"
        />
      </div>

    </div>

  );

};

export default KPICard;