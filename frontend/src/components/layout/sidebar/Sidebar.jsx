import React from "react";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import SidebarBrand from "./SidebarBrand";
import SidebarSearch from "./SidebarSearch";
import SidebarGroup from "./SidebarGroup";
import SidebarProfile from "./SidebarProfile";
import SidebarFooter from "./SidebarFooter";
import { sidebarNavigation } from "./sidebar.config";
import { GlobalSidebarStyles } from "./styles/sidebarStyles";

// Inner component that actually consumes the context
const SidebarContent = ({ theme }) => {
  const { isCollapsed } = useSidebar();
  const { colors, spacing } = theme;

  return (
    <nav
      style={{
        width: isCollapsed ? "80px" : "260px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: colors.primaryDark || "#0F172A",
        display: "flex",
        flexDirection: "column",
        padding: `${spacing.lg || "24px"} ${spacing.md || "16px"}`,
        borderRight: `1px solid ${colors.borderLight || "rgba(255,255,255,0.06)"}`,
        zIndex: 1001,
        boxSizing: "border-box",
        transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <GlobalSidebarStyles />
      
      <SidebarBrand theme={theme} />
      <SidebarSearch theme={theme} />

      {/* Scrollable Navigation Node */}
      <div
        className="sidebar-scroll-node"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "4px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {sidebarNavigation.map((group, index) => (
          <SidebarGroup
            key={group.title || index}
            title={group.title}
            collapsible={group.collapsible}
            theme={theme}
            items={group.items.map(item => ({
              label: item.label,
              route: item.path,
              icon: item.icon,
              badge: item.badge,
              disabled: item.disabled
            }))}
          />
        ))}
      </div>

      {/* Bottom Anchored Section */}
      <div style={{ marginTop: "auto" }}>
        <SidebarProfile theme={theme} />
        <SidebarFooter theme={theme} />
      </div>
    </nav>
  );
};

// Root Export wrapped in Context Provider
const Sidebar = ({ theme, initialCollapsed = false }) => {
  return (
    <SidebarProvider initialCollapsed={initialCollapsed}>
      <SidebarContent theme={theme} />
    </SidebarProvider>
  );
};

export default Sidebar;