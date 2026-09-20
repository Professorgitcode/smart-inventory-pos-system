// ====================================
// AUTHENTICATION MODULE
// ====================================

// ====================================
// PROVIDERS / CONTEXT
// ====================================

export {
  default as AuthProvider
} from "./AuthProvider";

export {
  default as AuthContext
} from "./AuthContext";

// ====================================
// HOOKS
// ====================================

export {
  default as useAuth
} from "./useAuth";

// ====================================
// ROUTE GUARDS
// ====================================

export {
  default as ProtectedRoute
} from "./ProtectedRoute";

export {
  default as PublicRoute
} from "./PublicRoute";

// ====================================
// ACCESS CONTROL
// ====================================

export {
  default as PermissionGate
} from "./PermissionGate";

export {
  default as RoleGuard
} from "./RoleGuard";

// ====================================
// STORAGE
// ====================================

export {
  getToken,
  setToken,
  removeToken,

  getUser,
  setUser,
  removeUser,

  getExpiresAt,
  setExpiresAt,
  removeExpiresAt,

  saveAuth,
  clearAuth,
  hasToken
} from "./authStorage";

export {
  ROLES,
  ALL_PERMISSIONS,
  hasRole,
  hasPermission
} from "./authorization";
