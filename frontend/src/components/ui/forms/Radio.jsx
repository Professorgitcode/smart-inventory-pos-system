import React, { useState } from "react";
import theme from "../../../theme/theme";

export const Radio = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  isDark = false,
  id,
  name,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mode = theme.getMode(isDark);
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  const circleStyles = {
    width: "18px",
    height: "18px",
    borderRadius: mode.radius.full,
    border: `2px solid ${checked ? mode.colors.primary : isHovered ? mode.colors.borderHover : mode.colors.border}`,
    backgroundColor: mode.colors.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: isFocused ? `0 0 0 3px ${mode.colors.secondary}40` : "none",
    transition: mode.animations.transition.base,
  };

  const innerCircleStyles = {
    width: "8px",
    height: "8px",
    borderRadius: mode.radius.full,
    backgroundColor: mode.colors.primary,
    opacity: checked ? 1 : 0,
    transform: checked ? "scale(1)" : "scale(0.5)",
    transition: mode.animations.transition.base,
  };

  return (
    <label
      htmlFor={radioId}
      style={{ display: "inline-flex", alignItems: "center", gap: mode.spacing.sm, cursor: disabled ? "not-allowed" : "pointer", userSelect: "none", opacity: disabled ? 0.6 : 1, fontFamily: mode.typography.fontFamily.primary }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0, margin: 0 }}
        {...props}
      />
      <div style={circleStyles}>
        <div style={innerCircleStyles} />
      </div>
      {label && <span style={{ fontSize: mode.typography.fontSize.sm, color: mode.colors.text, fontWeight: mode.typography.fontWeight.medium }}>{label}</span>}
    </label>
  );
};