import React from "react";
import { LayoutDashboard, Package, ShoppingCart, LogOut, ChartArea, LucideGitGraph, LucideTrendingUpDown } from "lucide-react";
import SalesReports from "../pages/SalesReports";

const Sidebar = ({ activePage, setActivePage, theme }) => {
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "pos", label: "POS System", icon: ShoppingCart },
    { id: "sales-reports", label: "Sales Reports", icon: LucideGitGraph },
  ];

  return (
    <div style={{ width: "260px", backgroundColor: "#0f172a", color: "#94a3b8", display: "flex", flexDirection: "column", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px", color: "white" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: theme.primary }} />
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Smart POS</h2>
      </div>

      <nav style={{ flex: 1 }}>
        {menu.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePage(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "8px",
              transition: "0.2s",
              backgroundColor: activePage === item.id ? "#1e293b" : "transparent",
              color: activePage === item.id ? "white" : "inherit"
            }}
          >
            <item.icon size={20} />
            <span style={{ fontWeight: "500" }}>{item.label}</span>
          </div>
        ))}
      </nav>
      
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", cursor: "pointer" }}>
        <LogOut size={20} /> <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;