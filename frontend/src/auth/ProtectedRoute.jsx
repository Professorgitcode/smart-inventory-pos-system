// ====================================
// PROTECTED ROUTE GUARD
// ====================================
//
// Allows access to authenticated users only.
//
// Session restoration is handled by AuthProvider.
// This guard waits until initialization is complete
// before deciding whether to redirect the user.
// ====================================

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "./useAuth";

// ====================================
// COMPONENT
// ====================================

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    isInitializing
  } = useAuth();

  const location = useLocation();

  // ====================================
  // WAIT FOR SESSION RESTORATION
  // ====================================

  if (isInitializing) {
    return null;
  }

  // ====================================
  // UNAUTHENTICATED USERS
  // ====================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location
        }}
      />
    );
  }

  // ====================================
  // AUTHENTICATED USERS
  // ====================================

  return <Outlet />;
};

export default ProtectedRoute;
