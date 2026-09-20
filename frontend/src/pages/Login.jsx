// ====================================
// LOGIN PAGE
// ====================================
//
// Page-level authentication orchestration.
//
// Responsibilities:
// - obtain authentication action
// - process successful login
// - navigate to application
// - provide theme to UI
//
// UI belongs to components/login.
// Authentication belongs to AuthProvider.
// ====================================

import React, {
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import useAuth from "../auth/useAuth";
import { useTheme } from "../context/ThemeContext";

import LoginBrandPanel
  from "../components/login/LoginBrandPanel";

import LoginForm
  from "../components/login/LoginForm";

import "../components/login/login.css";

// ====================================
// COMPONENT
// ====================================

const Login = () => {
  const { theme } = useTheme();

  const {
    login,
    isLoading
  } = useAuth();

  const navigate = useNavigate();

  const [error, setError] =
    useState("");

  // ====================================
  // LOGIN
  // ====================================

  const handleLogin = async (credentials) => {
    setError("");

    try {
      await login(credentials);

      // --------------------------------
      // Replace history so the browser
      // does not return to the login
      // screen using the Back button.
      // --------------------------------

      navigate("/", {
        replace: true
      });

    } catch (loginError) {

      console.error(
        "Login failed:",
        loginError
      );

      setError(
        "Invalid username or password."
      );

      throw loginError;
    }
  };

  // ====================================
  // THEME
  // ====================================

  const primary =
    theme.colors.primary ||
    "#2F8F83";

  const primaryDark =
    theme.colors.primaryDark ||
    "#176B64";

  return (
    <div
      className="smart-login-page"
      style={{
  "--smart-login-primary": primary,
  "--smart-login-primary-dark": primaryDark,
  "--smart-login-page-background":
    theme.colors.background,
  "--smart-login-page-text":
    theme.colors.text,
  "--smart-login-auth-background":
    theme.colors.surface,
  "--smart-login-auth-text":
    theme.colors.text,
  "--smart-login-input-background":
    theme.colors.background,
  "--smart-login-input-text":
    theme.colors.text,
  "--smart-login-input-border":
    theme.colors.border,
  "--smart-login-input-muted":
    theme.colors.textMuted,
  "--smart-login-placeholder":
    theme.colors.textMuted
}}
    >

      <div className="smart-login-layout">

        <LoginBrandPanel
          primary={primary}
          primaryDark={primaryDark}
        />

        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
          theme={theme}
        />

      </div>

    </div>
  );
};

export default Login;