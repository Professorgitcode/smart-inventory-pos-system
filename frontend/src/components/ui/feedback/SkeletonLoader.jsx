import React from "react";
import theme from "../../../theme/theme";

export const SkeletonLoader = ({
  variant = "text", // text, rect, circle
  width = "100%",
  height,
  isDark = false,
  style = {},
  ...props
}) => {
  const mode = theme.getMode(isDark);

  const getFinalHeight = () => {
    if (height) return height;
    if (variant === "text") return mode.typography.fontSize.sm;
    if (variant === "circle") return "40px";
    return "100px";
  };

  const skeletonStyles = {
    width: variant === "circle" && !height ? "40px" : width,
    height: getFinalHeight(),
    borderRadius: variant === "circle" ? mode.radius.full : variant === "text" ? "4px" : mode.radius.md,
    backgroundColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(52, 114, 156, 0.08)",
    animation: "pulseSkeleton 1.5s ease-in-out infinite",
    ...style,
  };

  return (
    <div style={skeletonStyles} {...props}>
      <style>{`
        @keyframes pulseSkeleton {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};