import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "./SidebarContext";
import SidebarBadge from "./SidebarBadge";

const SidebarItem = ({
  icon: Icon,
  label,
  route,
  badge,
  badgeVariant,
  disabled = false,
  theme
}) => {
  const { searchTerm, isCollapsed } = useSidebar();
  const { colors, radius, typography } = theme;
  const [isHovered, setIsHovered] = useState(false);

  // Filter out item if it doesn't match the current search term
  if (searchTerm && !label.toLowerCase().includes(searchTerm.toLowerCase())) {
    return null;
  }

  // Shared structural styles for both active and disabled states
  const baseStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: isCollapsed ? "center" : "flex-start",
    gap: isCollapsed ? "0" : "12px",
    padding: isCollapsed ? "10px 0" : "10px 14px",
    margin: "2px 0",
    borderRadius: radius.md || "8px",
    textDecoration: "none",
    fontSize: typography.fontSize.sm || "14px",
    fontFamily: typography.fontFamily.primary,
    transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
    userSelect: "none",
  };

  // 1. Placeholder / Disabled / Coming Soon State
  if (disabled || !route) {
    return (
      <div
        style={{
          ...baseStyles,
          color: colors.textMuted || "rgba(255, 255, 255, 0.35)",
          cursor: "not-allowed",
        }}
      >
        <Icon size={18} style={{ opacity: 0.5, flexShrink: 0 }} />
        
        {!isCollapsed && (
          <>
            <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {label}
            </span>
            {badge && (
              <SidebarBadge text={badge} variant={badgeVariant || "neutral"} theme={theme} />
            )}
          </>
        )}
      </div>
    );
  }

  // 2. Functional Navigable State
  return (
    <NavLink
      to={route}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={({ isActive }) => ({
        ...baseStyles,
        color: isActive 
          ? (colors.textPrimary || "#ffffff") 
          : (colors.textSecondary || "rgba(255, 255, 255, 0.7)"),
        backgroundColor: isActive 
          ? (colors.activeBackground || "rgba(255, 255, 255, 0.08)") 
          : isHovered 
            ? "rgba(255, 255, 255, 0.04)" 
            : "transparent",
        fontWeight: isActive 
          ? typography.fontWeight.semibold 
          : typography.fontWeight.medium,
        // Smooth slide-in effect on hover, disabled if collapsed or active
        transform: isHovered && !isActive && !isCollapsed ? "translateX(4px)" : "translateX(0)",
      })}
    >
      {({ isActive }) => (
        <>
          {/* Subtle Left Accent Core for Active State */}
          {isActive && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "25%",
                height: "50%",
                width: "3px",
                backgroundColor: colors.secondary || colors.primary || "#3b82f6",
                borderRadius: "0 4px 4px 0",
              }}
            />
          )}

          <Icon 
            size={18} 
            style={{ 
              opacity: isActive ? 1 : 0.85, 
              flexShrink: 0,
              transition: "opacity 0.2s ease"
            }} 
          />
          
          {!isCollapsed && (
            <>
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {label}
              </span>

              {badge && (
                <SidebarBadge 
                  text={badge} 
                  variant={badgeVariant || "primary"} 
                  theme={theme} 
                />
              )}
            </>
          )}
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;