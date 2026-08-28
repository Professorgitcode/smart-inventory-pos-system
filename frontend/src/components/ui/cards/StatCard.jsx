import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection = "neutral", // "up", "down", or "neutral"
  theme,
  isDark
}) => {
  const { colors, spacing, radius, typography, shadows, animations } = theme;

  // Determine trend colors and icons based on direction
  const getTrendConfig = () => {
    switch (trendDirection) {
      case "up":
        return {
          color: colors.success || "#10B981",
          bg: isDark ? "rgba(16, 185, 129, 0.1)" : "#D1FAE5",
          Icon: TrendingUp
        };
      case "down":
        return {
          color: colors.danger || "#EF4444",
          bg: isDark ? "rgba(239, 68, 68, 0.1)" : "#FEE2E2",
          Icon: TrendingDown
        };
      default:
        return {
          color: colors.textMuted || "#6B7280",
          bg: isDark ? "rgba(255, 255, 255, 0.05)" : "#F3F4F6",
          Icon: Minus
        };
    }
  };

  const trendConfig = getTrendConfig();
  const TrendIcon = trendConfig.Icon;

  return (
    <div
      style={{
        background: isDark ? "rgba(255, 255, 255, 0.03)" : colors.surface || "#ffffff",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : colors.border || "#E2E8F0"}`,
        borderRadius: radius.lg || "12px",
        padding: spacing.lg || "24px",
        display: "flex",
        flexDirection: "column",
        gap: spacing.md || "16px",
        boxShadow: isDark ? "none" : shadows.sm,
        transition: animations?.transition?.base || "all 0.2s ease-in-out",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = isDark 
          ? "0 4px 20px rgba(0, 0, 0, 0.4)" 
          : shadows.md;
        e.currentTarget.style.borderColor = isDark 
          ? "rgba(255, 255, 255, 0.15)" 
          : colors.borderDark || "#CBD5E1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isDark ? "none" : shadows.sm;
        e.currentTarget.style.borderColor = isDark 
          ? "rgba(255, 255, 255, 0.08)" 
          : colors.border || "#E2E8F0";
      }}
    >
      {/* Header: Title and Icon */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3
          style={{
            margin: 0,
            fontSize: typography.fontSize.sm || "14px",
            color: colors.textMuted || "#64748B",
            fontWeight: typography.fontWeight.medium,
            fontFamily: typography.fontFamily.primary,
          }}
        >
          {title}
        </h3>
        
        {Icon && (
          <div
            style={{
              padding: "8px",
              borderRadius: radius.md || "8px",
              background: isDark ? "rgba(255, 255, 255, 0.05)" : colors.surfaceHover || "#F1F5F9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color={colors.primary || "#3b82f6"} />
          </div>
        )}
      </div>

      {/* Body: Value and Trend */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: spacing.sm || "12px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: typography.fontSize.xxl || "28px",
            fontWeight: typography.fontWeight.extrabold,
            color: colors.text || (isDark ? "#F8FAFC" : "#0F172A"),
            fontFamily: typography.fontFamily.primary,
            letterSpacing: typography.letterSpacing?.tight || "-0.02em",
            lineHeight: 1,
          }}
        >
          {value}
        </h2>

        {trend && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 6px",
              borderRadius: radius.sm || "4px",
              background: trendConfig.bg,
              color: trendConfig.color,
              fontSize: "12px",
              fontWeight: typography.fontWeight.bold,
              marginBottom: "2px", // aligns nicely with the large text baseline
            }}
          >
            <TrendIcon size={12} strokeWidth={3} />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;