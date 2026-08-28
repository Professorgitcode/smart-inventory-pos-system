import React from "react";
import theme from "../../../theme/theme";
import { CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";

export const Alert = ({
  title,
  children,
  variant = "info", // success, warning, danger, info
  isDark = false,
  style = {},
  ...props
}) => {
  const mode = theme.getMode(isDark);

  const getVariantStyles = () => {
    switch (variant) {
      case "success": return { backgroundColor: mode.colors.successBg, border: `1px solid ${mode.colors.success}30`, color: mode.colors.text };
      case "warning": return { backgroundColor: mode.colors.warningBg, border: `1px solid ${mode.colors.warning}30`, color: mode.colors.text };
      case "danger": return { backgroundColor: mode.colors.dangerBg, border: `1px solid ${mode.colors.danger}30`, color: mode.colors.text };
      case "info":
      default: return { backgroundColor: mode.colors.infoBg, border: `1px solid ${mode.colors.info}30`, color: mode.colors.text };
    }
  };

  const getIcon = () => {
    const size = 18;
    switch (variant) {
      case "success": return <CheckCircle size={size} color={mode.colors.success} />;
      case "warning": return <AlertTriangle size={size} color={mode.colors.warning} />;
      case "danger": return <AlertCircle size={size} color={mode.colors.danger} />;
      case "info":
      default: return <Info size={size} color={mode.colors.info} />;
    }
  };

  const alertStyles = {
    display: "flex",
    gap: mode.spacing.sm,
    padding: mode.spacing.md,
    borderRadius: mode.radius.lg,
    fontFamily: mode.typography.fontFamily.primary,
    lineHeight: mode.typography.lineHeight.normal,
    ...getVariantStyles(),
    ...style,
  };

  return (
    <div style={alertStyles} {...props}>
      <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-start", marginTop: "1px" }}>{getIcon()}</div>
      <div style={{ flexGrow: 1 }}>
        {title && <div style={{ fontSize: mode.typography.fontSize.sm, fontWeight: mode.typography.fontWeight.bold, color: mode.colors.text, marginBottom: "2px" }}>{title}</div>}
        <div style={{ fontSize: mode.typography.fontSize.sm, color: mode.colors.text }}>{children}</div>
      </div>
    </div>
  );
};