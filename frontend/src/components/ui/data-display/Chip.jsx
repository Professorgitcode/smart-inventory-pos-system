import React, { useState } from "react";
import theme from "../../../theme/theme";
import { X } from "lucide-react";

export const Chip = ({
  label,
  onDelete,
  icon: Icon,
  isDark = false,
  style = {},
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const mode = theme.getMode(isDark);

  const chipStyles = {
    display: "inline-flex",
    alignItems: "center",
    gap: mode.spacing.xxs,
    padding: `4px ${mode.spacing.sm}`,
    borderRadius: mode.radius.full,
    backgroundColor: isHovered ? mode.colors.border : mode.colors.surfaceHover,
    border: `1px solid ${mode.colors.border}`,
    color: mode.colors.text,
    fontSize: mode.typography.fontSize.xs,
    fontWeight: mode.typography.fontWeight.medium,
    fontFamily: mode.typography.fontFamily.primary,
    transition: mode.animations.transition.base,
    userSelect: "none",
    cursor: "default",
    ...style,
  };

  return (
    <div
      style={chipStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {Icon && <Icon size={14} style={{ color: mode.colors.textMuted }} />}
      <span>{label}</span>
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          style={{
            background: "none", border: "none", padding: 0, cursor: "pointer",
            display: "flex", alignItems: "center", color: mode.colors.textMuted,
            marginLeft: "2px"
          }}
        >
          <X size={14} style={{ transition: "color 150ms" }} onMouseEnter={(e) => e.target.style.color = mode.colors.danger} onMouseLeave={(e) => e.target.style.color = mode.colors.textMuted} />
        </button>
      )}
    </div>
  );
};