import React, { forwardRef, useState } from "react";
import theme from "../../../theme/theme";

export const Input = forwardRef(({
  label,
  helperText,
  errorText,
  successText,
  disabled = false,
  isDark = false,
  icon: Icon,
  style = {},
  onFocus,
  onBlur,
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const mode = theme.getMode(isDark);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const hasError = !!errorText;
  const hasSuccess = !!successText;

  const getBorderColor = () => {
    if (hasError) return mode.colors.danger;
    if (hasSuccess) return mode.colors.success;
    if (isFocused) return mode.colors.primary;
    return mode.colors.border;
  };

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: mode.spacing.xxs,
    fontFamily: mode.typography.fontFamily.primary,
    width: "100%",
    opacity: disabled ? 0.6 : 1,
  };

  const labelStyles = {
    fontSize: mode.typography.fontSize.xs,
    fontWeight: mode.typography.fontWeight.semibold,
    color: hasError ? mode.colors.danger : mode.colors.text,
    letterSpacing: mode.typography.letterSpacing.wide,
    textTransform: "uppercase",
  };

  const inputWrapperStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
  };

  const inputStyles = {
    width: "100%",
    padding: `10px ${mode.spacing.md}`,
    paddingLeft: Icon ? "38px" : mode.spacing.md,
    fontSize: mode.typography.fontSize.sm,
    fontFamily: mode.typography.fontFamily.primary,
    color: mode.colors.text,
    backgroundColor: mode.colors.surface,
    border: `1px solid ${getBorderColor()}`,
    borderRadius: mode.radius.md,
    outline: "none",
    boxShadow: isFocused ? `0 0 0 3px ${hasError ? mode.colors.dangerBg : mode.colors.secondary}40` : "none",
    transition: mode.animations.transition.base,
    cursor: disabled ? "not-allowed" : "text",
    ...style,
  };

  return (
    <div style={containerStyles}>
      {label && <label htmlFor={inputId} style={labelStyles}>{label}</label>}
      <div style={inputWrapperStyles}>
        {Icon && (
          <div style={{ position: "absolute", left: "12px", color: isFocused ? mode.colors.primary : mode.colors.textMuted, display: "flex" }}>
            <Icon size={18} />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          style={inputStyles}
          aria-invalid={hasError}
          onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
          {...props}
        />
      </div>
      {errorText && <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.danger, fontWeight: mode.typography.fontWeight.medium }}>{errorText}</span>}
      {successText && !errorText && <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.success, fontWeight: mode.typography.fontWeight.medium }}>{successText}</span>}
      {helperText && !errorText && !successText && <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.textMuted }}>{helperText}</span>}
    </div>
  );
});

Input.displayName = "Input";