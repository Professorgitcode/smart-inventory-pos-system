// ====================================
// APPLICATION SESSION LOADER
// ====================================
//
// Visual-only application initialization
// / session restoration overlay.
//
// This component DOES NOT:
// - authenticate users
// - refresh tokens
// - call APIs
// - modify localStorage
//
// It only responds to isLoading.
// ====================================

import React, { useEffect, useState } from "react";

import {
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  TrendingUp
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

// ====================================
// COMPONENT
// ====================================

const AppRefreshLoader = ({
  isLoading,
  message = "Restoring your Smart Inventory session..."
}) => {
  const { theme, isDark } = useTheme();

  const [progress, setProgress] = useState(0);

  // ====================================
  // THEME
  // ====================================

  const colors = theme?.colors || {};

  const primary =
    colors.primary || "#2F8F83";

  const primaryDark =
    colors.primaryDark || "#176B64";

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

  // ====================================
  // VISUAL PROGRESS
  // ====================================
  //
  // This is NOT backend progress.
  // It is animation progress only.
  // ====================================

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return undefined;
    }

    setProgress(8);

    const timer1 = setTimeout(() => {
      setProgress(34);
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(58);
    }, 1200);

    const timer3 = setTimeout(() => {
      setProgress(76);
    }, 2000);

    const timer4 = setTimeout(() => {
      setProgress(88);
    }, 3200);

    const timer5 = setTimeout(() => {
      setProgress(94);
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isLoading]);

  // ====================================
  // HIDE AFTER COMPLETION
  // ====================================

  if (!isLoading && progress >= 100) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        width: "100vw",
        height: "100vh",

        zIndex: 2147483647,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        overflow: "hidden",

        backgroundColor: isDark
          ? "#080D16"
          : "#F4F8F9",

        color: text,

        fontFamily:
          theme?.typography?.fontFamily?.primary ||
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",

        isolation: "isolate"
      }}
    >

      {/* ==================================
          BACKGROUND EFFECTS
          ================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          top: "-180px",
          left: "-120px",
          background:
            `radial-gradient(circle, ${primary}20 0%, transparent 70%)`,
          filter: "blur(20px)",
          pointerEvents: "none"
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          right: "-120px",
          bottom: "-180px",
          background:
            `radial-gradient(circle, ${primaryDark}20 0%, transparent 70%)`,
          filter: "blur(20px)",
          pointerEvents: "none"
        }}
      />

      {/* ==================================
          CONTENT
          ================================== */}

      <div
        style={{
          position: "relative",
          zIndex: 10,

          width: "min(440px, calc(100vw - 40px))",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          textAlign: "center"
        }}
      >

        {/* ==================================
            BRAND
            ================================== */}

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",

            padding: "10px 16px",

            borderRadius: "14px",

            backgroundColor: isDark
              ? "rgba(255,255,255,0.05)"
              : surface,

            border:
              `1px solid ${border}`,

            boxShadow:
              "0 18px 45px rgba(0,0,0,0.08)"
          }}
        >

          <div
            style={{
              width: "36px",
              height: "36px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: "10px",

              backgroundColor:
                `${primary}18`,

              color: primary
            }}
          >
            <BrainCircuit size={19} />
          </div>

          <div
            style={{
              textAlign: "left"
            }}
          >
            <div
              style={{
                fontSize: "0.96rem",
                fontWeight: 800,
                letterSpacing: "-0.3px"
              }}
            >
              Smart Inventory
            </div>

            <div
              style={{
                marginTop: "2px",
                fontSize: "0.56rem",
                fontWeight: 800,
                letterSpacing: "1.6px",
                color: textMuted
              }}
            >
              AI ENTERPRISE SUITE
            </div>
          </div>

        </div>

        {/* ==================================
            RING
            ================================== */}

        <div
          style={{
            position: "relative",

            width: "132px",
            height: "132px",

            marginTop: "42px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >

          {/* Outer rotating ring */}

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,

              borderRadius: "50%",

              border:
                `3px solid ${primary}20`,

              borderTopColor: primary,

              animation:
                "sipos-refresh-spin 1.15s linear infinite"
            }}
          />

          {/* Inner dashed ring */}

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "12px",

              borderRadius: "50%",

              border:
                `1.5px dashed ${primaryDark}45`,

              animation:
                "sipos-refresh-spin-reverse 3.5s linear infinite"
            }}
          />

          {/* Core */}

          <div
            style={{
              width: "60px",
              height: "60px",

              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background:
                `linear-gradient(145deg, ${primary}, ${primaryDark})`,

              color: "#FFFFFF",

              boxShadow:
                `0 0 34px ${primary}55`
            }}
          >

            <Sparkles
              size={22}
              style={{
                animation:
                  "sipos-refresh-pulse 1.5s ease-in-out infinite"
              }}
            />

          </div>

        </div>

        {/* ==================================
            STATUS
            ================================== */}

        <div
          style={{
            marginTop: "27px"
          }}
        >

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",

              color: primary,

              fontSize: "0.68rem",
              fontWeight: 800,

              letterSpacing: "1.55px"
            }}
          >
            <Sparkles size={13} />

            SECURE SESSION
          </div>

          <div
            style={{
              marginTop: "10px",

              color: textMuted,

              fontSize: "0.88rem",
              lineHeight: 1.55,
              fontWeight: 500
            }}
          >
            {message}
          </div>

        </div>

        {/* ==================================
            PROGRESS BAR
            ================================== */}

        <div
          style={{
            width: "270px",
            maxWidth: "100%",

            height: "5px",

            marginTop: "28px",

            borderRadius: "999px",

            overflow: "hidden",

            backgroundColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "#DDE7E8"
          }}
        >

          <div
            style={{
              width: `${progress}%`,
              height: "100%",

              borderRadius: "999px",

              background:
                `linear-gradient(90deg, ${primaryDark}, ${primary})`,

              boxShadow:
                `0 0 14px ${primary}66`,

              transition:
                "width 420ms ease"
            }}
          />

        </div>

        {/* ==================================
            SYSTEM STATUS
            ================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            gap: "8px",

            marginTop: "22px",

            color: textMuted,

            fontSize: "0.68rem",
            fontWeight: 600
          }}
        >

          <ShieldCheck
            size={14}
            style={{
              color: primary
            }}
          />

          Establishing a secure application session

        </div>

        {/* ==================================
            INTELLIGENCE INDICATOR
            ================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",

            marginTop: "34px",

            color: textMuted,

            fontSize: "0.65rem"
          }}
        >

          <TrendingUp
            size={13}
            style={{
              color: primary
            }}
          />

          Intelligent operations platform

        </div>

      </div>

      {/* ==================================
          KEYFRAMES
          ================================== */}

      <style>{`
        @keyframes sipos-refresh-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sipos-refresh-spin-reverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes sipos-refresh-pulse {
          0% {
            transform: scale(0.86);
            opacity: 0.65;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }

          100% {
            transform: scale(0.86);
            opacity: 0.65;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sipos-session-loader *,
          .sipos-session-loader *::before,
          .sipos-session-loader *::after {
            animation: none !important;
          }
        }
      `}</style>

    </div>
  );
};

export default AppRefreshLoader;