// ====================================
// LOGIN FORM
// ====================================
//
// Presentation + local form state only.
//
// Authentication is provided by the
// parent through onSubmit.
// ====================================

import React, {
  useState
} from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound
} from "lucide-react";

// ====================================
// COMPONENT
// ====================================

const LoginForm = ({
  onSubmit,
  isLoading,
  error,
  theme
}) => {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberDevice, setRememberDevice] =
    useState(false);

  // ====================================
  // SUBMIT
  // ====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      username,
      password
    });

    // ==================================
    // NEVER retain the password after
    // an authentication attempt.
    // ==================================

    setPassword("");
  };

  // ====================================
  // COLORS
  // ====================================

  const colors = theme.colors;

  const primary =
    colors.primary || "#2F8F83";

  const background =
    colors.background || "#F4F8F9";

  const surface =
    colors.surface || "#FFFFFF";

  const text =
    colors.text || "#173042";

  const textMuted =
    colors.textMuted || "#71808C";

  const border =
    colors.border || "#DCE5E8";

  return (
    <div className="smart-login-auth">

      <div className="smart-login-auth-inner">

        {/* ==================================
            BRAND ON MOBILE
            ================================== */}

        <div className="smart-login-mobile-brand">

          <div
            className="smart-login-mobile-mark"
            style={{
              color: primary,
              backgroundColor:
                `${primary}14`
            }}
          >
            SI
          </div>

          <div>

            <div className="smart-login-mobile-name">
              Smart Inventory
            </div>

            <div className="smart-login-mobile-subtitle">
              AI ENTERPRISE SUITE
            </div>

          </div>

        </div>

        {/* ==================================
            HEADER
            ================================== */}

        <h2 className="smart-login-auth-heading">
          Welcome back
        </h2>

        <p className="smart-login-auth-description">
          Sign in to access your Smart Inventory
          workspace.
        </p>

        <div
          className="smart-login-auth-accent"
          style={{
            backgroundColor: primary
          }}
        />

        {/* ==================================
            FORM
            ================================== */}

        <form
          className="smart-login-form"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* ==================================
              USERNAME
              ================================== */}

          <div className="smart-login-field">

            <label
              className="smart-login-label"
              htmlFor="login-username"
            >
              Username
            </label>

            <div className="smart-login-input-wrap">

              <UserRound
                size={17}
                aria-hidden="true"
              />

              <input
                id="login-username"
                name="username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter your username"
                autoComplete="username"
                required
                disabled={isLoading}
                className="smart-login-input"
                style={{
                  backgroundColor: background,
                  color: text,
                  borderColor: border
                }}
              />

            </div>

          </div>

          {/* ==================================
              PASSWORD
              ================================== */}

          <div className="smart-login-field">

            <label
              className="smart-login-label"
              htmlFor="login-password"
            >
              Password
            </label>

            <div className="smart-login-input-wrap">

              <LockKeyhole
                size={17}
                aria-hidden="true"
              />

              <input
                id="login-password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="smart-login-input"
                style={{
                  backgroundColor: background,
                  color: text,
                  borderColor: border,
                  paddingRight: "48px"
                }}
              />

              <button
                type="button"
                className="smart-login-password-button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                disabled={isLoading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          {/* ==================================
              OPTIONS
              ================================== */}

          <div className="smart-login-form-options">

            <label className="smart-login-remember">

              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(event) =>
                  setRememberDevice(
                    event.target.checked
                  )
                }
                disabled={isLoading}
              />

              Remember this device

            </label>

            <button
              type="button"
              className="smart-login-forgot"
              onClick={() => {}}
            >
              Forgot password?
            </button>

          </div>

          {/* ==================================
              ERROR
              ================================== */}

          {error && (
            <div
              className="smart-login-error"
              role="alert"
            >

              <ShieldCheck
                size={16}
                aria-hidden="true"
              />

              <span>{error}</span>

            </div>
          )}

          {/* ==================================
              SUBMIT
              ================================== */}

          <button
            type="submit"
            className="smart-login-submit"
            disabled={isLoading}
            style={{
              background:
                `linear-gradient(135deg, ${primary}, ${primary})`
            }}
          >

            {isLoading ? (
              <>
                <span className="smart-login-spinner" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={17} />
              </>
            )}

          </button>

        </form>

        {/* ==================================
            SECURITY
            ================================== */}

        <div className="smart-login-security">

          <ShieldCheck
            size={15}
            style={{
              color: primary
            }}
          />

          Secure enterprise authentication

        </div>

        {/* ==================================
            FOOTER
            ================================== */}

        <div className="smart-login-footer">
          © {new Date().getFullYear()} Smart Inventory
          POS AI Enterprise Suite
          <br />
          Enterprise operations • Intelligence • Control
        </div>

      </div>

    </div>
  );
};

export default LoginForm;