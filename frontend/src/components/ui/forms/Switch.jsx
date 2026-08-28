import React, { useState } from "react";
import theme from "../../../theme/theme";

export const Switch = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  isDark = false,
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const mode = theme.getMode(isDark);
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  const trackStyles = {
    width: "40px",
    height: "22px",
    borderRadius: mode.radius.full,
    backgroundColor: checked ? mode.colors.primary : isDark ? mode.colors.border : "#CBD5E1",
    position: "relative",
    transition: mode.animations.transition.base,
    boxShadow: isFocused ? `0 0 0 3px ${mode.colors.secondary}40` : "none",
  };

  const handleStyles = {
    width: "16px",
    height: "16px",
    borderRadius: mode.radius.full,
    backgroundColor: mode.colors.surface,
    position: "absolute",
    top: "3px",
    left: checked ? "21px" : "3px",
    transition: "left 200ms cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: mode.shadows.sm,
  };

  return (
    <label
      htmlFor={switchId}
      style={{ display: "inline-flex", alignItems: "center", gap: mode.spacing.sm, cursor: disabled ? "not-allowed" : "pointer", userSelect: "none", opacity: disabled ? 0.6 : 1, fontFamily: mode.typography.fontFamily.primary }}
    >
      <input
        type="checkbox"
        id={switchId}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0, margin: 0 }}
        {...props}
      />
      <div style={trackStyles}>
        <div style={handleStyles} />
      </div>
      {label && <span style={{ fontSize: mode.typography.fontSize.sm, color: mode.colors.text, fontWeight: mode.typography.fontWeight.medium }}>{label}</span>}
    </label>
  );
};