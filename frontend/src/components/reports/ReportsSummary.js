import React from "react";

import {
    BarChart3,
    DollarSign,
    PackageCheck,
    ShoppingBag
} from "lucide-react";

import {
    Card
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// CURRENCY
// ====================================

const formatCurrency = (
    value
) => {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD"
        }
    ).format(
        Number(value) || 0
    );

};

// ====================================
// KPI CARD
// ====================================

const SummaryCard = ({
    title,
    value,
    icon: Icon
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
                    justifyContent:
                        "space-between",
                    alignItems: "flex-start",
                    gap: theme.spacing.md
                }}
            >

                <div>

                    <div
                        style={{
                            fontSize:
                                theme.typography.fontSize.xs,
                            textTransform:
                                "uppercase",
                            letterSpacing:
                                theme.typography
                                    .letterSpacing.wide,
                            fontWeight:
                                theme.typography
                                    .fontWeight.semibold,
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        {title}
                    </div>

                    <div
                        style={{
                            marginTop:
                                theme.spacing.xs,
                            fontSize:
                                theme.typography.fontSize.xl,
                            fontWeight:
                                theme.typography
                                    .fontWeight.extrabold,
                            color:
                                theme.colors.text
                        }}
                    >
                        {value}
                    </div>

                </div>

                <div
                    style={{
                        width: "38px",
                        height: "38px",
                        display: "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                        borderRadius:
                            theme.radius.md,
                        backgroundColor:
                            isDark
                                ? "rgba(131,135,195,0.12)"
                                : "rgba(52,114,156,0.08)",
                        color:
                            theme.colors.primary
                    }}
                >
                    <Icon size={18} />

                </div>

            </div>

        </Card>

    );

};

// ====================================
// COMPONENT
// ====================================

const ReportsSummary = ({
    todayRevenue = 0,
    weeklyRevenue = 0,
    totalOrders = 0,
    bestSeller = "N/A"
}) => {

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(4, minmax(0, 1fr))",
                gap: "16px"
            }}
        >

            <SummaryCard
                title="Today Revenue"
                value={
                    formatCurrency(
                        todayRevenue
                    )
                }
                icon={DollarSign}
            />

            <SummaryCard
                title="7-Day Revenue"
                value={
                    formatCurrency(
                        weeklyRevenue
                    )
                }
                icon={BarChart3}
            />

            <SummaryCard
                title="Total Orders"
                value={
                    Number(
                        totalOrders
                    ).toLocaleString()
                }
                icon={ShoppingBag}
            />

            <SummaryCard
                title="Best Seller"
                value={
                    bestSeller || "N/A"
                }
                icon={PackageCheck}
            />

        </div>

    );

};

export default ReportsSummary;
