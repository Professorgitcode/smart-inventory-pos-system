import React, {
    useMemo
} from "react";

import {
    Activity
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

const StockMovementPanel = ({
    movements = []
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
                sortable: true
            },

            {
                key: "currentStock",
                label: "Current Stock",
                sortable: true
            },

            {
                key: "totalSold",
                label: "Total Sold",
                sortable: true
            },

            {
                key: "depletionRate",
                label: "Depletion",
                sortable: true,
                render: value =>
                    `${Number(
                        value || 0
                    ).toFixed(2)}%`
            },

            {
                key: "trend",
                label: "Trend",
                sortable: true,
                render: value => {

                    const variant =
                        value === "FAST"
                            ? "danger"
                            : value === "MODERATE"
                                ? "warning"
                                : "success";

                    return (

                        <Badge
                            variant={variant}
                            isDark={isDark}
                        >
                            {value || "SLOW"}
                        </Badge>

                    );

                }
            }

        ],
        [
            isDark
        ]
    );

    const items =
        Array.isArray(
            movements
        )
            ? movements
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

                <Activity
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
                        Stock Movement
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
                        Inventory depletion and
                        movement classification.
                    </p>

                </div>

            </div>

            {items.length === 0 ? (

                <EmptyState
                    icon={Activity}
                    isDark={isDark}
                    title="No stock movement data"
                    description={
                        "There are currently no stock movement records to analyse."
                    }
                />

            ) : (

                <Table
                    columns={columns}
                    data={items}
                    isDark={isDark}
                    stickyHeader
                />

            )}

        </Card>

    );

};

export default StockMovementPanel;
