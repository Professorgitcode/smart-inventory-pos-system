import React from "react";

/**
 * SidebarBadge
 *
 * Variants:
 * primary
 * success
 * warning
 * danger
 * neutral
 */

const SidebarBadge = ({
    text,
    variant = "primary",
    theme,
}) => {

    const { colors, radius, typography, spacing } = theme;

    const variants = {
        primary: {
            background: colors.primary,
            color: "#ffffff",
        },

        success: {
            background: colors.success,
            color: "#ffffff",
        },

        warning: {
            background: colors.warning,
            color: "#ffffff",
        },

        danger: {
            background: colors.error,
            color: "#ffffff",
        },

        neutral: {
            background: colors.surfaceSecondary || "rgba(255,255,255,0.08)",
            color: colors.textMuted,
        },
    };

    const selected =
        variants[variant] || variants.primary;

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                minWidth: 26,
                height: 20,

                padding: `0 ${spacing.xs}px`,

                borderRadius: radius.full,

                background: selected.background,
                color: selected.color,

                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.bold,

                letterSpacing: "0.4px",

                userSelect: "none",

                whiteSpace: "nowrap",
            }}
        >
            {text}
        </span>
    );
};

export default SidebarBadge;