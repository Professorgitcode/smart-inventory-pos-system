import React from "react";

import {
    AlertTriangle,
    PackagePlus
} from "lucide-react";

import {
    Badge,
    Card,
    EmptyState
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// COMPONENT
// ====================================

const ReorderSuggestions = ({
    suggestions = []
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const items =
        Array.isArray(
            suggestions
        )
            ? suggestions
            : [];

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="md"
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.xs,
                    marginBottom: theme.spacing.md
                }}
            >

                <PackagePlus
                    size={18}
                    color={theme.colors.primary}
                />

                <div>

                    <h2
                        style={{
                            margin: 0,
                            color:
                                theme.colors.text,
                            fontSize:
                                theme.typography
                                    .fontSize.md,
                            fontWeight:
                                theme.typography
                                    .fontWeight.bold
                        }}
                    >
                        Reorder Suggestions
                    </h2>

                    <p
                        style={{
                            margin:
                                `${theme.spacing.xxs} 0 0`,
                            color:
                                theme.colors.textMuted,
                            fontSize:
                                theme.typography
                                    .fontSize.xs
                        }}
                    >
                        Products currently meeting
                        the replenishment conditions.
                    </p>

                </div>

            </div>

            {items.length === 0 ? (

                <EmptyState
                    icon={PackagePlus}
                    isDark={isDark}
                    title="No reorder alerts"
                    description={
                        "No products currently meet the backend reorder conditions."
                    }
                />

            ) : (

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: theme.spacing.sm
                    }}
                >

                    {items.map(
                        item => {

                            const urgency =
                                item.urgency ||
                                "LOW";

                            const variant =
                                urgency ===
                                "CRITICAL"
                                    ? "danger"
                                    : "warning";

                            return (

                                <div
                                    key={
                                        item.productId
                                    }
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "center",
                                        gap:
                                            theme.spacing.md,
                                        padding:
                                            theme.spacing.sm,
                                        border:
                                            `1px solid ${theme.colors.border}`,
                                        borderRadius:
                                            theme.radius.md,
                                        backgroundColor:
                                            isDark
                                                ? "rgba(255,255,255,0.025)"
                                                : "rgba(52,114,156,0.03)"
                                    }}
                                >

                                    <div
                                        style={{
                                            minWidth: 0
                                        }}
                                    >

                                        <div
                                            style={{
                                                color:
                                                    theme.colors.text,
                                                fontWeight:
                                                    theme.typography
                                                        .fontWeight.semibold
                                            }}
                                        >
                                            {item.productName ||
                                                "Unnamed Product"}
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "3px",
                                                color:
                                                    theme.colors.textMuted,
                                                fontSize:
                                                    theme.typography
                                                        .fontSize.xs
                                            }}
                                        >
                                            Current stock:{" "}
                                            {Number(
                                                item.currentStock
                                            ) || 0}
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "2px",
                                                color:
                                                    theme.colors.textMuted,
                                                fontSize:
                                                    theme.typography
                                                        .fontSize.xs
                                            }}
                                        >
                                            Suggested reorder:{" "}
                                            <strong>
                                                {Number(
                                                    item.suggestedReorderQuantity
                                                ) || 0}
                                            </strong>
                                            {" "}units
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap:
                                                theme.spacing.xs,
                                            flexShrink: 0
                                        }}
                                    >

                                        <Badge
                                            variant={
                                                variant
                                            }
                                            isDark={
                                                isDark
                                            }
                                        >
                                            {urgency}
                                        </Badge>

                                        <AlertTriangle
                                            size={15}
                                            color={
                                                urgency ===
                                                "CRITICAL"
                                                    ? theme.colors.danger
                                                    : theme.colors.warning
                                            }
                                        />

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </Card>

    );

};

export default ReorderSuggestions;
