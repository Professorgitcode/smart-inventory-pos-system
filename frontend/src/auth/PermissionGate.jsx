// ====================================
// PERMISSION GATE
// ====================================
//
// Controls rendering based on a specific
// permission.
//
// The current backend does not yet expose
// permissions, so non-Admin users will only
// pass when their User DTO eventually contains
// the requested permission.
//
// Admin currently has unrestricted UI access.
//
// Backend authorization remains authoritative.
// ====================================

import useAuth from "./useAuth";

import {
  hasPermission
} from "./authorization";

// ====================================
// COMPONENT
// ====================================

const PermissionGate = ({
  permission,
  children,
  fallback = null
}) => {
  const {
    user,
    isAuthenticated,
    isInitializing
  } = useAuth();

  // ====================================
  // WAIT FOR SESSION INITIALIZATION
  // ====================================

  if (isInitializing) {
    return null;
  }

  // ====================================
  // REQUIRE AUTHENTICATION
  // ====================================

  if (!isAuthenticated || !user) {
    return fallback;
  }

  // ====================================
  // CHECK PERMISSION
  // ====================================

  if (!hasPermission(user, permission)) {
    return fallback;
  }

  // ====================================
  // AUTHORIZED
  // ====================================

  return children;
};

export default PermissionGate;
