import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";
import { Card } from "../ui/cards/Card";

const InventoryHealthChart = ({
    theme,
    healthData,
    healthyPercentage
}) => {

    const colors = theme.colors;

    return (

        <Card
            isDark={colors.background === "#0A1123"}
        >

            <h3
                style={{
                    marginTop: 0,
                    color: colors.text
                }}
            >
                Inventory Health
            </h3>

            <div
                style={{
                    position: "relative",
                    height: 260
                }}
            >

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={healthData}
                            innerRadius={65}
                            outerRadius={90}
                            dataKey="value"
                        >

                            {healthData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={entry.color}
                                />

                            ))}

                        </Pie>

                    </PieChart>

                </ResponsiveContainer>

                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        textAlign: "center"
                    }}
                >

                    <h2>{Math.round(healthyPercentage)}%</h2>

                    <small
                        style={{
                            color: colors.textMuted
                        }}
                    >
                        Healthy
                    </small>

                </div>

            </div>

        </Card>

    );

};

export default InventoryHealthChart;