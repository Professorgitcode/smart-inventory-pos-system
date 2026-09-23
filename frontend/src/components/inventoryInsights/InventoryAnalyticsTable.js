import React, {
    useMemo
} from "react";

import {
    Package
} from "lucide-react";

import {
    Badge,
    Card,
    EmptyState,
    Table
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// COMPONENT
// ====================================

const InventoryAnalyticsTable = ({
    insights = []
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const columns = useMemo(
        () => [

            {
                key: "productName",
                label: "Product",
                sortable: true,
                render: value => (

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >

                        <div
                            style={{
                                width: "34px",
                                height: "34px",
                                flexShrink: 0,
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
                            <Package size={16} />
                        </div>

                        <span
                            style={{
                                color:
                                    theme.colors.text,
                                fontWeight:
                                    theme.typography
                                        .fontWeight.semibold
                            }}
                        >
                            {value ||
                                "Unnamed Product"}
                        </span>

                    </div>

                )
            },

            {
                key: "stockQuantity",
                label: "Stock",
                sortable: true,
                render: value =>
                    `${Number(value) || 0} units`
            },

            {
                key: "totalSold",
                label: "Sold",
                sortable: true,
                render: value =>
                    Number(value) || 0
            },

            {
                key: "averageDailySales",
                label: "Avg Daily Sales",
                sortable: true,
                render: value =>
                    Number(value || 0)
                        .toFixed(2)
            },

            {
                key: "estimatedDaysRemaining",
                label: "Days Remaining",
                sortable: true,
                render: value => {

                    const days =
                        Number(value);

                    return Number.isFinite(days)
                        ? days
                        : 0;

                }
            },

            {
                key: "urgency",
                label: "Urgency",
                sortable: true,
                render: value => {

                    const variant =
                        value === "CRITICAL"
                            ? "danger"
                            : value === "LOW"
                                ? "warning"
                                : "success";

                    return (

                        <Badge
                            variant={variant}
                            isDark={isDark}
                        >
                            {value || "STABLE"}
                        </Badge>

                    );

                }
            }

        ],
        [
            isDark,
            theme
        ]
    );

    if (
        !Array.isArray(insights) ||
        insights.length === 0
    ) {

        return (

            <Card
                variant="glass"
                isDark={isDark}
                padding="lg"
            >

                <EmptyState
                    icon={Package}
                    isDark={isDark}
                    title="No inventory analytics"
                    description={
                        "There are currently no inventory analytics records to display."
                    }
                />

            </Card>

        );

    }

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="md"
        >

            <div
                style={{
                    marginBottom:
                        theme.spacing.md
                }}
            >

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
                    Inventory Analytics
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
                    Current stock coverage and
                    consumption indicators.
                </p>

            </div>

            <Table
                columns={columns}
                data={insights}
                isDark={isDark}
                stickyHeader
            />

        </Card>

    );

};

export default InventoryAnalyticsTable;
