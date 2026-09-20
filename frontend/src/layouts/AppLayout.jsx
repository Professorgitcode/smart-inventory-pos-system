// ====================================
// APPLICATION LAYOUT
// ====================================

import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/navbar/Navbar";
import Sidebar from "../components/layout/sidebar/Sidebar";

import {
  SidebarProvider,
  useSidebar
} from "../components/layout/sidebar/SidebarContext";

import { useTheme } from "../context/ThemeContext";

// ====================================
// LAYOUT CONTENT
// ====================================

const AppLayoutContent = () => {
  const {
    theme,
    isDark,
    toggleTheme
  } = useTheme();

  const {
    isCollapsed,
    toggleCollapse
  } = useSidebar();

  const sidebarWidth =
    isCollapsed ? "80px" : "260px";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor:
          theme.colors.background,
        color:
          theme.colors.text,
        fontFamily:
          theme.typography.fontFamily.primary
      }}
    >
      <Sidebar theme={theme} />

      <div
        style={{
          marginLeft: sidebarWidth,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition:
            "margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          isDark={isDark}
          collapsed={isCollapsed}
          toggleSidebar={toggleCollapse}
          title="Dashboard"
          breadcrumbs={[
            "Home",
            "Dashboard"
          ]}
        />

        <main
          style={{
            marginTop: "72px",
            padding:
              theme.spacing?.xl || "32px",
            flex: 1,
            minWidth: 0,
            overflowX: "hidden"
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ====================================
// LAYOUT ROOT
// ====================================

const AppLayout = () => {
  return (
    <SidebarProvider initialCollapsed={false}>
      <AppLayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;