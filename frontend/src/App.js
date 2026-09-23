// ====================================
// APPLICATION ROUTER
// ====================================

import React from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  ProtectedRoute,
  PublicRoute,
  RoleGuard
} from "./auth";

import AppLayout from "./layouts/AppLayout";
import AppRefreshLoader from "./components/AppRefreshLoader";

import { useAuth } from "./auth";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import POS from "./pages/POS";
import SalesReports from "./pages/SalesReports";
import InventoryInsights from "./pages/InventoryInsights";
import Forecasting from "./pages/Forecasting";
import SupplierIntelligence from "./pages/SupplierIntelligence";
import AuditTrail from "./pages/AuditTrail";
import Users from "./pages/Users";
import AIProcurement from "./pages/AIProcurement";

const App = () => {
  const { isInitializing } = useAuth();
  return (
     <>
      <AppRefreshLoader
        isLoading={isInitializing}
        message="Restoring your Smart Inventory session..."
      />
    <Routes>

      {/* ==================================
          PUBLIC
          ================================== */}

      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={<Login />}
        />
      </Route>

      {/* ==================================
          PROTECTED APPLICATION
          ================================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<AppLayout />}>

    <Route
        index
        element={<Dashboard />}
    />

    <Route
        path="inventory"
        element={<Inventory />}
    />

    <Route
        path="pos"
        element={<POS />}
    />

    <Route
        path="sales-reports"
        element={<SalesReports />}
    />

    <Route
        path="inventory-insights"
        element={<InventoryInsights />}
    />

    <Route
        path="forecasting"
        element={<Forecasting />}
    />

    <Route
        path="supplier-intelligence"
        element={<SupplierIntelligence />}
    />

    <Route
        path="audit-trail"
        element={<AuditTrail />}
    />

    <Route
        path="users"
        element={
            <RoleGuard
                roles={["Admin"]}
                fallback={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            >
                <Users />
            </RoleGuard>
        }
    />

    <Route
        path="ai-procurement"
        element={<AIProcurement />}
    />

</Route>

      </Route>

    </Routes>
    </>
  );
};

export default App;