// ====================================
// AUTHENTICATION PROVIDER
// ====================================
//
// Owns application authentication state.
//
// Responsibilities:
//
// - restore an existing session
// - validate the stored JWT
// - perform login
// - perform logout
// - expose authentication state
//
// Authentication API calls are delegated
// to AuthRepository.
// Persistence is delegated to authStorage.
// ====================================

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import AuthContext from "./AuthContext";
import AuthRepository from "../repositories/auth/AuthRepository";

import {
  clearAuth,
  getExpiresAt,
  getToken,
  getUser,
  saveAuth
} from "./authStorage";

// ====================================
// PROVIDER
// ====================================

const AuthProvider = ({ children }) => {
  // ====================================
  // STATE
  // ====================================

  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);
  const [expiresAt, setExpiresAtState] = useState(null);

  const [isInitializing, setIsInitializing] =
    useState(true);

  const [isLoading, setIsLoading] =
    useState(false);

  // ====================================
  // SESSION RESTORATION
  // ====================================

// ====================================
// SESSION RESTORATION
// ====================================

const restoreSession = useCallback(async () => {
  const storedToken = getToken();
  const storedUser = getUser();
  const storedExpiresAt = getExpiresAt();

  // ====================================
  // NO STORED SESSION
  // ====================================

  if (!storedToken) {
    setTokenState(null);
    setUser(null);
    setExpiresAtState(null);

    setIsInitializing(false);

    return;
  }

  // ====================================
  // RESTORATION START TIME
  // ====================================

  const restorationStartedAt =
    Date.now();

  // ====================================
  // TEMPORARILY RESTORE STORED VALUES
  // ====================================

  setTokenState(storedToken);
  setUser(storedUser);
  setExpiresAtState(storedExpiresAt);

  try {
    // ==================================
    // VALIDATE JWT IMMEDIATELY
    // ==================================

    const validation =
      await AuthRepository.fetchProfile();

    if (!validation?.isAuthenticated) {
      throw new Error(
        "Stored authentication session is invalid."
      );
    }

    // ==================================
    // VALIDATE STORED USER
    // ==================================

    if (!storedUser) {
      throw new Error(
        "Authenticated session has no stored user."
      );
    }

    setTokenState(storedToken);
    setUser(storedUser);
    setExpiresAtState(storedExpiresAt);

  } catch (error) {

    // ==================================
    // INVALID SESSION
    // ==================================

    clearAuth();

    setTokenState(null);
    setUser(null);
    setExpiresAtState(null);

    console.warn(
      "Stored authentication session could not be restored.",
      error
    );

  } finally {

    // ==================================
    // MINIMUM LOADER DISPLAY TIME
    // ==================================
    //
    // Authentication validation has
    // already happened.
    //
    // This delay exists only so that the
    // application loader has enough time
    // to present its animation.
    // ==================================

    const minimumDisplayTime = 5000;

    const elapsed =
      Date.now() - restorationStartedAt;

    const remaining =
      Math.max(
        0,
        minimumDisplayTime - elapsed
      );

    if (remaining > 0) {
      await new Promise((resolve) => {
        setTimeout(resolve, remaining);
      });
    }

    setIsInitializing(false);
  }
}, []);
  // ====================================
  // INITIALIZATION
  // ====================================

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // ====================================
  // LOGIN
  // ====================================

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);

      try {
        const response =
          await AuthRepository.login(credentials);

        if (
          !response ||
          !response.token ||
          !response.user
        ) {
          throw new Error(
            "Authentication response is incomplete."
          );
        }

        saveAuth({
          token: response.token,
          user: response.user,
          expiresAt: response.expiresAt
        });

        setTokenState(response.token);
        setUser(response.user);
        setExpiresAtState(response.expiresAt);

        return response;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // ====================================
  // LOGOUT
  // ====================================

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      // ----------------------------------
      // There is currently no backend
      // logout/revocation endpoint.
      //
      // JWT logout is therefore local:
      // remove the client-side authentication
      // state and token.
      // ----------------------------------

      await AuthRepository.logout();
    } finally {
      clearAuth();

      setTokenState(null);
      setUser(null);
      setExpiresAtState(null);

      setIsLoading(false);
    }
  }, []);

  // ====================================
  // AUTHENTICATION STATE
  // ====================================

  const isAuthenticated =
    Boolean(token && user);

  // ====================================
  // CONTEXT VALUE
  // ====================================

  const contextValue = useMemo(
    () => ({
      user,
      token,
      expiresAt,

      isAuthenticated,
      isInitializing,
      isLoading,

      login,
      logout
    }),
    [
      user,
      token,
      expiresAt,
      isAuthenticated,
      isInitializing,
      isLoading,
      login,
      logout
    ]
  );

  // ====================================
  // PROVIDER
  // ====================================

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;