import React, { useState } from "react";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import NavbarSearch from "./NavbarSearch";
import NavbarActions from "./NavbarActions";
import NavbarProfile from "./NavbarProfile";
import ConnectivityStatus from "./ConnectivityStatus";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "../../ui";

// ---------------- Main Navbar Component ----------------
const Navbar = ({ theme, toggleTheme, isDark, breadcrumbs, collapsed, title, toggleSidebar, user }) => {
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
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: spacing.sm }}>
        <Button
          type="button"
          variant="icon"
          icon={collapsed ? PanelLeftOpen : PanelLeftClose}
          isDark={isDark}
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        />
        <NavbarBreadcrumbs theme={theme} title={title} breadcrumbs={breadcrumbs} />
      </div>

      {/* Inserted the ConnectivityStatus component here */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <ConnectivityStatus theme={theme} isDark={isDark} />
        <NavbarSearch theme={theme} isDark={isDark} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: spacing.lg }}>
        <NavbarActions theme={theme} isDark={isDark} toggleTheme={toggleTheme} />
        <NavbarProfile theme={theme} isDark={isDark} user={user} />
      </div>
    </header>
  );
};

export default Navbar;
