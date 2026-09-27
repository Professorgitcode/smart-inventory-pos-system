// ====================================
// APPLICATION LAYOUT
// ====================================

import React from "react";
import {
  Outlet,
  useLocation
} from "react-router-dom";

import Navbar from "../components/layout/navbar/Navbar";
import Sidebar from "../components/layout/sidebar/Sidebar";

import {
  SidebarProvider,
  useSidebar
} from "../components/layout/sidebar/SidebarContext";

import {
  useTheme
} from "../context/ThemeContext";

import { useAuth } from "../auth";

// ====================================
// ROUTE DISPLAY METADATA
// ====================================
// Central definition of the labels used
// by the application shell.
//
// This is presentation metadata only.
// It does not control routing.
// ====================================

const ROUTE_METADATA = [
  {
    path: "/",
    title: "Dashboard",
    breadcrumbs: [
      "Home",
      "Dashboard"
    ]
  },
  {
    path: "/inventory",
    title: "Inventory",
    breadcrumbs: [
      "Home",
      "Operations",
      "Inventory"
    ]
  },
  {
    path: "/pos",
    title: "POS System",
    breadcrumbs: [
      "Home",
      "Operations",
      "POS System"
    ]
  },
  {
    path: "/sales-reports",
    title: "Sales Reports",
    breadcrumbs: [
      "Home",
      "Operations",
      "Sales Reports"
    ]
  },
  {
    path: "/inventory-insights",
    title: "Inventory Insights",
    breadcrumbs: [
      "Home",
      "Insights",
      "Inventory Insights"
    ]
  },
  {
    path: "/forecasting",
    title: "Forecasting",
    breadcrumbs: [
      "Home",
      "Insights",
      "Forecasting"
    ]
  },
  {
    path: "/supplier-intelligence",
    title: "Supplier Intelligence",
    breadcrumbs: [
      "Home",
      "Insights",
      "Supplier Intelligence"
    ]
  },
  {
    path: "/audit-trail",
    title: "Audit Trail",
    breadcrumbs: [
      "Home",
      "System",
      "Audit Trail"
    ]
  },
  {
    path: "/users",
    title: "Users",
    breadcrumbs: [
      "Home",
      "System",
      "Users"
    ]
  },
  {
    path: "/ai-procurement",
    title: "AI Procurement",
    breadcrumbs: [
      "Home",
      "Insights",
      "AI Procurement"
    ]
  }
];

// ====================================
// ROUTE METADATA RESOLVER
// ====================================

const getRouteMetadata = (
  pathname
) => {

  const exactMatch =
    ROUTE_METADATA.find(
      route =>
        route.path === pathname
    );

  if (exactMatch) {
    return exactMatch;
  }

  return {
    title: "Smart Inventory",
    breadcrumbs: [
      "Home"
    ]
  };
};

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
    user
  } = useAuth();

  const {
    isCollapsed,
    toggleCollapse
  } = useSidebar();

  const {
    pathname
  } = useLocation();

  const routeMetadata =
    getRouteMetadata(
      pathname
    );

  const sidebarWidth =
    isCollapsed
      ? "80px"
      : "260px";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor:
          theme.colors.background,
        color:
          theme.colors.text,
        fontFamily:
          theme.typography
            .fontFamily
            .primary
      }}
    >

      <Sidebar
        theme={theme}
      />

      <div
        style={{
          marginLeft:
            sidebarWidth,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition:
            "margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >

        <Navbar

          theme={
            theme
          }

          toggleTheme={
            toggleTheme
          }

          isDark={
            isDark
          }

          collapsed={
            isCollapsed
          }

          toggleSidebar={
            toggleCollapse
          }

          user={user}

          title={
            routeMetadata.title
          }

          breadcrumbs={
            routeMetadata.breadcrumbs
          }

        />

        <main
          style={{
            marginTop: "72px",
            padding:
              theme.spacing?.xl ||
              "32px",
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
    <SidebarProvider
      initialCollapsed={false}
    >
      <AppLayoutContent />
    </SidebarProvider>
  );

};

export default AppLayout;