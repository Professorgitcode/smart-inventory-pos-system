import React, { useEffect } from "react";
import theme from "../../../theme/theme";
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Button } from "../forms/Button";

export const Toast = ({
  message,
  description,
  variant = "info", // success, warning, danger, info
  isDark = false,
  onClose,
  duration = 4000,
  style = {},
  ...props
}) => {
  const mode = theme.getMode(isDark);

  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => onClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (variant) {
      case "success": return <CheckCircle size={20} color={mode.colors.success} />;
      case "warning": return <AlertTriangle size={20} color={mode.colors.warning} />;
      case "danger": return <AlertCircle size={20} color={mode.colors.danger} />;
      case "info":
      default: return <Info size={20} color={mode.colors.info} />;
    }
  };

  const toastStyles = {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    display: "flex",
    gap: mode.spacing.md,
    width: "360px",
    padding: mode.spacing.md,
    backgroundColor: mode.colors.surface,
    borderLeft: `4px solid ${variant === "success" ? mode.colors.success : variant === "warning" ? mode.colors.warning : variant === "danger" ? mode.colors.danger : mode.colors.info}`,
    borderRadius: mode.radius.md,
    boxShadow: mode.shadows.lg,
    zIndex: 2000,
    fontFamily: mode.typography.fontFamily.primary,
    animation: "toastSlideIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
    ...style,
  };

  return (
    <div style={toastStyles} {...props}>
      <div style={{ flexShrink: 0, marginTop: "2px" }}>{getIcon()}</div>
      <div style={{ flexGrow: 1 }}>
        <div style={{ fontSize: mode.typography.fontSize.sm, fontWeight: mode.typography.fontWeight.semibold, color: mode.colors.text }}>{message}</div>
        {description && <div style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.textMuted, marginTop: "4px" }}>{description}</div>}
      </div>
      {onClose && (
        <div style={{ flexShrink: 0 }}>
          <Button variant="icon" isDark={isDark} onClick={onClose} style={{ padding: "2px" }}>
            <X size={14} />
          </Button>
        </div>
      )}
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};