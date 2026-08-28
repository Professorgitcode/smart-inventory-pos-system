import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/cards/Card";

const TableCard = ({
    theme,
    title,
    items
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
                    marginBottom: 16
                }}
            >

                <h3
                    style={{
                        margin: 0,
                        fontSize: 16,
                        fontWeight: 700,
                        color: colors.text
                    }}
                >
                    {title}
                </h3>

                <Link
                    to="/inventory-insights"
                    style={{
                        color: colors.primary,
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: 13
                    }}
                >
                    View All
                </Link>

            </div>

            {items.map((item, index) => (

                <div
                    key={index}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom:
                            index === items.length - 1
                                ? "none"
                                : `1px solid ${colors.border}`
                    }}
                >

                    <div>

                        <div
                            style={{
                                fontWeight: 600,
                                color: colors.text
                            }}
                        >
                            {item.name}
                        </div>

                        <div
                            style={{
                                fontSize: 13,
                                color: colors.textMuted
                            }}
                        >
                            {item.stat}
                        </div>

                    </div>

                    <span
                        style={{
                            padding: "4px 10px",
                            borderRadius: 20,
                            background: `${item.bColor}20`,
                            color: item.bColor,
                            fontWeight: 700,
                            fontSize: 12
                        }}
                    >
                        {item.badge}
                    </span>

                </div>

            ))}

        </Card>

    );

};

export default TableCard;