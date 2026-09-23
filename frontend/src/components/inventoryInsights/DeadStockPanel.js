import React, {
    useMemo
} from "react";

import {
    Archive
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

const DeadStockPanel = ({
    items = []
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
                key: "daysInInventory",
                label: "Days in Inventory",
                sortable: true,
                render: value =>
                    `${Number(
                        value || 0
                    )} days`
            },

            {
                key: "riskLevel",
                label: "Risk",
                sortable: true,
                render: value => (

                    <Badge
                        variant={
                            value === "HIGH"
                                ? "danger"
                                : "warning"
                        }
                        isDark={isDark}
                    >
                        {value || "MEDIUM"}
                    </Badge>

                )
            }

        ],
        [
            isDark
        ]
    );

    const data =
        Array.isArray(
            items
        )
            ? items
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

                <Archive
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
                        Dead Stock
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
                        Products with elevated
                        inventory-risk indicators.
                    </p>

                </div>

            </div>

            {data.length === 0 ? (

                <EmptyState
                    icon={Archive}
                    isDark={isDark}
                    title="No dead-stock alerts"
                    description={
                        "No products currently meet the backend dead-stock risk conditions."
                    }
                />

            ) : (

                <Table
                    columns={columns}
                    data={data}
                    isDark={isDark}
                    stickyHeader
                />

            )}

        </Card>

    );

};

export default DeadStockPanel;
