// ====================================
// AUTHENTICATION HOOK
// ====================================
//
// Provides a single, consistent way for
// React components to access authentication
// state and actions.
// ====================================

import { useContext } from "react";

import AuthContext from "./AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider."
    );
  }

  return context;
};

export default useAuth;