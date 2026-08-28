import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";
import { Activity } from "lucide-react";
import { Card } from "../ui/cards/Card";

const RevenueForecastChart = ({
    theme,
    revenueData
}) => {

    const colors = theme.colors;

    return (

        <Card
            isDark={colors.background === "#0A1123"}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10
                    }}
                >

                    <Activity
                        size={20}
                        color={colors.primary}
                    />

                    <div>

                        <h3
                            style={{
                                margin: 0,
                                color: colors.text
                            }}
                        >
                            AI Revenue Forecast
                        </h3>

                        <div
                            style={{
                                color: colors.textMuted,
                                fontSize: 13
                            }}
                        >
                            Predictive Sales Analytics
                        </div>

                    </div>

                </div>

            </div>

            <div style={{ height: 320 }}>

                <ResponsiveContainer>

                    <LineChart
                        data={revenueData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={colors.border}
                        />

                        <XAxis
                            dataKey="date"
                            stroke={colors.textMuted}
                        />

                        <YAxis
                            stroke={colors.textMuted}
                        />

                        <Tooltip
                            contentStyle={{
                                background: colors.surface,
                                border: `1px solid ${colors.border}`
                            }}
                        />

                        <Line
                            dataKey="actual"
                            stroke={colors.primary}
                            strokeWidth={3}
                        />

                        <Line
                            dataKey="predicted"
                            stroke={colors.accent}
                            strokeDasharray="5 5"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

};

export default RevenueForecastChart;