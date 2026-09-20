import React from "react";
import { HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "../../../auth";

// ====================================
// SIDEBAR FOOTER
// ====================================

const SidebarFooter = ({ theme }) => {
  const { isCollapsed } = useSidebar();

  const {
    logout
  } = useAuth();

  const navigate = useNavigate();

  const {
    colors,
    spacing
  } = theme;

  // ====================================
  // LOGOUT
  // ====================================

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      navigate("/login", {
        replace: true
      });
    }
  };

  return (
    <div
      style={{
        borderTop:
          `1px solid ${
            colors.borderLight ||
            "rgba(255, 255, 255, 0.06)"
          }`,
        paddingTop:
          spacing.md || "16px",
        marginTop:
          spacing.sm || "12px",
        display: "flex",
        flexDirection: "column",
        transition:
          "all 0.3s ease",
      }}
    >
      <SidebarItem
        icon={HelpCircle}
        label="Help Center"
        disabled={true}
        theme={theme}
      />

      <SidebarItem
        icon={LogOut}
        label="Logout"
        onClick={handleLogout}
        theme={theme}
      />

      {!isCollapsed && (
        <div
          style={{
            textAlign: "center",
            marginTop: "12px",
            fontSize: "10px",
            color:
              colors.textMuted ||
              "rgba(255, 255, 255, 0.3)",
            fontFamily:
              theme.typography
                .fontFamily.primary,
            letterSpacing: "0.5px",
          }}
        >
          v1.0.0-rc.1
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;