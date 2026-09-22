import React, {
    useMemo
} from "react";

import {
    Activity
} from "lucide-react";

import {
    Card,
    EmptyState
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

// ====================================
// DATE FORMATTER
// ====================================

const formatDate = (
    value
) => {

    if (!value) {
        return "";
    }

    const date =
        new Date(
            `${value}T00:00:00`
        );

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric"
        }
    );

};

// ====================================
// CURRENCY FORMATTER
// ====================================

const formatCurrency = (
    value
) => {

    return `$${Number(
        value || 0
    ).toFixed(2)}`;

};

// ====================================
// COMPONENT
// ====================================

const RevenueForecastChart = ({
    forecast = []
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const chartData =
        useMemo(
            () =>
                (
                    Array.isArray(
                        forecast
                    )
                        ? forecast
                        : []
                ).map(
                    item => ({
                        date:
                            formatDate(
                                item.date
                            ),

                        actual:
                            Number(
                                item.actualRevenue
                            ) || 0,

                        predicted:
                            Number(
                                item.predictedRevenue
                            ) || 0,

                        confidence:
                            Number(
                                item.confidenceScore
                            ) || 0
                    })
                ),
            [
                forecast
            ]
        );

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="lg"
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
                                theme.typography.fontSize.md,
                            fontWeight:
                                theme.typography.fontWeight.bold
                        }}
                    >
                        Revenue Forecast Analysis
                    </h2>

                    <p
                        style={{
                            margin:
                                `${theme.spacing.xxs} 0 0`,
                            color:
                                theme.colors.textMuted,
                            fontSize:
                                theme.typography.fontSize.xs
                        }}
                    >
                        Actual revenue compared with the
                        current moving-average prediction.
                    </p>

                </div>

            </div>

            {chartData.length === 0 ? (

                <EmptyState
                    icon={Activity}
                    isDark={isDark}
                    title="No forecast data"
                    description={
                        "There is not enough sales data to display the revenue analysis."
                    }
                />

            ) : (

                <div
                    style={{
                        width: "100%",
                        height: "380px"
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 15,
                                left: 0,
                                bottom: 5
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
                                    fontSize: 12
                                }}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill:
                                        theme.colors.textMuted,
                                    fontSize: 12
                                }}
                                tickFormatter={
                                    value =>
                                        `$${Number(
                                            value
                                        ).toLocaleString()}`
                                }
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor:
                                        theme.colors.surface,
                                    border:
                                        `1px solid ${theme.colors.border}`,
                                    borderRadius:
                                        theme.radius.md,
                                    color:
                                        theme.colors.text
                                }}
                                labelStyle={{
                                    color:
                                        theme.colors.text,
                                    fontWeight:
                                        theme.typography.fontWeight.semibold
                                }}
                                formatter={(
                                    value,
                                    name
                                ) => [

                                    formatCurrency(
                                        value
                                    ),

                                    name === "actual"
                                        ? "Actual Revenue"
                                        : "Predicted Revenue"

                                ]}
                            />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="actual"
                                name="Actual Revenue"
                                stroke={
                                    theme.colors.primary
                                }
                                strokeWidth={3}
                                dot={{
                                    r: 3
                                }}
                                activeDot={{
                                    r: 6
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="predicted"
                                name="Predicted Revenue"
                                stroke={
                                    theme.colors.accent
                                }
                                strokeWidth={2}
                                strokeDasharray="6 5"
                                dot={false}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            )}

        </Card>

    );

};

export default RevenueForecastChart;
