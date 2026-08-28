import React, { forwardRef, useState } from "react";
import theme from "../../../theme/theme";

export const Button = forwardRef(({
  children,
  variant = "primary", // primary, secondary, ghost, outline, danger, success, warning, info, icon, floating
  size = "md",         // sm, md, lg
  isDark = false,
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left", // left, right
  style = {},
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const mode = theme.getMode(isDark);
  const isDisabled = disabled || isLoading;

  // Variant Style Mappings
  const getVariantStyles = () => {
    const v = variant;
    if (v === "primary") {
      return {
        background: isHovered ? mode.colors.primaryDark : mode.colors.primary,
        color: mode.colors.textInverse,
        border: "1px solid transparent",
        boxShadow: isHovered ? mode.shadows.md : mode.shadows.sm,
      };
    }
    if (v === "secondary") {
      return {
        background: isHovered ? mode.colors.primaryLight : "rgba(108, 177, 218, 0.15)",
        color: isDark ? mode.colors.text : mode.colors.primaryDark,
        border: "1px solid transparent",
      };
    }
    if (v === "outline") {
      return {
        background: isHovered ? "rgba(52, 114, 156, 0.05)" : "transparent",
        color: mode.colors.primary,
        border: `1px solid ${isHovered ? mode.colors.primary : mode.colors.border}`,
      };
    }
    if (v === "ghost") {
      return {
        background: isHovered ? "rgba(52, 114, 156, 0.08)" : "transparent",
        color: mode.colors.text,
        border: "1px solid transparent",
      };
    }
    if (v === "danger") {
      return {
        background: isHovered ? mode.colors.danger : mode.colors.dangerBg,
        color: isHovered ? mode.colors.textInverse : mode.colors.danger,
        border: "1px solid transparent",
      };
    }
    if (v === "success") {
      return {
        background: isHovered ? mode.colors.success : mode.colors.successBg,
        color: isHovered ? mode.colors.textInverse : mode.colors.success,
        border: "1px solid transparent",
      };
    }
    if (v === "warning") {
      return {
        background: isHovered ? mode.colors.warning : mode.colors.warningBg,
        color: isHovered ? mode.colors.textInverse : mode.colors.warning,
        border: "1px solid transparent",
      };
    }
    if (v === "info") {
      return {
        background: isHovered ? mode.colors.info : mode.colors.infoBg,
        color: isHovered ? mode.colors.textInverse : mode.colors.info,
        border: "1px solid transparent",
      };
    }
    if (v === "icon") {
      return {
        background: isHovered ? "rgba(52, 114, 156, 0.08)" : "transparent",
        color: mode.colors.text,
        border: "1px solid transparent",
        borderRadius: mode.radius.full,
        padding: mode.spacing.xs,
      };
    }
    if (v === "floating") {
      return {
        background: mode.colors.primary,
        color: mode.colors.textInverse,
        border: "1px solid transparent",
        borderRadius: mode.radius.full,
        boxShadow: mode.shadows.lg,
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      };
    }
    return {};
  };

  // Size Mappings
  const getSizeStyles = () => {
    if (variant === "icon") return {};
    switch (size) {
      case "sm":
        return { padding: "6px 12px", fontSize: mode.typography.fontSize.xs };
      case "lg":
        return { padding: "14px 28px", fontSize: mode.typography.fontSize.md };
      case "md":
      default:
        return { padding: "10px 20px", fontSize: mode.typography.fontSize.sm };
    }
  };

  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: mode.spacing.xs,
    fontFamily: mode.typography.fontFamily.primary,
    fontWeight: mode.typography.fontWeight.semibold,
    borderRadius: mode.radius.md,
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,
    outline: "none",
    boxShadow: isFocused ? `0 0 0 3px ${mode.colors.secondary}80` : "none",
    transition: mode.animations.transition.base,
    userSelect: "none",
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...style,
  };

  return (
    <button
      ref={ref}
      style={baseStyles}
      disabled={isDisabled}
      onMouseEnter={(e) => { setIsHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setIsHovered(false); onMouseLeave?.(e); }}
      onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span style={{
          width: "14px", height: "14px",
          border: `2px solid currentColor`,
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.6s linear infinite",
          marginRight: children ? "4px" : "0"
        }} />
      )}
      
      {!isLoading && Icon && iconPosition === "left" && <Icon size={size === "sm" ? 14 : 18} />}
      {variant !== "icon" && children}
      {!isLoading && Icon && iconPosition === "right" && <Icon size={size === "sm" ? 14 : 18} />}
      
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
});

Button.displayName = "Button";