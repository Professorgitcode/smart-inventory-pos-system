import React from "react";
import { Calendar } from "lucide-react";

const StatisticsOverview = ({ theme, items = [], lastUpdated }) => {
  const formattedTimestamp = lastUpdated
    ? lastUpdated.toLocaleString()
    : "—";

  return (
    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius?.xl || "24px",
        padding: "28px",
        boxShadow: theme.shadows?.sm || "none",
        marginBottom: "32px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "24px"
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
          <h3
            style={{
              margin: 0,
              fontSize: theme.typography?.fontSize?.lg || "16px",
              fontWeight: theme.typography?.fontWeight?.bold || "700",
              color: theme.colors.text,
              letterSpacing: "0.2px"
            }}
          >
            Statistics Overview
          </h3>
          <span
            style={{
              fontSize: "0.8rem",
              color: theme.colors.primary || "#3b82f6",
              fontWeight: "500"
            }}
          >
            Real-time monitoring of inventory health and stock synchronization across the Smart Inventory AI Enterprise Suite
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            color: theme.colors.textMuted,
            whiteSpace: "nowrap"
          }}
        >
          <Calendar size={14} />
          Last updated: {formattedTimestamp}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${items.length || 1}, 1fr)`,
          gap: "20px"
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius?.lg || "16px",
              padding: "20px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: theme.colors.textMuted
                }}
              >
                {item.label}
              </span>
              <div style={{ color: item.color }}>{item.icon}</div>
            </div>

            <div
              style={{
                marginTop: "12px",
                fontSize: "1.6rem",
                fontWeight: "800",
                color: theme.colors.text
              }}
            >
              {item.value ?? 0}
            </div>

            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "4px",
                backgroundColor: item.color,
                borderBottomLeftRadius: theme.radius?.lg || "16px",
                borderBottomRightRadius: theme.radius?.lg || "16px"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsOverview;
