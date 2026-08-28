import React, { useEffect } from "react";
import theme from "../../../theme/theme";
import { X } from "lucide-react";
import { Button } from "../forms/Button";

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  placement = "right", // right, left
  size = "md",          // sm, md, lg
  isDark = false,
  ...props
}) => {
  const mode = theme.getMode(isDark);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose?.();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getWidth = () => {
    switch (size) {
      case "sm": return "360px";
      case "lg": return "640px";
      case "md":
      default: return "480px";
    }
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDark ? "rgba(4, 7, 15, 0.6)" : "rgba(22, 48, 66, 0.4)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    zIndex: 1000,
    animation: "fadeIn 200ms ease-out forwards",
  };

  const panelStyle = {
    position: "fixed",
    top: 0,
    bottom: 0,
    [placement]: 0,
    width: "100%",
    maxWidth: getWidth(),
    background: isDark ? "rgba(18, 26, 47, 0.9)" : "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderLeft: placement === "right" ? `1px solid ${mode.colors.border}` : "none",
    borderRight: placement === "left" ? `1px solid ${mode.colors.border}` : "none",
    boxShadow: mode.shadows.xl,
    display: "flex",
    flexDirection: "column",
    zIndex: 1001,
    fontFamily: mode.typography.fontFamily.primary,
    color: mode.colors.text,
    animation: `${placement === "right" ? "slideInRight" : "slideInLeft"} 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={panelStyle} {...props}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", justifyContent: "space-between", padding: `${mode.spacing.lg} ${mode.spacing.xl}`, borderBottom: `1px solid ${mode.colors.border}` }}>
          <h2 style={{ fontSize: mode.typography.fontSize.md, fontWeight: mode.typography.fontWeight.bold, margin: 0, textTransform: "uppercase", letterSpacing: mode.typography.letterSpacing.wide }}>
            {title}
          </h2>
          <Button variant="icon" isDark={isDark} onClick={onClose} aria-label="Close drawer">
            <X size={18} />
          </Button>
        </div>

        {/* Content */}
        <div style={{ padding: mode.spacing.xl, overflowY: "auto", flex: 1, fontSize: mode.typography.fontSize.sm }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{ padding: `${mode.spacing.md} ${mode.spacing.xl}`, borderTop: `1px solid ${mode.colors.border}`, display: "flex", justifyContent: "flex-end", gap: mode.spacing.sm, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
};