// ====================================
// AUTHORIZATION DEFINITIONS
// ====================================
//
// Central location for frontend authorization
// rules and helper functions.
//
// IMPORTANT:
// These checks control UI visibility and
// navigation only.
//
// The backend remains the authoritative
// security boundary for API access.
// ====================================

// ====================================
// ROLES
// ====================================

export const ROLES = Object.freeze({
  ADMIN: "Admin",
  USER: "User"
});

// ====================================
// SPECIAL PERMISSION
// ====================================
//
// A wildcard can later be returned by the
// backend for a role/user that has unrestricted
// UI permissions.
// ====================================

export const ALL_PERMISSIONS = "*";

// ====================================
// ROLE CHECK
// ====================================

export const hasRole = (user, allowedRoles) => {
  if (!user?.role) {
    return false;
  }

  const roles = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  return roles.includes(user.role);
};

// ====================================
// PERMISSION CHECK
// ====================================
//
// Permissions are not currently stored on the
// backend User DTO. The helper therefore supports
// them without assuming they already exist.
//
// Admin is treated as unrestricted at the UI
// layer for now.
//
// Backend authorization must still protect
// the actual API endpoints.
// ====================================

export const hasPermission = (user, permission) => {
  if (!user || !permission) {
    return false;
  }

  if (user.role === ROLES.ADMIN) {
    return true;
  }

  const permissions = Array.isArray(user.permissions)
    ? user.permissions
    : [];

  return (
    permissions.includes(ALL_PERMISSIONS) ||
    permissions.includes(permission)
  );
};