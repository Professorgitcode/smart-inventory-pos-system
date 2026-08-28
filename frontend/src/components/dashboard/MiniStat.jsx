import React from "react";
import { Activity } from "lucide-react";
import { Card } from "../ui/cards/Card";

const MiniStat = ({
    theme,
    label,
    val,
    sub
}) => {

    const colors = theme.colors;

    return (

        <Card
            isDark={colors.background === "#0A1123"}
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14
                }}
            >

                <div
                    style={{
                        padding: 10,
                        borderRadius: 10,
                        background: colors.background
                    }}
                >
                    <Activity
                        size={18}
                        color={colors.primary}
                    />
                </div>

                <div>

                    <div
                        style={{
                            fontSize: 12,
                            color: colors.textMuted,
                            textTransform: "uppercase"
                        }}
                    >
                        {label}
                    </div>

                    <div
                        style={{
                            fontWeight: 800,
                            fontSize: 22,
                            color: colors.text
                        }}
                    >
                        {val}
                    </div>

                    <div
                        style={{
                            color: colors.textMuted,
                            fontSize: 12
                        }}
                    >
                        {sub}
                    </div>

                </div>

            </div>

        </Card>

    );

};

export default MiniStat;