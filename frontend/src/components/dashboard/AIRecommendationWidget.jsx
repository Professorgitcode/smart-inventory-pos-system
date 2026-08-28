import React from "react";
import { BrainCircuit, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";

const AIRecommendationWidget = ({ theme }) => {
  const { colors, radius, typography } = theme;
  const isDark = theme.mode === "dark" || colors.text === "#ffffff";

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.xl || "24px",
        padding: "28px",
        marginBottom: "32px",
        fontFamily: typography.fontFamily.primary
      }}
    >
      {/* Widget Header Area */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px"
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            padding: "12px",
            borderRadius: radius.md || "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <BrainCircuit size={24} color="#3b82f6" />
        </div>

        <div>
          <div
            style={{
              fontWeight: typography.fontWeight.extrabold,
              fontSize: "18px",
              color: colors.text,
              letterSpacing: "0.2px",
              marginBottom: "2px"
            }}
          >
            AI Recommendation Engine
          </div>
          <div
            style={{
              color: colors.text,
              opacity: 0.6,
              fontSize: "13px",
              fontWeight: typography.fontWeight.medium
            }}
          >
            Live recommendations generated from inventory analytics
          </div>
        </div>
      </div>

      {/* Intelligence Cards Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px"
        }}
      >
        <RecommendationCard
          theme={theme}
          isDark={isDark}
          color="#EF4444"
          icon={<AlertTriangle size={18} />}
          title="Urgent"
          description="Samsung A15 stock may be depleted within 4 days."
        />
        <RecommendationCard
          theme={theme}
          isDark={isDark}
          color="#10B981"
          icon={<TrendingUp size={18} />}
          title="Opportunity"
          description="Increase Tecno Spark inventory by 20%."
        />
        <RecommendationCard
          theme={theme}
          isDark={isDark}
          color="#3b82f6"
          icon={<CheckCircle2 size={18} />}
          title="Healthy"
          description="Current inventory turnover is above target."
        />
      </div>
    </div>
  );
};

const RecommendationCard = ({ theme, isDark, icon, title, description, color }) => {
  const { colors, radius, typography } = theme;
  
  return (
    <div
      style={{
        borderRadius: radius.lg || "16px",
        padding: "20px",
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
        background: isDark ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.02)", 
        transition: "border-color 0.2s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color}40`}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "12px",
          color: color
        }}
      >
        {icon}
        <span
          style={{
            fontWeight: typography.fontWeight.bold,
            fontSize: "14px",
            letterSpacing: "0.5px"
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          color: colors.text,
          opacity: 0.8,
          lineHeight: 1.5,
          fontSize: "14px",
          fontWeight: typography.fontWeight.regular
        }}
      >
        {description}
      </div>
    </div>
  );
};

export default AIRecommendationWidget;