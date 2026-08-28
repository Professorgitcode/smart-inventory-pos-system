import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Sidebar from "./components/layout/sidebar/Sidebar";
import { useTheme } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import POS from "./pages/POS";
import SalesReports from "./pages/SalesReports";
import InventoryInsights from "./pages/InventoryInsights";
import Forecasting from "./pages/Forecasting";
import SupplierIntelligence from "./pages/SupplierIntelligence";

const App = () => {
 const { theme, isDark, toggleTheme } = useTheme();

  return (
  <BrowserRouter>
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        transition: "0.25s ease",
        overflow: "hidden"
      }}
    >
      <Sidebar theme={theme} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: "270px",
          backgroundColor: theme.colors.background
        }}
      >
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          isDark={isDark}
        />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 32px",
            marginTop: "64px",
            backgroundColor:theme.colors.background
          }}
        >
          <Routes>

            <Route
              path="/"
              element={<Dashboard theme={theme} />}
            />

            <Route
              path="/inventory"
              element={<Inventory theme={theme} />}
            />

            <Route
              path="/pos"
              element={<POS theme={theme} />}
            />

            <Route
              path="/sales-reports"
              element={<SalesReports theme={theme} />}
            />

            <Route
              path="/inventory-insights"
              element={<InventoryInsights theme={theme} />}
            />

            <Route
              path="/forecasting"
              element={<Forecasting theme={theme} />}
            />

             <Route
              path="/supplier-intelligence"
              element={<SupplierIntelligence theme={theme} />}
            />

          </Routes>
        </main>
      </div>
    </div>
  </BrowserRouter>
);
};

export default App;