import React from "react";
import { UserCircle, ChevronDown } from "lucide-react";

const NavbarProfile = ({ theme, isDark, user }) => {
  const { colors, spacing, typography } = theme;

  const fullName = [
    user?.firstName,
    user?.lastName
]
    .filter(Boolean)
    .join(" ");

const displayName =
    fullName ||
    user?.username ||
    "User";

const displayRole =
    user?.role ||
    "User";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        paddingLeft: spacing.sm,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <span style={{ fontWeight: typography.fontWeight.bold, color: colors.text, fontSize: typography.fontSize.sm, lineHeight: 1.2 }}>
          {displayName}
        </span>
        <span style={{ fontSize: "11px", color: colors.textMuted, fontWeight: typography.fontWeight.medium }}>
          {displayRole}
        </span>
      </div>
      
      <div style={{ position: "relative", display: "flex" }}>
        <UserCircle size={36} color={colors.primary} />
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            right: "2px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: colors.success,
            border: `2px solid ${isDark ? "#121A2F" : "#ffffff"}`,
          }}
        />
      </div>
      
      <ChevronDown size={16} color={colors.textMuted} style={{ marginLeft: "-4px" }} />
    </div>
  );
};

export default NavbarProfile;