// ====================================
// SIDEBAR PROFILE
// ====================================
//
// Displays the currently authenticated user.
// ====================================

import React from "react";
import { UserCircle } from "lucide-react";

import { useAuth } from "../../../auth";
import { useSidebar } from "./SidebarContext";

// ====================================
// COMPONENT
// ====================================

const SidebarProfile = ({ theme }) => {
  const {
    user,
    isAuthenticated
  } = useAuth();

  const colors = theme.colors;

  const {
    isCollapsed
  } = useSidebar();

  // ====================================
  // FALLBACK
  // ====================================

  if (!isAuthenticated || !user) {
    return null;
  }

  const fullName = [
    user.firstName,
    user.lastName
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isCollapsed
          ? "center"
          : "flex-start",
        gap: "12px"
      }}
      title={isCollapsed ? (fullName || user.username) : undefined}
    >
      <UserCircle
        size={42}
        color={colors.primary}
      />

      {!isCollapsed && (
        <div
          style={{
            minWidth: 0
          }}
        >
          <div
            style={{
              color: colors.text,
              fontWeight: 700,

              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {fullName || user.username}
          </div>

          <div
            style={{
              fontSize: "12px",
              color: colors.textMuted
            }}
          >
            {user.role || "User"}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarProfile;
