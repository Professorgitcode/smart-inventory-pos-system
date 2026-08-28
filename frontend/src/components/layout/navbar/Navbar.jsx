import React, { useState } from "react";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import NavbarSearch from "./NavbarSearch";
import NavbarActions from "./NavbarActions";
import NavbarProfile from "./NavbarProfile";

// ✅ AFTER (Adding collapsed and toggleSidebar)
const Navbar = ({ theme, toggleTheme, isDark,breadcrumbs, collapsed, title, toggleSidebar }) => {
  const { colors, spacing, shadows } = theme;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: collapsed ? "80px" : "260px",
        right: 0,
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `0 ${spacing.xl}`,
        background: isDark
          ? "rgba(18, 26, 47, 0.75)"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : colors.border}`,
        boxShadow: shadows.sm,
        zIndex: 1000,
        fontFamily: theme.typography.fontFamily.primary,
      }}
    >
      <NavbarBreadcrumbs theme={theme} title={title} breadcrumbs={breadcrumbs} />
      <NavbarSearch theme={theme} isDark={isDark} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: spacing.lg }}>
        <NavbarActions theme={theme} isDark={isDark} toggleTheme={toggleTheme} />
        <NavbarProfile theme={theme} isDark={isDark} />
      </div>
    </header>
  );
};

export default Navbar;