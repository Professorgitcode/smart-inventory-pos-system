import React, { forwardRef, useState } from "react";
import theme from "../../../theme/theme";

export const TextArea = forwardRef(({
  label,
  helperText,
  errorText,
  disabled = false,
  isDark = false,
  style = {},
  onFocus,
  onBlur,
  id,
  rows = 4,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const mode = theme.getMode(isDark);
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const textareaStyles = {
    width: "100%",
    padding: mode.spacing.md,
    fontSize: mode.typography.fontSize.sm,
    fontFamily: mode.typography.fontFamily.primary,
    color: mode.colors.text,
    backgroundColor: mode.colors.surface,
    border: `1px solid ${errorText ? mode.colors.danger : isFocused ? mode.colors.primary : mode.colors.border}`,
    borderRadius: mode.radius.md,
    outline: "none",
    resize: "vertical",
    boxShadow: isFocused ? `0 0 0 3px ${errorText ? mode.colors.dangerBg : mode.colors.secondary}40` : "none",
    transition: mode.animations.transition.base,
    cursor: disabled ? "not-allowed" : "text",
    ...style,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: mode.spacing.xxs, width: "100%", opacity: disabled ? 0.6 : 1 }}>
      {label && <label htmlFor={textareaId} style={{ fontSize: mode.typography.fontSize.xs, fontWeight: mode.typography.fontWeight.semibold, color: errorText ? mode.colors.danger : mode.colors.text, textTransform: "uppercase" }}>{label}</label>}
      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        disabled={disabled}
        style={textareaStyles}
        onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
        {...props}
      />
      {errorText ? (
        <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.danger, fontWeight: mode.typography.fontWeight.medium }}>{errorText}</span>
      ) : (
        helperText && <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.textMuted }}>{helperText}</span>
      )}
    </div>
  );
});

TextArea.displayName = "TextArea";