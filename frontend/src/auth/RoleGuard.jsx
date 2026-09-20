// TODO: Implementation will be added in the appropriate development stage.
// ====================================
// ROLE GUARD
// ====================================
//
// Controls rendering based on the
// authenticated user's role.
//
// This is a frontend UI guard.
// Backend authorization remains mandatory
// for actual API protection.
// ====================================

import useAuth from "./useAuth";

import {
  hasRole
} from "./authorization";

// ====================================
// COMPONENT
// ====================================

const RoleGuard = ({
  roles,
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
  // CHECK ROLE
  // ====================================

  if (!hasRole(user, roles)) {
    return fallback;
  }

  // ====================================
  // AUTHORIZED
  // ====================================

  return children;
};

export default RoleGuard;