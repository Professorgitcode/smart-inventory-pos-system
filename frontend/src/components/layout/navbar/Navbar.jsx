import React, { useState } from "react";
import {
  Wifi,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  Activity,
  RefreshCw
} from "lucide-react";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import NavbarSearch from "./NavbarSearch";
import NavbarActions from "./NavbarActions";
import NavbarProfile from "./NavbarProfile";

// ---------------- Connectivity Dropdown Component ----------------
const ConnectivityStatus = ({ theme, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleHealthCheck = () => {
    setIsChecking(true);
    setTimeout(() => setIsChecking(false), 1000);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "20px",
          border: `1px solid ${isDark ? "#059669" : "#10b981"}`,
          backgroundColor: isDark ? "rgba(16, 185, 129, 0.15)" : "#10b981",
          color: isDark ? "#34d399" : "#ffffff",
          fontSize: "0.75rem",
          fontWeight: "700",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <Wifi size={14} />
        FULL INTERNET CONNECTIVITY
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            left: 0,
            width: "320px",
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: isDark ? "#cbd5e1" : "#475569" }}>
            <Info size={14} />
            <span>Connection Status</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#065f46", color: "#34d399", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "bold" }}>
              <span style={{ width: "8px", height: "8px", backgroundColor: "#34d399", borderRadius: "50%" }}></span> FULL
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: isDark ? "#cbd5e1" : "#475569" }}>
            <Clock size={14} />
            <span>Last Health Check</span>
            <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>Sep 6, 2026 at 5:13:19 PM</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: isDark ? "#cbd5e1" : "#475569" }}>
            <Activity size={14} />
            <span>Response Time</span>
            <span style={{ marginLeft: "auto", fontSize: "0.8rem", fontWeight: "600" }}>136ms</span>
          </div>

          <button
            onClick={handleHealthCheck}
            style={{
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "8px",
              backgroundColor: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} className={isChecking ? "spin" : ""} style={{ animation: isChecking ? "spin 1s linear infinite" : "none" }} />
            Run Health Check
          </button>
        </div>
      )}
    </div>
  );
};

// ---------------- Main Navbar Component ----------------
const Navbar = ({ theme, toggleTheme, isDark, breadcrumbs, collapsed, title, toggleSidebar }) => {
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

      {/* Inserted the ConnectivityStatus component here */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <ConnectivityStatus theme={theme} isDark={isDark} />
        <NavbarSearch theme={theme} isDark={isDark} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: spacing.lg }}>
        <NavbarActions theme={theme} isDark={isDark} toggleTheme={toggleTheme} />
        <NavbarProfile theme={theme} isDark={isDark} />
      </div>
    </header>
  );
};

export default Navbar;