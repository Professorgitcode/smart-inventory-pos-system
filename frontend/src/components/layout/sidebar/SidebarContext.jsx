import React, { createContext, useContext, useState, useMemo } from "react";

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children, initialCollapsed = false }) => {
  // Core UI State
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Group Accordion State (Keeps track of which groups are expanded)
  // Defaulting to empty object means all are open by default unless configured otherwise
  const [expandedGroups, setExpandedGroups] = useState({});

  // Future Readiness State (Stubs for when APIs are integrated)
  const [notifications, setNotifications] = useState({}); // e.g., { alerts: 5 }
  const [userPermissions, setUserPermissions] = useState([]); // e.g., ['view_sales', 'manage_users']

  // Handlers
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  
  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const value = useMemo(
    () => ({
      isCollapsed,
      toggleCollapse,
      searchTerm,
      setSearchTerm,
      expandedGroups,
      toggleGroup,
      notifications,
      setNotifications,
      userPermissions,
      setUserPermissions
    }),
    [isCollapsed, searchTerm, expandedGroups, notifications, userPermissions]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};