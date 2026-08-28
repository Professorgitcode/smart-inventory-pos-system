import React from "react";
import theme from "../../../theme/theme";
import { Inbox } from "lucide-react";

export const EmptyState = ({
  title = "No records found",
  description = "Get started by creating a new transactional instance or adjusting your system filters.",
  icon: Icon = Inbox,
  action,
  isDark = false,
  style = {},
  ...props
}) => {
  const mode = theme.getMode(isDark);

  const baseStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: mode.spacing.huge,
    backgroundColor: mode.colors.surface,
    border: `1px dashed ${mode.colors.border}`,
    borderRadius: mode.radius.xxl,
    fontFamily: mode.typography.fontFamily.primary,
    maxWidth: "520px",
    margin: "0 auto",
    ...style,
  };

  return (
    <div style={baseStyles} {...props}>
      <div style={{ 
        width: "64px", 
        height: "64px", 
        borderRadius: mode.radius.xl, 
        backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(52, 114, 156, 0.08)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        color: mode.colors.primary,
        marginBottom: mode.spacing.lg
      }}>
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: mode.typography.fontSize.md, fontWeight: mode.typography.fontWeight.bold, color: mode.colors.text, margin: `0 0 ${mode.spacing.xs} 0` }}>
        {title}
      </h3>
      <p style={{ fontSize: mode.typography.fontSize.sm, color: mode.colors.textMuted, margin: `0 0 ${mode.spacing.lg} 0`, lineHeight: mode.typography.lineHeight.normal }}>
        {description}
      </p>
      {action && <div style={{ display: "flex", justifyContent: "center" }}>{action}</div>}
    </div>
  );
};