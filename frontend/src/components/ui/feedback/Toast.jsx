// ====================================
// SHARED TOAST
// ====================================
//
// Canonical application notification UI.
//
// Responsibilities:
// - Display success/error/warning/info feedback
// - Provide animated entrance/exit
// - Provide automatic dismissal
// - Support light/dark themes
// - Use shared design-system primitives
//
// This component contains presentation
// logic only.
//
// Business operations remain in pages,
// business hooks, repositories and services.
// ====================================

import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import theme from "../../../theme/theme";

import {
    CheckCircle,
    AlertTriangle,
    AlertCircle,
    Info,
    X
} from "lucide-react";

import {
    Button
} from "../forms/Button";

// ====================================
// COMPONENT
// ====================================

export const Toast = ({
    header = "",
    message = "",
    type = "info",
    isVisible = false,
    isDark = false,
    onClose,
    duration = 4500,
    style = {}
}) => {

    // ====================================
    // THEME
    // ====================================

    const mode =
        theme.getMode(isDark);

    // ====================================
    // EXIT STATE
    // ====================================

    const [
        isExiting,
        setIsExiting
    ] = useState(false);

    // ====================================
    // CLOSE
    // ====================================

    const handleClose =
        useCallback(() => {

            if (!isVisible) {
                return;
            }

            setIsExiting(true);

            setTimeout(() => {

                onClose?.();

                setIsExiting(false);

            }, 300);

        }, [
            isVisible,
            onClose
        ]);

    // ====================================
    // AUTOMATIC DISMISSAL
    // ====================================

    useEffect(() => {

        if (
            !isVisible ||
            duration <= 0
        ) {
            return undefined;
        }

        setIsExiting(false);

        const timer =
            setTimeout(() => {

                handleClose();

            }, duration);

        return () =>
            clearTimeout(timer);

    }, [
        isVisible,
        duration,
        handleClose
    ]);

    // ====================================
    // VISUAL CONFIGURATION
    // ====================================

    const typeConfig = {

        success: {
            background:
                mode.colors.success,

            icon: (
                <CheckCircle
                    size={22}
                />
            ),

            label:
                "Success",

            accent:
                mode.colors.textInverse
        },

        error: {
            background:
                mode.colors.danger,

            icon: (
                <AlertCircle
                    size={22}
                />
            ),

            label:
                "Error",

            accent:
                mode.colors.textInverse
        },

        warning: {
            background:
                mode.colors.warning,

            icon: (
                <AlertTriangle
                    size={22}
                />
            ),

            label:
                "Warning",

            accent:
                mode.colors.textInverse
        },

        info: {
            background:
                mode.colors.info,

            icon: (
                <Info
                    size={22}
                />
            ),

            label:
                "Information",

            accent:
                mode.colors.textInverse
        }

    };

    const config =
        typeConfig[type] ||
        typeConfig.info;

    // ====================================
    // VISIBILITY
    // ====================================

    if (
        !isVisible &&
        !isExiting
    ) {
        return null;
    }

    // ====================================
    // CONTAINER STYLES
    // ====================================

    const containerStyle = {

        position: "fixed",

        top: "24px",

        right: "24px",

        width: "360px",

        maxWidth:
            "calc(100vw - 48px)",

        backgroundColor:
            config.background,

        color:
            config.accent,

        borderRadius:
            mode.radius.md,

        boxShadow:
            mode.shadows.xl,

        display: "flex",

        flexDirection: "column",

        overflow: "hidden",

        zIndex: 9999,

        animation:
            isExiting
                ? "toastSlideOut 300ms ease-in forwards"
                : "toastSlideIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",

        ...style

    };

    // ====================================
    // CONTENT STYLES
    // ====================================

    const contentStyle = {

        padding:
            mode.spacing.md,

        display: "flex",

        gap:
            mode.spacing.md,

        alignItems: "flex-start"

    };

    const iconStyle = {

        color:
            config.accent,

        marginTop: "2px",

        flexShrink: 0

    };

    const textContainerStyle = {

        flex: 1,

        minWidth: 0

    };

    const headerStyle = {

        fontWeight:
            mode.typography
                .fontWeight
                .bold,

        fontSize:
            mode.typography
                .fontSize
                .sm,

        letterSpacing:
            "0.2px",

        lineHeight:
            mode.typography
                .lineHeight
                .normal

    };

    const messageStyle = {

        margin: 0,

        marginTop: header
            ? "4px"
            : "0",

        fontSize:
            mode.typography
                .fontSize
                .xs,

        fontWeight:
            mode.typography
                .fontWeight
                .medium,

        opacity: 0.95,

        lineHeight:
            mode.typography
                .lineHeight
                .normal

    };

    // ====================================
    // RENDER
    // ====================================

    return (

        <>

            {/* ==================================
                ANIMATION DEFINITIONS
                ================================== */}

            <style>{`

                @keyframes toastSlideIn {

                    from {
                        opacity: 0;
                        transform:
                            translateX(100%);
                    }

                    to {
                        opacity: 1;
                        transform:
                            translateX(0);
                    }

                }

                @keyframes toastSlideOut {

                    from {
                        opacity: 1;
                        transform:
                            translateX(0);
                    }

                    to {
                        opacity: 0;
                        transform:
                            translateX(100%);
                    }

                }

                @keyframes toastProgress {

                    from {
                        width: 100%;
                    }

                    to {
                        width: 0%;
                    }

                }

            `}</style>

            <div
                style={containerStyle}
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >

                {/* ==================================
                    TOAST CONTENT
                    ================================== */}

                <div
                    style={contentStyle}
                >

                    {/* ==================================
                        ICON
                        ================================== */}

                    <div
                        style={iconStyle}
                        aria-hidden="true"
                    >
                        {config.icon}
                    </div>

                    {/* ==================================
                        MESSAGE
                        ================================== */}

                    <div
                        style={
                            textContainerStyle
                        }
                    >

                        {header && (

                            <div
                                style={
                                    headerStyle
                                }
                            >
                                {header}
                            </div>

                        )}

                        {message && (

                            <p
                                style={
                                    messageStyle
                                }
                            >
                                {message}
                            </p>

                        )}

                    </div>

                    {/* ==================================
                        CLOSE BUTTON
                        ================================== */}

                    {onClose && (

                        <Button

                            variant="icon"

                            isDark={
                                isDark
                            }

                            onClick={
                                handleClose
                            }

                            icon={X}

                            aria-label={
                                "Close notification"
                            }

                            style={{
                                color:
                                    config.accent,

                                padding:
                                    mode.spacing
                                        .xxs ||
                                    "4px",

                                flexShrink: 0
                            }}

                        />

                    )}

                </div>

                {/* ==================================
                    PROGRESS BAR
                    ================================== */}

                {duration > 0 && (

                    <div
                        aria-hidden="true"
                        style={{
                            height: "5px",

                            width: "100%",

                            backgroundColor:
                                "rgba(0, 0, 0, 0.15)"
                        }}
                    >

                        <div
                            style={{
                                height:
                                    "100%",

                                width:
                                    "100%",

                                backgroundColor:
                                    config.accent,

                                animation:
                                    isExiting
                                        ? "none"
                                        : `toastProgress ${duration}ms linear forwards`
                            }}
                        />

                    </div>

                )}

            </div>

        </>
    );
};