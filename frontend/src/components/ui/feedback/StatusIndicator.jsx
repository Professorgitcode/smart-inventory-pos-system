import React from "react";
import theme from "../../../theme/theme";

export const StatusIndicator = ({
  label,
  status = "info", // success, warning, danger, info
  isDark = false,
  pulse = false,
  style = {},
  ...props
}) => {
  const mode = theme.getMode(isDark);

  const getStatusColor = () => {
    switch (status) {
      case "success": return mode.colors.success;
      case "warning": return mode.colors.warning;
      case "danger": return mode.colors.danger;
      case "info":
      default: return mode.colors.info;
    }
  };

  const dotColor = getStatusColor();

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: mode.spacing.xs, fontFamily: mode.typography.fontFamily.primary, ...style }} {...props}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {pulse && (
          <div style={{
            position: "absolute", width: "8px", height: "8px", borderRadius: "50%",
            backgroundColor: dotColor, animation: "pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            zIndex: 1
          }} />
        )}
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: dotColor, zIndex: 2 }} />
      </div>
      {label && <span style={{ fontSize: mode.typography.fontSize.sm, color: mode.colors.text, fontWeight: mode.typography.fontWeight.medium }}>{label}</span>}
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};