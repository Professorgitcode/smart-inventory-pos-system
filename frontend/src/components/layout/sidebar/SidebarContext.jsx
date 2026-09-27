import React, { createContext, useContext, useState, useMemo } from "react";

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children, initialCollapsed = false }) => {
  // Core UI State
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Group Accordion State (Keeps track of which groups are expanded)
  // Defaulting to empty object means all are open by default unless configured otherwise
  const [expandedGroups, setExpandedGroups] = useState({});

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
      toggleGroup
    }),
    [isCollapsed, searchTerm, expandedGroups]
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
