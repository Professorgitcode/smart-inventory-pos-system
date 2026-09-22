import React from "react";

import {
    BarChart3
} from "lucide-react";

import {
    EmptyState
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

import ProductForecastCard
    from "./ProductForecastCard";

// ====================================
// COMPONENT
// ====================================

const ProductForecastGrid = ({
    forecasts = []
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const products =
        Array.isArray(
            forecasts
        )
            ? forecasts
            : [];

    return (

        <section>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.xs,
                    marginBottom: theme.spacing.md
                }}
            >

                <BarChart3
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
                        Product Demand Forecasts
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
                        Recent sales behaviour translated
                        into short-term demand estimates.
                    </p>

                </div>

            </div>

            {products.length === 0 ? (

                <EmptyState
                    icon={BarChart3}
                    isDark={isDark}
                    title="No product forecasts"
                    description={
                        "No products currently have enough recent sales activity for a demand estimate."
                    }
                />

            ) : (

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: theme.spacing.lg
                    }}
                >

                    {products.map(
                        product => (

                            <ProductForecastCard
                                key={
                                    product.productId
                                }
                                product={
                                    product
                                }
                            />

                        )
                    )}

                </div>

            )}

        </section>

    );

};

export default ProductForecastGrid;
