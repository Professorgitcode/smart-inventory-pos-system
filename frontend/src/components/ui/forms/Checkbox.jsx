import React, { useState } from "react";
import theme from "../../../theme/theme";
import { Check } from "lucide-react";

export const Checkbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  isDark = false,
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mode = theme.getMode(isDark);
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const boxStyles = {
    width: "18px",
    height: "18px",
    borderRadius: "4px",
    border: `2px solid ${checked ? mode.colors.primary : isHovered ? mode.colors.borderHover : mode.colors.border}`,
    backgroundColor: checked ? mode.colors.primary : mode.colors.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: mode.colors.textInverse,
    boxShadow: isFocused ? `0 0 0 3px ${mode.colors.secondary}40` : "none",
    transition: mode.animations.transition.base,
  };

  return (
    <label
      htmlFor={checkboxId}
      style={{ display: "inline-flex", alignItems: "center", gap: mode.spacing.sm, cursor: disabled ? "not-allowed" : "pointer", userSelect: "none", opacity: disabled ? 0.6 : 1, fontFamily: mode.typography.fontFamily.primary }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0, margin: 0 }}
        {...props}
      />
      <div style={boxStyles}>
        {checked && <Check size={14} strokeWidth={3} />}
      </div>
      {label && <span style={{ fontSize: mode.typography.fontSize.sm, color: mode.colors.text, fontWeight: mode.typography.fontWeight.medium }}>{label}</span>}
    </label>
  );
};