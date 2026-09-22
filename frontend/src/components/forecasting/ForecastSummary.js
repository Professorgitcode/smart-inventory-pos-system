import React, {
    useMemo
} from "react";

import {
    Activity,
    BarChart3,
    Package,
    Target
} from "lucide-react";

import {
    Card
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// CURRENCY FORMATTER
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
// SUMMARY CARD
// ====================================

const SummaryCard = ({
    icon: Icon,
    label,
    value,
    description
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
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: theme.spacing.md
                }}
            >

                <div
                    style={{
                        minWidth: 0
                    }}
                >

                    <div
                        style={{
                            fontSize:
                                theme.typography.fontSize.xs,
                            color:
                                theme.colors.textMuted,
                            marginBottom:
                                theme.spacing.xxs
                        }}
                    >
                        {label}
                    </div>

                    <div
                        style={{
                            fontSize:
                                theme.typography.fontSize.xl,
                            fontWeight:
                                theme.typography.fontWeight.bold,
                            color:
                                theme.colors.text,
                            lineHeight: 1.2
                        }}
                    >
                        {value}
                    </div>

                    <div
                        style={{
                            marginTop:
                                theme.spacing.xxs,
                            fontSize:
                                theme.typography.fontSize.xs,
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        {description}
                    </div>

                </div>

                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: theme.radius.md,
                        backgroundColor:
                            isDark
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(52,114,156,0.08)",
                        color:
                            theme.colors.primary
                    }}
                >

                    <Icon size={19} />

                </div>

            </div>

        </Card>

    );

};

// ====================================
// COMPONENT
// ====================================

const ForecastSummary = ({
    forecast = [],
    productForecasts = []
}) => {

    const summary = useMemo(
        () => {

            const points =
                Array.isArray(forecast)
                    ? forecast
                    : [];

            const products =
                Array.isArray(productForecasts)
                    ? productForecasts
                    : [];

            const latest =
                points.length > 0
                    ? points[points.length - 1]
                    : null;

            const averageConfidence =
                points.length > 0
                    ? points.reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            Number(
                                item.confidenceScore
                            ),
                        0
                    ) / points.length
                    : 0;

            return {

                forecastPoints:
                    points.length,

                latestActual:
                    latest?.actualRevenue || 0,

                latestPredicted:
                    latest?.predictedRevenue || 0,

                averageConfidence,

                productCount:
                    products.length

            };

        },
        [
            forecast,
            productForecasts
        ]
    );

    const {
        theme
    } = useTheme();

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(4, minmax(0, 1fr))",
                gap: theme.spacing.lg
            }}
        >

            <SummaryCard
                icon={BarChart3}
                label="Forecast observations"
                value={
                    summary.forecastPoints
                }
                description={
                    "Historical revenue observations returned by the service"
                }
            />

            <SummaryCard
                icon={Activity}
                label="Latest actual revenue"
                value={
                    formatCurrency(
                        summary.latestActual
                    )
                }
                description={
                    "Most recent completed revenue observation"
                }
            />

            <SummaryCard
                icon={Target}
                label="Latest predicted revenue"
                value={
                    formatCurrency(
                        summary.latestPredicted
                    )
                }
                description={
                    "Moving-average prediction for the latest observation"
                }
            />

            <SummaryCard
                icon={Package}
                label="Products forecasted"
                value={
                    summary.productCount
                }
                description={
                    "Products with recent sales history"
                }
            />

        </div>

    );

};

export default ForecastSummary;
