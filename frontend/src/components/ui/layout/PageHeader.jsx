import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export const PageHeader = ({
  title,
  subtitle,
  actions,
  breadcrumbs,
  style = {},
  ...props
}) => {
  // 1. Pull the already-evaluated theme object directly from your context
  const { theme: mode } = useTheme();

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: mode.spacing.xxs,
    paddingBottom: mode.spacing.lg,
    borderBottom: `1px solid ${mode.colors.border}`,
    marginBottom: mode.spacing.xxxl,
    fontFamily: mode.typography.fontFamily.primary,
    ...style,
  };

  return (
    <div style={containerStyles} {...props}>
      {/* Breadcrumbs Row */}
      {breadcrumbs && (
        <div style={{ display: "flex", alignItems: "center", gap: mode.spacing.xs, fontSize: mode.typography.fontSize.xs, color: mode.colors.textMuted, marginBottom: "4px" }}>
          {breadcrumbs}
        </div>
      )}

      {/* Title + Actions Layout */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: mode.spacing.md }}>
        <div style={{ flex: 1, minWidth: "240px" }}>
          <h1 style={{ fontSize: mode.typography.fontSize.xxl, fontWeight: mode.typography.fontWeight.extrabold, color: mode.colors.text, margin: 0, letterSpacing: mode.typography.letterSpacing.tight }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: mode.typography.fontSize.sm, color: mode.colors.textMuted, margin: `${mode.spacing.xxs} 0 0 0`, lineHeight: mode.typography.lineHeight.normal }}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: "flex", alignItems: "center", gap: mode.spacing.sm, flexShrink: 0 }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;