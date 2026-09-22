import React from "react";

import {
    CheckCircle2,
    Clock,
    ShoppingBag
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

const RecentOrders = ({
    orders = []
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="md"
        >

            <div
                style={{
                    display: "flex",
                    alignItems:
                        "center",
                    gap: theme.spacing.xs,
                    marginBottom:
                        theme.spacing.md
                }}
            >

                <ShoppingBag
                    size={17}
                    color={
                        theme.colors.primary
                    }
                />

                <div>

                    <h2
                        style={{
                            margin: 0,
                            fontSize:
                                theme.typography
                                    .fontSize.md,
                            color:
                                theme.colors.text,
                            fontWeight:
                                theme.typography
                                    .fontWeight.bold
                        }}
                    >
                        Recent Orders
                    </h2>

                    <p
                        style={{
                            margin:
                                "4px 0 0",
                            fontSize:
                                theme.typography
                                    .fontSize.xs,
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        Latest completed sales
                    </p>

                </div>

            </div>

            {orders.length === 0 ? (

                <EmptyState
                    icon={ShoppingBag}
                    isDark={isDark}
                    title="No recent orders"
                    description={
                        "There are no completed sales in the current report."
                    }
                />

            ) : (

                <div
                    style={{
                        display: "flex",
                        flexDirection:
                            "column",
                        gap: "10px"
                    }}
                >

                    {orders.map(
                        order => (

                            <div
                                key={
                                    order.orderId
                                }
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "center",
                                    gap:
                                        theme.spacing.md,
                                    padding:
                                        "12px 0",
                                    borderBottom:
                                        `1px solid ${theme.colors.border}`
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems:
                                            "center",
                                        gap: "10px",
                                        minWidth: 0
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "34px",
                                            height: "34px",
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            borderRadius:
                                                theme.radius.md,
                                            backgroundColor:
                                                isDark
                                                    ? "rgba(255,255,255,0.04)"
                                                    : "rgba(52,114,156,0.07)",
                                            color:
                                                theme.colors.primary
                                        }}
                                    >
                                        <ShoppingBag
                                            size={16}
                                        />
                                    </div>

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
                                                        .fontWeight.semibold,
                                                fontSize:
                                                    theme.typography
                                                        .fontSize.sm
                                            }}
                                        >
                                            Order #
                                            {
                                                order.orderId
                                            }
                                        </div>

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap:
                                                    "5px",
                                                marginTop:
                                                    "3px",
                                                color:
                                                    theme.colors.textMuted,
                                                fontSize:
                                                    "11px"
                                            }}
                                        >

                                            <Clock
                                                size={12}
                                            />

                                            {
                                                new Date(
                                                    order.createdAt
                                                ).toLocaleString()
                                            }

                                        </div>

                                    </div>

                                </div>

                                <div
                                    style={{
                                        textAlign:
                                            "right",
                                        flexShrink: 0
                                    }}
                                >

                                    <div
                                        style={{
                                            color:
                                                theme.colors.text,
                                            fontWeight:
                                                theme.typography
                                                    .fontWeight.bold
                                        }}
                                    >
                                        $
                                        {Number(
                                            order.amount || 0
                                        ).toFixed(2)}
                                    </div>

                                    <Badge
                                        variant="success"
                                        isDark={
                                            isDark
                                        }
                                    >

                                        <CheckCircle2
                                            size={11}
                                        />

                                        Completed

                                    </Badge>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </Card>

    );

};

export default RecentOrders;
