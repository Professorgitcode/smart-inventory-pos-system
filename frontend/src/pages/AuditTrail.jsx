// ====================================
// AUDIT TRAIL PAGE
// ====================================
//
// Administrative audit-log shell.
//
// Current state:
// - The application has authentication
//   and authorization.
// - A backend audit-log API is not yet
//   implemented.
//
// Therefore this page must not present
// fabricated audit events or metrics.
//
// Future architecture:
//
// Page
//   ↓
// useAuditTrail()
//   ↓
// AuditRepository
//   ↓
// AuditService
//   ↓
// apiClient
//   ↓
// Audit/Event API
//
// Audit records should ultimately be
// generated from actual system operations.
// ====================================

import React from "react";

import {
    ShieldCheck,
    FileText,
    Activity,
    AlertTriangle
} from "lucide-react";

import {
    Card,
    EmptyState
} from "../components/ui";

import {
    useTheme
} from "../context/ThemeContext";

// ====================================
// COMPONENT
// ====================================

const AuditTrail = () => {

    const {
        theme,
        isDark
    } = useTheme();

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing.lg
            }}
        >

            {/* ==================================
                PAGE HEADER
                ================================== */}

            <div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing.sm
                    }}
                >

                    <div
                        style={{
                            width: "42px",
                            height: "42px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius:
                                theme.radius.md,
                            backgroundColor:
                                isDark
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(52,114,156,0.08)",
                            color:
                                theme.colors.primary
                        }}
                    >
                        <ShieldCheck size={21} />
                    </div>

                    <div>

                        <h1
                            style={{
                                margin: 0,
                                fontSize:
                                    theme.typography
                                        .fontSize.xxl,
                                fontWeight:
                                    theme.typography
                                        .fontWeight
                                        .extrabold,
                                color:
                                    theme.colors.text,
                                letterSpacing:
                                    theme.typography
                                        .letterSpacing
                                        .tight
                            }}
                        >
                            Audit Trail
                        </h1>

                        <p
                            style={{
                                margin:
                                    `${theme.spacing.xxs} 0 0`,
                                color:
                                    theme.colors.textMuted,
                                fontSize:
                                    theme.typography
                                        .fontSize.sm
                            }}
                        >
                            Administrative visibility into system
                            actions, security events, and data changes.
                        </p>

                    </div>

                </div>

            </div>

            {/* ==================================
                FEATURE STATUS
                ================================== */}

            <Card
                variant="glass"
                isDark={isDark}
                padding="lg"
            >

                <EmptyState
                    icon={ShieldCheck}
                    isDark={isDark}
                    title="Audit logging is not connected yet"
                    description={
                        "The current application does not yet expose a backend audit-event API. No fabricated audit events, security counts, or response-time metrics are displayed."
                    }
                />

            </Card>

            {/* ==================================
                PLANNED AUDIT CAPABILITIES
                ================================== */}

            <Card
                variant="glass"
                isDark={isDark}
                padding="lg"
            >

                <div
                    style={{
                        marginBottom:
                            theme.spacing.lg
                    }}
                >

                    <h2
                        style={{
                            margin: 0,
                            fontSize:
                                theme.typography
                                    .fontSize.md,
                            fontWeight:
                                theme.typography
                                    .fontWeight
                                    .bold,
                            color:
                                theme.colors.text
                        }}
                    >
                        Planned audit capabilities
                    </h2>

                    <p
                        style={{
                            margin:
                                `${theme.spacing.xxs} 0 0`,
                            fontSize:
                                theme.typography
                                    .fontSize.xs,
                            color:
                                theme.colors.textMuted,
                            lineHeight:
                                theme.typography
                                    .lineHeight
                                    .normal
                        }}
                    >
                        These describe future capabilities and do not
                        represent current system data.
                    </p>

                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: theme.spacing.md
                    }}
                >

                    <CapabilityCard
                        theme={theme}
                        isDark={isDark}
                        icon={FileText}
                        title="Event history"
                        description={
                            "Record significant application actions with timestamps, actors, affected resources, and event details."
                        }
                    />

                    <CapabilityCard
                        theme={theme}
                        isDark={isDark}
                        icon={ShieldCheck}
                        title="Security events"
                        description={
                            "Capture authentication, authorization, account, and other security-relevant events."
                        }
                    />

                    <CapabilityCard
                        theme={theme}
                        isDark={isDark}
                        icon={AlertTriangle}
                        title="High-risk actions"
                        description={
                            "Identify sensitive operations such as destructive administrative actions and configuration changes."
                        }
                    />

                    <CapabilityCard
                        theme={theme}
                        isDark={isDark}
                        icon={Activity}
                        title="Filtering and investigation"
                        description={
                            "Support searching and filtering audit records by actor, module, event type, severity, and time range."
                        }
                    />

                </div>

            </Card>

        </div>
    );
};

// ====================================
// CAPABILITY CARD
// ====================================

const CapabilityCard = ({
    theme,
    isDark,
    icon: Icon,
    title,
    description
}) => {

    return (

        <div
            style={{
                padding: theme.spacing.md,
                border:
                    `1px solid ${theme.colors.border}`,
                borderRadius:
                    theme.radius.lg,
                backgroundColor:
                    isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(52,114,156,0.03)"
            }}
        >

            <div
                style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius:
                        theme.radius.md,
                    backgroundColor:
                        isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(52,114,156,0.08)",
                    color:
                        theme.colors.primary,
                    marginBottom:
                        theme.spacing.sm
                }}
            >
                <Icon size={18} />
            </div>

            <h3
                style={{
                    margin:
                        `0 0 ${theme.spacing.xs}`,
                    color:
                        theme.colors.text,
                    fontSize:
                        theme.typography
                            .fontSize.sm,
                    fontWeight:
                        theme.typography
                            .fontWeight
                            .bold
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    margin: 0,
                    color:
                        theme.colors.textMuted,
                    fontSize:
                        theme.typography
                            .fontSize.xs,
                    lineHeight:
                        theme.typography
                            .lineHeight
                            .normal
                }}
            >
                {description}
            </p>

        </div>
    );
};

export default AuditTrail;