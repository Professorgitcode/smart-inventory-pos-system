import React from "react";
import { Sun, Moon, Bell, UserCircle } from "lucide-react";

const Navbar = ({ theme, toggleTheme, isDark }) => (
  <header style={{ 
    height: "70px", backgroundColor: theme.surface, borderBottom: `1px solid ${theme.border}`,
    display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px"
  }}>
    <h1 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Smart Inventory & POS</h1>
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <button onClick={toggleTheme} style={{ background: "none", border: "none", cursor: "pointer", color: theme.text }}>
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <Bell size={20} color={theme.muted} style={{ cursor: "pointer" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <UserCircle size={28} color={theme.primary} />
        <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>Admin</span>
      </div>
    </div>
  </header>
);

export default Navbar;