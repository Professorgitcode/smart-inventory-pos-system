import React from "react";
import theme from "../../../theme/theme";

export const LoadingSpinner = ({
  size = "md", // sm, md, lg
  isDark = false,
  label,
  style = {},
  ...props
}) => {
  const mode = theme.getMode(isDark);

  const getDimensions = () => {
    switch (size) {
      case "sm": return "20px";
      case "lg": return "48px";
      case "md":
      default: return "32px";
    }
  };

  const spinnerSize = getDimensions();

  const spinnerStyles = {
    width: spinnerSize,
    height: spinnerSize,
    border: `3px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(52, 114, 156, 0.15)"}`,
    borderTopColor: mode.colors.primary,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    ...style,
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: mode.spacing.sm, fontFamily: mode.typography.fontFamily.primary }} {...props}>
      <div style={spinnerStyles} />
      {label && <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.textMuted, fontWeight: mode.typography.fontWeight.medium }}>{label}</span>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};