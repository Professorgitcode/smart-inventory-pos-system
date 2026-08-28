import React, { forwardRef, useState } from "react";
import theme from "../../../theme/theme";
import { ChevronDown } from "lucide-react";

export const Select = forwardRef(({
  label,
  options = [], // Array of { value, label }
  helperText,
  errorText,
  disabled = false,
  isDark = false,
  style = {},
  onFocus,
  onBlur,
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const mode = theme.getMode(isDark);
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const wrapperStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
  };

  const selectStyles = {
    width: "100%",
    padding: `10px ${mode.spacing.md}`,
    paddingRight: "40px",
    fontSize: mode.typography.fontSize.sm,
    fontFamily: mode.typography.fontFamily.primary,
    color: mode.colors.text,
    backgroundColor: mode.colors.surface,
    border: `1px solid ${errorText ? mode.colors.danger : isFocused ? mode.colors.primary : mode.colors.border}`,
    borderRadius: mode.radius.md,
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    boxShadow: isFocused ? `0 0 0 3px ${mode.colors.secondary}40` : "none",
    transition: mode.animations.transition.base,
    cursor: disabled ? "not-allowed" : "pointer",
    ...style,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: mode.spacing.xxs, width: "100%", opacity: disabled ? 0.6 : 1 }}>
      {label && <label htmlFor={selectId} style={{ fontSize: mode.typography.fontSize.xs, fontWeight: mode.typography.fontWeight.semibold, color: mode.colors.text, textTransform: "uppercase" }}>{label}</label>}
      <div style={wrapperStyles}>
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          style={selectStyles}
          onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: mode.colors.surface, color: mode.colors.text }}>
              {opt.label}
            </option>
          ))}
        </select>
        <div style={{ position: "absolute", right: "12px", color: mode.colors.textMuted, pointerEvents: "none", display: "flex" }}>
          <ChevronDown size={18} />
        </div>
      </div>
      {errorText ? (
        <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.danger, fontWeight: mode.typography.fontWeight.medium }}>{errorText}</span>
      ) : (
        helperText && <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.textMuted }}>{helperText}</span>
      )}
    </div>
  );
});

Select.displayName = "Select";