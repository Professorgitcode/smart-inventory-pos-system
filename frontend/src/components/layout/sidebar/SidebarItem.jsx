// ====================================
// SIDEBAR ITEM
// ====================================
//
// Supports two interaction modes:
//
// 1. Navigation
//    route + NavLink
//
// 2. Action
//    onClick + button
//
// This keeps the sidebar presentation
// reusable without forcing actions to
// become application routes.
// ====================================

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useSidebar } from "./SidebarContext";
import SidebarBadge from "./SidebarBadge";

// ====================================
// COMPONENT
// ====================================

const SidebarItem = ({
  icon: Icon,
  label,
  route,
  onClick,
  badge,
  badgeVariant,
  disabled = false,
  theme
}) => {
  const {
    searchTerm,
    isCollapsed
  } = useSidebar();

  const {
    colors,
    radius,
    typography
  } = theme;

  const [isHovered, setIsHovered] =
    useState(false);

  // ====================================
  // SEARCH FILTER
  // ====================================

  if (
    searchTerm &&
    !label
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ) {
    return null;
  }

  // ====================================
  // SHARED STYLES
  // ====================================

  const baseStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: isCollapsed
      ? "center"
      : "flex-start",
    gap: isCollapsed
      ? "0"
      : "12px",
    width: "100%",
    padding: isCollapsed
      ? "10px 0"
      : "10px 14px",
    margin: "2px 0",
    borderRadius:
      radius.md || "8px",
    border: "none",
    textDecoration: "none",
    fontSize:
      typography.fontSize.sm ||
      "14px",
    fontFamily:
      typography.fontFamily.primary,
    transition:
      "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
    userSelect: "none",
    boxSizing: "border-box",
  };

  // ====================================
  // DISABLED STATE
  // ====================================

  if (disabled) {
    return (
      <div
        style={{
          ...baseStyles,
          color:
            colors.textMuted ||
            "rgba(255, 255, 255, 0.35)",
          cursor: "not-allowed",
          backgroundColor:
            "transparent",
        }}
      >
        <Icon
          size={18}
          style={{
            opacity: 0.5,
            flexShrink: 0,
          }}
        />

        {!isCollapsed && (
          <>
            <span
              style={{
                flex: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </span>

            {badge && (
              <SidebarBadge
                text={badge}
                variant={
                  badgeVariant ||
                  "neutral"
                }
                theme={theme}
              />
            )}
          </>
        )}
      </div>
    );
  }

  // ====================================
  // ACTION STATE
  // ====================================
  //
  // Actions such as Logout should use
  // a button rather than a navigation
  // route.
  // ====================================

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() =>
          setIsHovered(true)
        }
        onMouseLeave={() =>
          setIsHovered(false)
        }
        disabled={disabled}
        style={{
          ...baseStyles,
          color:
            colors.textSecondary ||
            "rgba(255, 255, 255, 0.7)",
          backgroundColor:
            isHovered
              ? "rgba(255, 255, 255, 0.04)"
              : "transparent",
          cursor: "pointer",
          fontWeight:
            typography.fontWeight.medium,
          transform:
            isHovered &&
            !isCollapsed
              ? "translateX(4px)"
              : "translateX(0)",
          textAlign: "left",
        }}
      >
        <Icon
          size={18}
          style={{
            opacity: 0.85,
            flexShrink: 0,
          }}
        />

        {!isCollapsed && (
          <>
            <span
              style={{
                flex: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </span>

            {badge && (
              <SidebarBadge
                text={badge}
                variant={
                  badgeVariant ||
                  "primary"
                }
                theme={theme}
              />
            )}
          </>
        )}
      </button>
    );
  }

  // ====================================
  // NAVIGATION STATE
  // ====================================

  return (
    <NavLink
      to={route}
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
      style={({ isActive }) => ({
        ...baseStyles,
        color: isActive
          ? (
            colors.textPrimary ||
            "#ffffff"
          )
          : (
            colors.textSecondary ||
            "rgba(255, 255, 255, 0.7)"
          ),
        backgroundColor: isActive
          ? (
            colors.activeBackground ||
            "rgba(255, 255, 255, 0.08)"
          )
          : isHovered
            ? "rgba(255, 255, 255, 0.04)"
            : "transparent",
        fontWeight: isActive
          ? typography.fontWeight.semibold
          : typography.fontWeight.medium,
        transform:
          isHovered &&
          !isActive &&
          !isCollapsed
            ? "translateX(4px)"
            : "translateX(0)",
        cursor: "pointer",
      })}
    >
      {({ isActive }) => (
        <>
          {/* ==================================
              ACTIVE ACCENT
              ================================== */}

          {isActive && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "25%",
                height: "50%",
                width: "3px",
                backgroundColor:
                  colors.secondary ||
                  colors.primary ||
                  "#3b82f6",
                borderRadius:
                  "0 4px 4px 0",
              }}
            />
          )}

          <Icon
            size={18}
            style={{
              opacity: isActive
                ? 1
                : 0.85,
              flexShrink: 0,
              transition:
                "opacity 0.2s ease",
            }}
          />

          {!isCollapsed && (
            <>
              <span
                style={{
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {label}
              </span>

              {badge && (
                <SidebarBadge
                  text={badge}
                  variant={
                    badgeVariant ||
                    "primary"
                  }
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