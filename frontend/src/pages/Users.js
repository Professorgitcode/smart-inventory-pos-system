// ====================================
// USER MANAGEMENT PAGE
// ====================================
//
// Administrative user-management shell.
//
// Current state:
// - Authentication is implemented.
// - Current-user identity is implemented.
// - User administration API is not yet
//   implemented.
//
// Therefore this page must not present
// fabricated users, permissions, sessions,
// or administrative metrics.
//
// Future architecture:
//
// Page
//   ↓
// useUsers()
//   ↓
// UsersRepository
//   ↓
// UsersService
//   ↓
// apiClient
//   ↓
// User Management API
// ====================================

import React from "react";

import {
    Users as UsersIcon,
    UserPlus,
    ShieldCheck,
    Activity,
    KeyRound
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

const Users = () => {

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
                            borderRadius: theme.radius.md,
                            backgroundColor: isDark
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(52,114,156,0.08)",
                            color: theme.colors.primary
                        }}
                    >
                        <UsersIcon size={21} />
                    </div>

                    <div>

                        <h1
                            style={{
                                margin: 0,
                                fontSize: theme.typography.fontSize.xxl,
                                fontWeight: theme.typography.fontWeight.extrabold,
                                color: theme.colors.text,
                                letterSpacing: theme.typography.letterSpacing.tight
                            }}
                        >
                            User Management
                        </h1>

                        <p
                            style={{
                                margin: `${theme.spacing.xxs} 0 0`,
                                color: theme.colors.textMuted,
                                fontSize: theme.typography.fontSize.sm
                            }}
                        >
                            Administrative account and access management.
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
                    icon={UsersIcon}
                    isDark={isDark}
                    title="User management is not connected yet"
                    description={
                        "The current system supports authentication and role-based access, but administrative user management is not yet exposed through the application API."
                    }
                />

            </Card>

            {/* ==================================
                PLANNED CAPABILITIES
                ================================== */}

            <Card
                variant="glass"
                isDark={isDark}
                padding="lg"
            >

                <div
                    style={{
                        marginBottom: theme.spacing.lg
                    }}
                >

                    <h2
                        style={{
                            margin: 0,
                            fontSize: theme.typography.fontSize.md,
                            fontWeight: theme.typography.fontWeight.bold,
                            color: theme.colors.text
                        }}
                    >
                        Planned administration capabilities
                    </h2>

                    <p
                        style={{
                            margin: `${theme.spacing.xxs} 0 0`,
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.textMuted,
                            lineHeight: theme.typography.lineHeight.normal
                        }}
                    >
                        These describe future functionality and are not currently active operations.
                    </p>

                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: theme.spacing.md
                    }}
                >

                    <CapabilityCard
                        theme={theme}
                        isDark={isDark}
                        icon={UserPlus}
                        title="Account management"
                        description="Create, update, deactivate, and review user accounts through a future administration API."
                    />

                    <CapabilityCard
                        theme={theme}
                        isDark={isDark}
                        icon={ShieldCheck}
                        title="Role and permission management"
                        description="Manage roles and permissions using the application's authorization model."
                    />

                    <CapabilityCard
                        theme={theme}
                        isDark={isDark}
                        icon={KeyRound}
                        title="Credential administration"
                        description="Support password reset and related account-security operations through controlled administrative workflows."
                    />

                    <CapabilityCard
                        theme={theme}
                        isDark={isDark}
                        icon={Activity}
                        title="Session and activity management"
                        description="Provide administrative visibility into sessions and account activity once the supporting backend capability exists."
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
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.lg,
                backgroundColor: isDark
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
                    borderRadius: theme.radius.md,
                    backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(52,114,156,0.08)",
                    color: theme.colors.primary,
                    marginBottom: theme.spacing.sm
                }}
            >
                <Icon size={18} />
            </div>

            <h3
                style={{
                    margin: `0 0 ${theme.spacing.xs}`,
                    color: theme.colors.text,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.bold
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    margin: 0,
                    color: theme.colors.textMuted,
                    fontSize: theme.typography.fontSize.xs,
                    lineHeight: theme.typography.lineHeight.normal
                }}
            >
                {description}
            </p>

        </div>
    );
};

export default Users;
