import React from "react";

import {
    Package,
    ShoppingCart,
    TrendingUp
} from "lucide-react";

import {
    Badge,
    Card
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// METRIC
// ====================================

const Metric = ({
    label,
    value
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    return (

        <div
            style={{
                padding: theme.spacing.sm,
                borderRadius: theme.radius.md,
                backgroundColor:
                    isDark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(52,114,156,0.05)",
                border:
                    `1px solid ${theme.colors.border}`
            }}
        >

            <div
                style={{
                    color:
                        theme.colors.textMuted,
                    fontSize:
                        theme.typography.fontSize.xs
                }}
            >
                {label}
            </div>

            <div
                style={{
                    marginTop: "4px",
                    color:
                        theme.colors.text,
                    fontSize:
                        theme.typography.fontSize.md,
                    fontWeight:
                        theme.typography.fontWeight.bold
                }}
            >
                {value}
            </div>

        </div>

    );

};

// ====================================
// COMPONENT
// ====================================

const ProductForecastCard = ({
    product
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const currentStock =
        Number(
            product.currentStock
        ) || 0;

    const predictedDemand =
        Number(
            product.predictedDemand
        ) || 0;

    const recommendedRestock =
        Number(
            product.recommendedRestock
        ) || 0;

    const confidence =
        Number(
            product.confidenceScore
        ) || 0;

    const needsRestock =
        recommendedRestock > 0;

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="md"
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: theme.spacing.md,
                    marginBottom: theme.spacing.md
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing.xs,
                        minWidth: 0
                    }}
                >

                    <div
                        style={{
                            width: "38px",
                            height: "38px",
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

                        <Package size={18} />

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
                                    theme.typography.fontWeight.bold,
                                fontSize:
                                    theme.typography.fontSize.sm,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {product.productName ||
                                "Unnamed Product"}
                        </div>

                        <div
                            style={{
                                marginTop: "3px",
                                color:
                                    theme.colors.textMuted,
                                fontSize:
                                    theme.typography.fontSize.xs
                            }}
                        >
                            7-day demand estimate
                        </div>

                    </div>

                </div>

                <Badge
                    variant={
                        needsRestock
                            ? "warning"
                            : "success"
                    }
                    isDark={isDark}
                >
                    {needsRestock
                        ? "Restock"
                        : "Stock OK"}
                </Badge>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",
                    gap: theme.spacing.sm
                }}
            >

                <Metric
                    label="Current Stock"
                    value={
                        `${currentStock} units`
                    }
                />

                <Metric
                    label="Predicted Demand"
                    value={
                        `${predictedDemand} units`
                    }
                />

                <Metric
                    label="Daily Sales"
                    value={
                        Number(
                            product.averageDailySales
                        ).toFixed(2)
                    }
                />

                <Metric
                    label="Recommended Restock"
                    value={
                        `${recommendedRestock} units`
                    }
                />

            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: theme.spacing.sm,
                    marginTop: theme.spacing.md,
                    paddingTop: theme.spacing.sm,
                    borderTop:
                        `1px solid ${theme.colors.border}`
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color:
                            theme.colors.textMuted,
                        fontSize:
                            theme.typography.fontSize.xs
                    }}
                >

                    {needsRestock ? (
                        <ShoppingCart
                            size={14}
                        />
                    ) : (
                        <TrendingUp
                            size={14}
                        />
                    )}

                    <span>
                        Confidence
                    </span>

                </div>

                <strong
                    style={{
                        color:
                            theme.colors.text,
                        fontSize:
                            theme.typography.fontSize.sm
                    }}
                >
                    {confidence}%
                </strong>

            </div>

        </Card>

    );

};

export default ProductForecastCard;
