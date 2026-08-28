import React, { useState } from "react";
import { CalendarDays, Clock3, Sparkles, Bell } from "lucide-react";

const EnterpriseDashboardHeader = ({ theme, user = "Albert" }) => {
  const { colors, typography, radius } = theme;
  const isDark = theme.mode === "dark" || colors.background.includes("0F") || colors.text === "#ffffff";
  const today = new Date();

  const date = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const time = today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "32px",
        fontFamily: typography.fontFamily.primary
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Intelligence Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(59, 130, 246, 0.1)",
            padding: "6px 12px",
            borderRadius: radius.full,
            width: "fit-content",
            border: `1px solid rgba(59, 130, 246, 0.2)`
          }}
        >
          <Sparkles size={16} color={colors.primary || "#3b82f6"} />
          <span
            style={{
              color: colors.primary || "#3b82f6",
              fontWeight: typography.fontWeight.bold,
              fontSize: "12px",
              letterSpacing: "0.5px"
            }}
          >
            Enterprise Intelligence Dashboard
          </span>
        </div>

        {/* Greeting */}
        <h1
          style={{
            margin: 0,
            fontSize: typography.fontSize.xxl || "32px",
            fontWeight: typography.fontWeight.extrabold,
            color: colors.text, // Theme aware
            letterSpacing: typography.letterSpacing.tight
          }}
        >
          Good Morning, {user.split(" ")[0]}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: 0,
            fontSize: typography.fontSize.md || "15px",
            color: colors.text,
            opacity: 0.6, // Theme aware muting
            fontWeight: typography.fontWeight.medium
          }}
        >
          Monitor inventory, sales, suppliers and AI insights from one place.
        </p>
      </div>

      {/* Info Cards Matrix */}
      <div style={{ display: "flex", gap: "16px" }}>
        <InfoCard theme={theme} isDark={isDark} icon={<CalendarDays size={16} />} title="Today" value={date} />
        <InfoCard theme={theme} isDark={isDark} icon={<Clock3 size={16} />} title="Current Time" value={time} />
        <InfoCard theme={theme} isDark={isDark} icon={<Bell size={16} />} title="Notifications" value="3 Alerts" />
      </div>
    </div>
  );
};

const InfoCard = ({ theme, isDark, icon, title, value }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { colors, radius, typography, shadows } = theme;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered 
          ? (isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.02)") 
          : colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg || "16px",
        padding: "16px 20px",
        minWidth: "160px",
        transition: "all 0.3s ease",
        boxShadow: isHovered ? shadows.md : "none",
        cursor: "default"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: colors.primary || "#3b82f6",
          marginBottom: "12px",
          opacity: 0.85
        }}
      >
        {icon}
        <span
          style={{
            fontWeight: typography.fontWeight.semibold,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          fontWeight: typography.fontWeight.bold,
          color: colors.text, // Theme aware
          fontSize: "14px",
          letterSpacing: "0.2px"
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default EnterpriseDashboardHeader;