import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../ui/cards/Card";

const StatCard = ({
    theme,
    icon,
    label,
    value,
    trend,
    positive
}) => {

    const colors = theme.colors;

    return (

        <Card
            isDark={colors.background === "#0A1123"}
            isHoverable
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                }}
            >

                <div
                    style={{
                        padding: 10,
                        borderRadius: 12,
                        background: colors.background
                    }}
                >
                    {icon}
                </div>

                <div style={{ textAlign: "right" }}>

                    <p
                        style={{
                            margin: 0,
                            fontSize: 13,
                            color: colors.textMuted,
                            fontWeight: 600
                        }}
                    >
                        {label}
                    </p>

                    <h2
                        style={{
                            margin: "4px 0",
                            fontSize: 24,
                            fontWeight: 800,
                            color: colors.text
                        }}
                    >
                        {value}
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 5,
                            fontSize: 12,
                            fontWeight: 700,
                            color: positive ? colors.success : colors.danger
                        }}
                    >

                        {positive
                            ? <TrendingUp size={14}/>
                            : <TrendingDown size={14}/>
                        }

                        {trend}

                    </div>

                </div>

            </div>

        </Card>

    );
};

export default StatCard;