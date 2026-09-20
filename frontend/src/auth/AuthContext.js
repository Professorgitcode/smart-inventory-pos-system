// ====================================
// AUTHENTICATION CONTEXT
// ====================================
//
// This context exposes authentication
// state to the React application.
//
// It does NOT perform authentication
// itself. Authentication operations
// will be managed by AuthProvider.
// ====================================

import { createContext } from "react";

// ====================================
// CONTEXT
// ====================================

const AuthContext = createContext(null);

export default AuthContext;
