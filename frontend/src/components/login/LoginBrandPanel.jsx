// ====================================
// LOGIN BRAND PANEL
// ====================================
//
// Presentation-only component.
//
// Contains Smart Inventory branding,
// product positioning, feature list,
// and intelligence visualization.
// ====================================

import React from "react";

import {
  BrainCircuit,
  Package,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Truck,
  Warehouse
} from "lucide-react";

import LoginIntelligenceVisual
  from "./LoginIntelligenceVisual";

// ====================================
// FEATURES
// ====================================

const FEATURES = [
  {
    icon: Package,
    label: "Intelligent inventory control"
  },
  {
    icon: ShoppingCart,
    label: "Point-of-sale operations"
  },
  {
    icon: TrendingUp,
    label: "Sales intelligence & forecasting"
  },
  {
    icon: Truck,
    label: "Supplier performance management"
  },
  {
    icon: BrainCircuit,
    label: "AI-assisted procurement"
  }
];

// ====================================
// COMPONENT
// ====================================

const LoginBrandPanel = ({
  primary,
  primaryDark
}) => {
  return (
    <section
      className="smart-login-brand"
      aria-label="Smart Inventory product overview"
    >

      {/* ==================================
          BRAND HEADER
          ================================== */}

      <div className="smart-login-brand-header">

        <div className="smart-login-logo">

          <div className="smart-login-logo-mark">
            <Warehouse size={20} />
          </div>

          <div>

            <div className="smart-login-logo-name">
              Smart Inventory
            </div>

            <div className="smart-login-logo-subtitle">
              AI ENTERPRISE SUITE
            </div>

          </div>

        </div>

      </div>

      {/* ==================================
          CONTENT
          ================================== */}

      <div className="smart-login-brand-content">

        <div className="smart-login-eyebrow">
          <Sparkles size={13} />
          Intelligent business operations
        </div>

        <h1 className="smart-login-brand-title">
          Smarter inventory.
          <br />

          <span className="smart-login-brand-highlight">
            Better decisions.
          </span>
        </h1>

        <p className="smart-login-brand-description">
          One intelligent workspace for inventory,
          point-of-sale, supplier performance,
          forecasting and AI-assisted procurement.
        </p>

        {/* ==================================
            FEATURES
            ================================== */}

        <div className="smart-login-features">

          {FEATURES.map(
            ({
              icon: Icon,
              label
            }) => (
              <div
                key={label}
                className="smart-login-feature"
              >

                <div className="smart-login-feature-icon">
                  <Icon size={15} />
                </div>

                <span>{label}</span>

              </div>
            )
          )}

        </div>

        {/* ==================================
            VISUALIZATION
            ================================== */}

        <LoginIntelligenceVisual
          primary={primary}
          primaryDark={primaryDark}
        />

      </div>

      {/* ==================================
          FOOTER
          ================================== */}

      <div className="smart-login-brand-footer">

        <ShieldIcon />

        Enterprise inventory intelligence platform

      </div>

    </section>
  );
};

// ====================================
// SMALL PRESENTATIONAL ICON
// ====================================

const ShieldIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-flex",
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "currentColor"
    }}
  />
);

export default LoginBrandPanel;