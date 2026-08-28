import React from "react";
import theme from "../../../theme/theme";

export const Badge = ({
  children,
  variant = "info", // success, warning, danger, info, primary
  isDark = false,
  style = {},
  ...props
}) => {
  const mode = theme.getMode(isDark);

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return { backgroundColor: mode.colors.successBg, color: mode.colors.success };
      case "warning":
        return { backgroundColor: mode.colors.warningBg, color: mode.colors.warning };
      case "danger":
        return { backgroundColor: mode.colors.dangerBg, color: mode.colors.danger };
      case "primary":
        return { backgroundColor: isDark ? "rgba(131, 135, 195, 0.15)" : "rgba(52, 114, 156, 0.1)", color: mode.colors.primary };
      case "info":
      default:
        return { backgroundColor: mode.colors.infoBg, color: mode.colors.info };
    }
  };

  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px",
    borderRadius: mode.radius.sm,
    fontSize: mode.typography.fontSize.xs,
    fontWeight: mode.typography.fontWeight.bold,
    lineHeight: 1,
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    letterSpacing: mode.typography.letterSpacing.wider,
    fontFamily: mode.typography.fontFamily.primary,
    ...getVariantStyles(),
    ...style,
  };

  return (
    <span style={baseStyles} {...props}>
      {children}
    </span>
  );
};