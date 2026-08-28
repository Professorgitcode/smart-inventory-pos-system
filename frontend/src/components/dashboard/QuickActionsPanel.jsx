import React from "react";
import {
  ShoppingCart,
  Package,
  Truck,
  FileBarChart2,
  BrainCircuit,
  Boxes
} from "lucide-react";

const actions = [
  { title: "New Sale", subtitle: "Open POS", icon: ShoppingCart, color: "#3b82f6" },
  { title: "Add Product", subtitle: "Inventory", icon: Package, color: "#10B981" },
  { title: "Supplier", subtitle: "Management", icon: Truck, color: "#F59E0B" },
  { title: "Reports", subtitle: "Analytics", icon: FileBarChart2, color: "#8B5CF6" },
  { title: "AI Forecast", subtitle: "Predictions", icon: BrainCircuit, color: "#06B6D4" },
  { title: "Inventory", subtitle: "Overview", icon: Boxes, color: "#EF4444" }
];

const QuickActionsPanel = ({ theme }) => {
  const { colors, radius, typography, shadows } = theme;
  const isDark = theme.mode === "dark" || colors.text === "#ffffff";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "20px",
        marginBottom: "32px",
        fontFamily: typography.fontFamily.primary
      }}
    >
      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <div
            key={index}
            style={{
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.xl || "20px",
              padding: "24px",
              cursor: "pointer",
              transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.02)";
              e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.boxShadow = shadows.lg || "0 12px 24px -10px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.background = colors.surface;
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Icon Wrapper Matrix */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: radius.md || "14px",
                background: `${action.color}15`,
                border: `1px solid ${action.color}30`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <Icon size={22} color={action.color} />
            </div>

            <div
              style={{
                fontWeight: typography.fontWeight.bold,
                color: colors.text, // Theme aware
                fontSize: typography.fontSize.md || "15px",
                marginBottom: "4px",
                letterSpacing: "0.2px"
              }}
            >
              {action.title}
            </div>

            <div
              style={{
                color: colors.text,
                opacity: 0.5, // Theme aware muting
                fontSize: typography.fontSize.sm || "13px",
                fontWeight: typography.fontWeight.medium
              }}
            >
              {action.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickActionsPanel;