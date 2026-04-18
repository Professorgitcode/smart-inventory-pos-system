import React, { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import POS from "./pages/POS";
import SalesReports from "./pages/SalesReports";

const App = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    surface: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f8fafc" : "#0f172a",
    border: isDark ? "#334155" : "#e2e8f0",
    muted: isDark ? "#94a3b8" : "#64748b",
    primary: "#2563eb"
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: theme.bg, color: theme.text, transition: "0.3s" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} theme={theme} />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} isDark={isDark} />
        <main style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          {activePage === "dashboard" && <Dashboard theme={theme} />}
          {activePage === "inventory" && <Inventory theme={theme} />}
          {activePage === "pos" && <POS theme={theme} />}
          {activePage === "sales-reports" && <SalesReports theme={theme} />}
        </main>
      </div>
    </div>
  );
};

export default App;