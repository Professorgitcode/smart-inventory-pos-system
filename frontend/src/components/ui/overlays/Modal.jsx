import React, { useEffect } from "react";
import theme from "../../../theme/theme";
import { X } from "lucide-react";
import { Button } from "../forms/Button";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md", // sm, md, lg, xl
  isDark = false,
  closeOnOverlayClick = true,
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

  const getMaxWidth = () => {
    switch (size) {
      case "sm": return "440px";
      case "lg": return "800px";
      case "xl": return "1140px";
      case "md":
      default: return "600px";
    }
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDark ? "rgba(4, 7, 15, 0.6)" : "rgba(22, 48, 66, 0.4)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: mode.spacing.md,
    animation: "fadeIn 200ms ease-out forwards",
  };

  const windowStyle = {
    width: "100%",
    maxWidth: getMaxWidth(),
    background: isDark ? "rgba(18, 26, 47, 0.85)" : "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.4)"}`,
    borderRadius: mode.radius.xxl,
    boxShadow: mode.shadows.xl,
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
    fontFamily: mode.typography.fontFamily.primary,
    color: mode.colors.text,
    animation: "slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
  };

  return (
    <div 
      style={overlayStyle} 
      onClick={(e) => closeOnOverlayClick && e.target === e.currentTarget && onClose?.()}
    >
      <div style={windowStyle} {...props}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${mode.spacing.lg} ${mode.spacing.xl}`, borderBottom: `1px solid ${mode.colors.border}` }}>
          <h2 style={{ fontSize: mode.typography.fontSize.lg, fontWeight: mode.typography.fontWeight.bold, margin: 0 }}>
            {title}
          </h2>
          <Button variant="icon" isDark={isDark} onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </Button>
        </div>

        {/* Content */}
        <div style={{ padding: mode.spacing.xl, overflowY: "auto", fontSize: mode.typography.fontSize.sm, lineHeight: mode.typography.lineHeight.normal }}>
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
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};