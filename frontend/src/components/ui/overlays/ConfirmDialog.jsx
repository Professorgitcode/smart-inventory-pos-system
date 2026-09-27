import React, { useId, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import theme from "../../../theme/theme";
import { Button } from "../forms/Button";
import { Modal } from "./Modal";

// Presentation-only confirmation UI. Feature components own the action.
export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default", // default, danger
  onConfirm,
  onCancel,
  loading = false,
  isDark = false,
}) => {
  const mode = theme.getMode(isDark);
  const cancelButtonRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const isDanger = variant === "danger";

  return (
    <Modal
      isOpen={open}
      onClose={loading ? undefined : onCancel}
      title={title}
      titleId={titleId}
      size="sm"
      isDark={isDark}
      closeOnOverlayClick={!loading}
      initialFocusRef={cancelButtonRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      footer={(
        <>
          <Button
            ref={cancelButtonRef}
            type="button"
            variant="secondary"
            isDark={isDark}
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={isDanger ? "danger" : "primary"}
            isDark={isDark}
            onClick={onConfirm}
            isLoading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      )}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: mode.spacing.sm }}>
        {isDanger && (
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              flexShrink: 0,
              padding: mode.spacing.xs,
              borderRadius: mode.radius.full,
              background: mode.colors.dangerBg,
              color: mode.colors.danger,
            }}
          >
            <AlertTriangle size={18} />
          </div>
        )}
        <p
          id={descriptionId}
          style={{
            margin: 0,
            color: mode.colors.textMuted,
            fontSize: mode.typography.fontSize.sm,
            lineHeight: mode.typography.lineHeight.normal,
          }}
        >
          {message}
        </p>
      </div>
    </Modal>
  );
};
