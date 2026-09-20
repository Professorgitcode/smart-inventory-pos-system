import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const PublicRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();

  // ========================================
  // WAIT FOR SESSION RESTORATION
  // ========================================
  if (isInitializing) {
    return null;
  }

  // ========================================
  // AUTHENTICATED USERS
  // ========================================
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ========================================
  // PUBLIC USERS
  // ========================================
  return <Outlet />;
};

export default PublicRoute;