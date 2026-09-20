// ====================================
// AUTHENTICATION STORAGE
// ====================================
//
// This module is responsible only for
// persisting authentication information.
//
// It does NOT perform login requests.
// It does NOT call the API.
// It does NOT contain React state.
//
// That separation keeps authentication
// concerns independent and testable.
// ====================================

const TOKEN_KEY = "token";
const USER_KEY = "auth_user";
const EXPIRATION_KEY = "auth_expires_at";

// ====================================
// TOKEN
// ====================================

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  if (!token) {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// ====================================
// USER
// ====================================

export const getUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const setUser = (user) => {
  if (!user) {
    localStorage.removeItem(USER_KEY);
    return;
  }

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

// ====================================
// TOKEN EXPIRATION
// ====================================

export const getExpiresAt = () => {
  return localStorage.getItem(EXPIRATION_KEY);
};

export const setExpiresAt = (expiresAt) => {
  if (!expiresAt) {
    localStorage.removeItem(EXPIRATION_KEY);
    return;
  }

  localStorage.setItem(
    EXPIRATION_KEY,
    expiresAt
  );
};

export const removeExpiresAt = () => {
  localStorage.removeItem(EXPIRATION_KEY);
};

// ====================================
// COMPLETE AUTH STATE
// ====================================

export const saveAuth = ({
  token,
  user,
  expiresAt
}) => {
  setToken(token);
  setUser(user);
  setExpiresAt(expiresAt);
};

export const clearAuth = () => {
  removeToken();
  removeUser();
  removeExpiresAt();
};

// ====================================
// AUTHENTICATION CHECK
// ====================================

export const hasToken = () => {
  return Boolean(getToken());
};
