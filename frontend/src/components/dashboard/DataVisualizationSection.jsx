import React, { useState } from "react";

const TABS = ["Overview", "Trends", "Details"];

const DataVisualizationSection = ({
  theme,
  overviewContent,
  trendsContent,
  detailsContent
}) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const content =
    activeTab === "Overview"
      ? overviewContent
      : activeTab === "Trends"
      ? trendsContent
      : detailsContent;

  return (
    <div style={{ marginBottom: "32px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "700",
            color: theme.colors.text
          }}
        >
          Data Visualization
        </h2>

        <div
          style={{
            display: "flex",
            gap: "4px",
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius?.md || "12px",
            padding: "4px"
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: theme.radius?.sm || "8px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  backgroundColor: isActive
                    ? theme.colors.primary || "#3b82f6"
                    : "transparent",
                  color: isActive ? "#ffffff" : theme.colors.textMuted,
                  transition: "all 0.15s ease"
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {content}
    </div>
  );
};

export default DataVisualizationSection;
