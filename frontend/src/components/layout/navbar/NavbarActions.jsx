import React from "react";
import { BrainCircuit, Bell, Sun, Moon } from "lucide-react";

const NavbarActions = ({ theme, isDark, toggleTheme, onAiInsightsClick }) => {
  const { colors, spacing, radius, typography } = theme;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: spacing.lg }}>
      <button
        onClick={onAiInsightsClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 18px",
          borderRadius: radius.full,
          border: "none",
          cursor: "pointer",
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
          color: colors.textInverse,
          fontWeight: typography.fontWeight.semibold,
          fontSize: typography.fontSize.sm,
          boxShadow: `0 4px 12px ${colors.primary}40`,
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
      >
        <BrainCircuit size={16} />
        <span>AI Insights</span>
      </button>

      <div style={{ width: "1px", height: "24px", background: isDark ? "rgba(255,255,255,0.1)" : colors.border }} />

      <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
        <button
          style={{
            position: "relative",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bell size={20} color={colors.text} />
          <div
            style={{
              position: "absolute",
              top: "6px",
              right: "8px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: colors.danger,
              border: `2px solid ${isDark ? "#121A2F" : "#ffffff"}`,
            }}
          />
        </button>

        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isDark ? <Sun size={20} color={colors.text} /> : <Moon size={20} color={colors.text} />}
        </button>
      </div>
    </div>
  );
};

export default NavbarActions;