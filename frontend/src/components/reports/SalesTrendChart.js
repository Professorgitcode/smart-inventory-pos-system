import React, {
    useMemo
} from "react";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

import {
    Card
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// FORMAT CURRENCY
// ====================================

const formatCurrency = (
    value
) => {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }
    ).format(
        Number(value) || 0
    );

};

// ====================================
// TOOLTIP
// ====================================

const ReportTooltip = ({
    active,
    payload,
    label,
    theme
}) => {

    if (
        !active ||
        !payload ||
        payload.length === 0
    ) {
        return null;
    }

    return (

        <div
            style={{
                padding: "10px 12px",
                borderRadius:
                    theme.radius.md,
                background:
                    theme.colors.surfaceGlass,
                border:
                    `1px solid ${theme.colors.border}`,
                boxShadow:
                    theme.shadows.md,
                backdropFilter:
                    "blur(12px)"
            }}
        >

            <div
                style={{
                    marginBottom: "4px",
                    fontSize: "11px",
                    color:
                        theme.colors.textMuted
                }}
            >
                {label}
            </div>

            <div
                style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color:
                        theme.colors.text
                }}
            >
                Revenue:{" "}
                {formatCurrency(
                    payload[0]?.value
                )}
            </div>

            <div
                style={{
                    marginTop: "3px",
                    fontSize: "12px",
                    color:
                        theme.colors.textMuted
                }}
            >
                Orders:{" "}
                {payload[1]?.value || 0}
            </div>

        </div>

    );

};

// ====================================
// COMPONENT
// ====================================

const SalesTrendChart = ({
    salesTrend = [],
    forecast = []
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const chartData =
        useMemo(() => {

            const historical =
                salesTrend.map(
                    item => ({
                        date:
                            item.date,
                        revenue:
                            Number(
                                item.totalRevenue
                            ) || 0,
                        orders:
                            Number(
                                item.orderCount
                            ) || 0
                    })
                );

            const forecastRows =
                forecast.map(
                    item => ({
                        date:
                            item.date,
                        forecast:
                            Number(
                                item.predictedRevenue
                            ) || 0
                    })
                );

            return [
                ...historical,
                ...forecastRows
            ];

        }, [
            salesTrend,
            forecast
        ]);

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
                    alignItems:
                        "flex-start",
                    gap: theme.spacing.md,
                    marginBottom:
                        theme.spacing.md
                }}
            >

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
                        Revenue Trend
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
                        Historical daily revenue
                        and the current report forecast.
                    </p>

                </div>

            </div>

            {chartData.length === 0 ? (

                <div
                    style={{
                        height: "360px",
                        display: "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                        color:
                            theme.colors.textMuted
                    }}
                >
                    No sales trend data available.
                </div>

            ) : (

                <div
                    style={{
                        width: "100%",
                        height: "360px"
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 12,
                                left: 0,
                                bottom: 0
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="4 4"
                                vertical={false}
                                stroke={
                                    theme.colors.border
                                }
                            />

                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill:
                                        theme.colors.textMuted,
                                    fontSize: 11
                                }}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill:
                                        theme.colors.textMuted,
                                    fontSize: 11
                                }}
                            />

                            <Tooltip
                                content={
                                    <ReportTooltip
                                        theme={theme}
                                    />
                                }
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                name="Revenue"
                                stroke={
                                    theme.colors.primary
                                }
                                fill={
                                    theme.colors.primaryLight
                                }
                                fillOpacity={0.35}
                                strokeWidth={2.5}
                            />

                            <Area
                                type="monotone"
                                dataKey="forecast"
                                name="Forecast"
                                stroke={
                                    theme.colors.accent
                                }
                                fill="none"
                                strokeDasharray="6 6"
                                strokeWidth={2}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            )}

        </Card>

    );

};

export default SalesTrendChart;
