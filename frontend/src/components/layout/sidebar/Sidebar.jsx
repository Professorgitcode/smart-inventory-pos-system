// ====================================
// SIDEBAR
// ====================================

import React from "react";
import { useSidebar } from "./SidebarContext";

import SidebarBrand from "./SidebarBrand";
import SidebarSearch from "./SidebarSearch";
import SidebarGroup from "./SidebarGroup";
import SidebarProfile from "./SidebarProfile";
import SidebarFooter from "./SidebarFooter";

import { sidebarNavigation } from "./sidebar.config";
import { GlobalSidebarStyles } from "./styles/sidebarStyles";

import {
  useAuth,
  hasRole
} from "../../../auth";

// ====================================
// COMPONENT
// ====================================

const Sidebar = ({ theme }) => {
  const { isCollapsed } = useSidebar();

  const {
    user,
    isAuthenticated
  } = useAuth();

  const {
    colors,
    spacing
  } = theme;

  // ====================================
  // FILTER AUTHORIZED NAVIGATION
  // ====================================

  const visibleGroups = sidebarNavigation
    .map((group) => {
      const visibleItems = group.items.filter(
        (item) => {
          // No role restriction.
          if (!item.roles) {
            return true;
          }

          // User must be authenticated and
          // have one of the required roles.
          return (
            isAuthenticated &&
            hasRole(user, item.roles)
          );
        }
      );

      return {
        ...group,
        items: visibleItems
      };
    })
    .filter(
      (group) => group.items.length > 0
    );

  // ====================================
  // RENDER
  // ====================================

  return (
    <nav
      style={{
        width: isCollapsed
          ? "80px"
          : "260px",

        height: "100vh",

        position: "fixed",
        left: 0,
        top: 0,

        backgroundColor:
          colors.primaryDark ||
          "#0F172A",

        display: "flex",
        flexDirection: "column",

        padding:
          `${spacing.lg || "24px"} ${
            spacing.md || "16px"
          }`,

        borderRight:
          `1px solid ${
            colors.borderLight ||
            "rgba(255,255,255,0.06)"
          }`,

        zIndex: 1001,

        boxSizing: "border-box",

        transition:
          "width 0.3s cubic-bezier(0.16,1,0.3,1)"
      }}
    >
      <GlobalSidebarStyles />

      <SidebarBrand theme={theme} />

      <SidebarSearch theme={theme} />

      <div
        className="sidebar-scroll-node"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "4px",

          display: "flex",
          flexDirection: "column"
        }}
      >
        {visibleGroups.map(
          (group, index) => (
            <SidebarGroup
              key={
                group.title || index
              }
              title={group.title}
              collapsible={
                group.collapsible
              }
              theme={theme}
              items={group.items.map(
                (item) => ({
                  label: item.label,
                  route: item.path,
                  icon: item.icon,
                  badge: item.badge,
                  disabled: item.disabled
                })
              )}
            />
          )
        )}
      </div>

      <div
        style={{
          marginTop: "auto"
        }}
      >
        <SidebarProfile
          theme={theme}
        />

        <SidebarFooter
          theme={theme}
        />
      </div>
    </nav>
  );
};

export default Sidebar;