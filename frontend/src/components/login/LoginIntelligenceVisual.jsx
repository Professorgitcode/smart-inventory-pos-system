// ====================================
// LOGIN INTELLIGENCE VISUAL
// ====================================
//
// Decorative business-intelligence
// visualization used on the login page.
//
// UI only.
// No authentication logic.
// ====================================

import React from "react";

const LoginIntelligenceVisual = ({
  primary,
  primaryDark
}) => {
  return (
    <div
      className="smart-login-visual"
      aria-hidden="true"
    >

      <svg
        className="smart-login-chart"
        viewBox="0 0 600 180"
        preserveAspectRatio="none"
      >

        <defs>

          <linearGradient
            id="smartLoginArea"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#D6FFF9"
              stopOpacity="0.35"
            />

            <stop
              offset="100%"
              stopColor="#D6FFF9"
              stopOpacity="0"
            />
          </linearGradient>

        </defs>

        <g className="smart-login-chart-grid">

          <line
            x1="0"
            y1="35"
            x2="600"
            y2="35"
          />

          <line
            x1="0"
            y1="80"
            x2="600"
            y2="80"
          />

          <line
            x1="0"
            y1="125"
            x2="600"
            y2="125"
          />

        </g>

        <path
          className="smart-login-chart-area"
          d="
            M 0 145
            L 80 130
            L 145 138
            L 220 95
            L 295 108
            L 365 72
            L 440 84
            L 515 38
            L 600 22
            L 600 180
            L 0 180
            Z
          "
        />

        <polyline
          className="smart-login-chart-line"
          points="
            0,145
            80,130
            145,138
            220,95
            295,108
            365,72
            440,84
            515,38
            600,22
          "
        />

        <circle
          className="smart-login-chart-dot"
          cx="365"
          cy="72"
          r="5"
        />

        <circle
          className="smart-login-chart-dot"
          cx="515"
          cy="38"
          r="5"
        />

      </svg>

      {/* ==================================
          DATA CARD
          ================================== */}

      <div className="smart-login-data-card one">

        <div className="smart-login-data-icon">
          ↗
        </div>

        <div>
          <div className="smart-login-data-label">
            Forecast accuracy
          </div>

          <div className="smart-login-data-value">
            AI optimized
          </div>
        </div>

      </div>

      {/* ==================================
          SECOND DATA CARD
          ================================== */}

      <div className="smart-login-data-card two">

        <div className="smart-login-data-icon">
          ▥
        </div>

        <div>
          <div className="smart-login-data-label">
            Business intelligence
          </div>

          <div className="smart-login-data-value">
            Real-time visibility
          </div>
        </div>

      </div>

    </div>
  );
};

export default LoginIntelligenceVisual;