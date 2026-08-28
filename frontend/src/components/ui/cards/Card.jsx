import React, { useState } from "react";
import theme from "../../../theme/theme";

export const Card = ({
  children,
  isDark = false,
  variant = "standard", // standard, glass, flat
  isHoverable = false,
  padding = "lg",       // sm, md, lg, xl
  style = {},
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const mode = theme.getMode(isDark);

  const getVariantStyles = () => {
    if (variant === "glass") {
      return {
        background: isDark 
          ? "rgba(18, 26, 47, 0.65)" 
          : "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.4)"}`,
        boxShadow: isHovered && isHoverable ? mode.shadows.xl : mode.shadows.glass,
        borderRadius: mode.radius.xxl,
      };
    }
    if (variant === "flat") {
      return {
        background: mode.colors.surfaceHover,
        border: `1px solid ${mode.colors.border}`,
        borderRadius: mode.radius.lg,
      };
    }
    // Standard Card
    return {
      background: mode.colors.surface,
      border: `1px solid ${mode.colors.border}`,
      boxShadow: isHovered && isHoverable ? mode.shadows.lg : mode.shadows.sm,
      borderRadius: mode.radius.lg,
    };
  };

  const cardStyles = {
    padding: mode.spacing[padding] || mode.spacing.lg,
    transform: isHovered && isHoverable ? "translateY(-4px)" : "translateY(0)",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    fontFamily: mode.typography.fontFamily.primary,
    color: mode.colors.text,
    ...getVariantStyles(),
    ...style,
  };

  return (
    <div
      style={cardStyles}
      onMouseEnter={() => isHoverable && setIsHovered(true)}
      onMouseLeave={() => isHoverable && setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};