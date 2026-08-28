import React from "react";
import { Search } from "lucide-react";
import { useSidebar } from "./SidebarContext";

const SidebarSearch = ({ theme }) => {
  const { searchTerm, setSearchTerm, isCollapsed } = useSidebar();
  const { colors, radius, spacing, typography } = theme;

  return (
    <div style={{ marginBottom: spacing.sm || "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isCollapsed ? "0" : "10px",
          justifyContent: isCollapsed ? "center" : "flex-start",
          background: colors.surfaceLight || "rgba(255, 255, 255, 0.04)",
          border: `1px solid ${colors.borderLight || "rgba(255, 255, 255, 0.06)"}`,
          borderRadius: radius.md || "8px",
          padding: isCollapsed ? "10px 0" : "8px 12px",
          transition: "all 0.3s ease",
          cursor: isCollapsed ? "pointer" : "text",
        }}
        // Optional: If collapsed and they click the icon, you might want to auto-expand
        // onClick={() => isCollapsed && toggleCollapse()}
      >
        <Search 
          size={14} 
          color={colors.textMuted || "rgba(255, 255, 255, 0.4)"} 
          style={{ flexShrink: 0 }}
        />
        
        {!isCollapsed && (
          <input
            type="text"
            placeholder="Search menu shortcuts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: colors.textPrimary || "#ffffff",
              fontSize: typography.fontSize.xs || "12px",
              fontFamily: typography.fontFamily.primary,
              width: "100%",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SidebarSearch;