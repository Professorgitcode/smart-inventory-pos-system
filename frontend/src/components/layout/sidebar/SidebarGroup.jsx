import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import SidebarItem from "./SidebarItem";

const SidebarGroup = ({ 
  title, 
  items = [], 
  collapsible = true, 
  theme 
}) => {
  const { isCollapsed, expandedGroups, toggleGroup, searchTerm } = useSidebar();
  const { typography, colors } = theme;

  // Default to expanded if not explicitly recorded as false in context
  const isExpanded = expandedGroups[title] !== false;

  // --- Smart Search Filtering ---
  // If searching, check if the group title or any of its items match the term.
  // If nothing matches, hide this entire group to keep the UI clean.
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    const titleMatches = title.toLowerCase().includes(term);
    const hasMatchingItems = items.some((item) => 
      item.label.toLowerCase().includes(term)
    );
    
    if (!titleMatches && !hasMatchingItems) {
      return null;
    }
  }

  const handleToggle = () => {
    if (collapsible) {
      toggleGroup(title);
    }
  };

  // If the global sidebar is collapsed, we hide the group headers completely 
  // and just render a stack of icons to save horizontal space.
  if (isCollapsed) {
    return (
      <div style={{ marginBottom: "16px" }}>
        {items.map((item, index) => (
          <SidebarItem key={`${title}-item-${index}`} {...item} theme={theme} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "8px" }}>
      {/* Group Header / Section Label */}
      <div
        onClick={collapsible ? handleToggle : undefined}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: collapsible ? "pointer" : "default",
          padding: collapsible ? "0 12px" : "0 0 0 12px",
          marginTop: "24px",
          marginBottom: collapsible ? "6px" : "8px",
          color: collapsible 
            ? (colors.textMuted || "rgba(255, 255, 255, 0.4)") 
            : (colors.textInverse || "rgba(255, 255, 255, 0.4)"),
          fontSize: "11px",
          fontWeight: typography.fontWeight.bold,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          userSelect: "none",
          fontFamily: typography.fontFamily.primary,
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (collapsible) {
            e.currentTarget.style.color = colors.textPrimary || "#ffffff";
          }
        }}
        onMouseLeave={(e) => {
          if (collapsible) {
            e.currentTarget.style.color = colors.textMuted || "rgba(255, 255, 255, 0.4)";
          }
        }}
      >
        <span>{title}</span>
        {collapsible && (
          isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        )}
      </div>

      {/* Group Items Wrapper */}
      {(!collapsible || isExpanded || searchTerm) && (
        <div 
          style={{ 
            display: "flex", 
            flexDirection: "column",
            // Add a subtle animation wrapper for smooth expansion (can be upgraded with CSS transitions/framer-motion later)
            overflow: "hidden" 
          }}
        >
          {items.map((item, index) => (
            <SidebarItem 
              key={`${title}-item-${index}`} 
              {...item} 
              theme={theme} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarGroup;
