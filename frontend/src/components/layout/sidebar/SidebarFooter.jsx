import React from "react";
import { HelpCircle, LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useSidebar } from "./SidebarContext";

const SidebarFooter = ({ theme }) => {
  const { isCollapsed } = useSidebar();
  const { colors, spacing } = theme;

  return (
    <div
      style={{
        borderTop: `1px solid ${colors.borderLight || "rgba(255, 255, 255, 0.06)"}`,
        paddingTop: spacing.md || "16px",
        marginTop: spacing.sm || "12px",
        display: "flex",
        flexDirection: "column",
        // Smooth transition in case spacing changes during collapse
        transition: "all 0.3s ease",
      }}
    >
      <SidebarItem
        icon={HelpCircle}
        label="Help Center"
        disabled={true} // Replaces the old PlaceholderLink logic
        theme={theme}
      />
      
      <SidebarItem
        icon={LogOut}
        label="Logout"
        route="/logout"
        theme={theme}
      />
      
      {/* Future-proofing: App Versioning or System Status could easily be injected here */}
      {!isCollapsed && (
        <div 
          style={{
            textAlign: "center",
            marginTop: "12px",
            fontSize: "10px",
            color: colors.textMuted || "rgba(255, 255, 255, 0.3)",
            fontFamily: theme.typography.fontFamily.primary,
            letterSpacing: "0.5px"
          }}
        >
          v1.0.0-rc.1
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;