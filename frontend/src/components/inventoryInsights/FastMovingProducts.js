import React, {
    useMemo
} from "react";

import {
    Rocket
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

const FastMovingProducts = ({
    products = []
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const columns = useMemo(
        () => [

            {
                key: "rank",
                label: "Rank",
                sortable: true,
                render: value => `#${value}`
            },

            {
                key: "productName",
                label: "Product",
                sortable: true
            },

            {
                key: "totalSold",
                label: "Total Sold",
                sortable: true
            },

            {
                key: "averageDailySales",
                label: "Avg Daily Sales",
                sortable: true,
                render: value =>
                    Number(
                        value || 0
                    ).toFixed(2)
            },

            {
                key: "velocityCategory",
                label: "Velocity",
                sortable: true,
                render: value => (

                    <Badge
                        variant={
                            value === "FAST"
                                ? "success"
                                : value === "MODERATE"
                                    ? "warning"
                                    : "info"
                        }
                        isDark={isDark}
                    >
                        {value || "SLOW"}
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
            products
        )
            ? products
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

                <Rocket
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
                        Fast-Moving Products
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
                        Highest-selling products
                        ranked by recent sales volume.
                    </p>

                </div>

            </div>

            {data.length === 0 ? (

                <EmptyState
                    icon={Rocket}
                    isDark={isDark}
                    title="No fast-moving data"
                    description={
                        "There are currently no fast-moving product records."
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

export default FastMovingProducts;
