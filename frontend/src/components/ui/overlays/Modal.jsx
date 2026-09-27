import React, { useEffect, useRef, useId, useState } from "react";
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
  initialFocusRef,
  titleId: providedTitleId,
  ...props
}) => {
  const mode = theme.getMode(isDark);
  const generatedTitleId = useId();
  const titleId = providedTitleId || generatedTitleId;
  const previouslyFocusedElement = useRef(null);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
      return undefined;
    }

    if (!isRendered) return undefined;

    setIsClosing(true);
    const closeTimer = window.setTimeout(() => {
      setIsRendered(false);
      setIsClosing(false);
    }, Number.parseInt(mode.animations.duration.normal, 10));

    return () => window.clearTimeout(closeTimer);
  }, [isOpen, isRendered, mode.animations.duration.normal]);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose?.();
      };
      window.addEventListener("keydown", handleKeyDown);
      initialFocusRef?.current?.focus();
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
        previouslyFocusedElement.current?.focus?.();
      };
    }
  }, [isOpen, onClose, initialFocusRef]);

  if (!isRendered) return null;

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
    animation: isClosing
      ? `modalOverlayOut ${mode.animations.duration.normal} ${mode.animations.easing.easeIn} forwards`
      : `modalOverlayIn ${mode.animations.duration.normal} ${mode.animations.easing.easeOut} forwards`,
    willChange: "opacity",
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
    animation: isClosing
      ? `modalWindowOut ${mode.animations.duration.normal} ${mode.animations.easing.easeIn} forwards`
      : `modalWindowIn ${mode.animations.duration.normal} ${mode.animations.easing.easeOut} forwards`,
    transformOrigin: "center center",
    willChange: "opacity, transform",
  };

  return (
    <div 
      data-ui-modal-overlay
      style={overlayStyle} 
      onClick={(e) => closeOnOverlayClick && e.target === e.currentTarget && onClose?.()}
    >
      <div style={windowStyle} {...props}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${mode.spacing.lg} ${mode.spacing.xl}`, borderBottom: `1px solid ${mode.colors.border}` }}>
          <h2 id={titleId} style={{ fontSize: mode.typography.fontSize.lg, fontWeight: mode.typography.fontWeight.bold, margin: 0 }}>
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
        @keyframes modalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modalWindowIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modalWindowOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(16px) scale(0.98); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-ui-modal-overlay],
          [role="dialog"] { animation-duration: 1ms !important; }
        }
      `}</style>
    </div>
  );
};
