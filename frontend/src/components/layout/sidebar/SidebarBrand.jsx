import React from "react";
import { useSidebar } from "./SidebarContext";

const SidebarBrand = ({ theme }) => {
  const { isCollapsed } = useSidebar();
  const { colors, spacing, typography } = theme;

  return (
    <div
      style={{
        marginBottom: spacing.md,
        paddingBottom: spacing.md,
        paddingLeft: isCollapsed ? "0" : "12px",
        borderBottom: `1px solid ${colors.borderLight || "rgba(255, 255, 255, 0.06)"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: isCollapsed ? "center" : "flex-start",
        transition: "all 0.3s ease",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: colors.textPrimary || "#ffffff",
          fontSize: isCollapsed ? typography.fontSize.md : typography.fontSize.xl || "18px",
          fontWeight: typography.fontWeight.extrabold,
          letterSpacing: typography.letterSpacing.tight,
          fontFamily: typography.fontFamily.primary,
          transition: "font-size 0.3s ease",
        }}
      >
        {isCollapsed ? "SIA" : "Smart Inventory AI"}
      </h2>
      
      {/* Hide the subtitle smoothly when the sidebar collapses */}
      {!isCollapsed && (
        <p
          style={{
            margin: `${spacing.xs || "4px"} 0 0 0`,
            color: colors.primary || "#34729C",
            fontSize: typography.fontSize.xs || "11px",
            fontWeight: typography.fontWeight.semibold,
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontFamily: typography.fontFamily.primary,
          }}
        >
          Enterprise Suite
        </p>
      )}
    </div>
  );
};

export default SidebarBrand;