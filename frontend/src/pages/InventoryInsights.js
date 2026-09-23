import React from "react";

import {
    useTheme
} from "../context/ThemeContext";

import useInventoryInsights
    from "../hooks/business/inventory/useInventoryInsights";

import InventoryInsightsHeader
    from "../components/inventoryInsights/InventoryInsightsHeader";

import InsightsSummary
    from "../components/inventoryInsights/InsightsSummary";

import InventoryAnalyticsTable
    from "../components/inventoryInsights/InventoryAnalyticsTable";

import ReorderSuggestions
    from "../components/inventoryInsights/ReorderSuggestions";

import StockMovementPanel
    from "../components/inventoryInsights/StockMovementPanel";

import DeadStockPanel
    from "../components/inventoryInsights/DeadStockPanel";

import FastMovingProducts
    from "../components/inventoryInsights/FastMovingProducts";

import {
    Alert,
    SkeletonLoader
} from "../components/ui";

// ====================================
// INVENTORY INSIGHTS PAGE
// ====================================
// Composition layer.
//
// Responsibilities:
// - Connect the business hook
// - Coordinate refresh
// - Compose feature components
//
// API communication, calculation logic
// and presentation details are delegated.
// ====================================

const InventoryInsights = () => {

    const {
        theme,
        isDark
    } = useTheme();

    // ====================================
    // BUSINESS STATE
    // ====================================

    const {
        insights,
        reorder,
        stockMovement,
        deadStock,
        fastMoving,
        loading,
        error,
        actions
    } = useInventoryInsights();

    const normalizedInsights =
        Array.isArray(
            insights
        )
            ? insights
            : [];

    const normalizedReorder =
        Array.isArray(
            reorder
        )
            ? reorder
            : [];

    const normalizedStockMovement =
        Array.isArray(
            stockMovement
        )
            ? stockMovement
            : [];

    const normalizedDeadStock =
        Array.isArray(
            deadStock
        )
            ? deadStock
            : [];

    const normalizedFastMoving =
        Array.isArray(
            fastMoving
        )
            ? fastMoving
            : [];

    // ====================================
    // REFRESH
    // ====================================

    const handleRefresh = () => {

        actions.refresh();

    };

    // ====================================
    // INITIAL LOADING
    // ====================================

    if (
        loading &&
        normalizedInsights.length === 0 &&
        normalizedReorder.length === 0 &&
        normalizedStockMovement.length === 0 &&
        normalizedDeadStock.length === 0 &&
        normalizedFastMoving.length === 0
    ) {

        return (

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing.lg
                }}
            >

                <SkeletonLoader
                    variant="rect"
                    height="96px"
                    isDark={isDark}
                />

                <SkeletonLoader
                    variant="rect"
                    height="120px"
                    isDark={isDark}
                />

                <SkeletonLoader
                    variant="rect"
                    height="400px"
                    isDark={isDark}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(2, minmax(0, 1fr))",
                        gap: theme.spacing.lg
                    }}
                >

                    <SkeletonLoader
                        variant="rect"
                        height="300px"
                        isDark={isDark}
                    />

                    <SkeletonLoader
                        variant="rect"
                        height="300px"
                        isDark={isDark}
                    />

                </div>

            </div>

        );

    }

    // ====================================
    // PAGE
    // ====================================

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing.lg
            }}
        >

            <InventoryInsightsHeader
                onRefresh={
                    handleRefresh
                }
                loading={
                    loading
                }
            />

            {error && (

                <Alert
                    variant="danger"
                    isDark={isDark}
                    title="Inventory analytics error"
                >
                    {error.message ||
                        "One or more inventory analytics requests failed."}
                </Alert>

            )}

            <InsightsSummary
                insights={
                    normalizedInsights
                }
            />

            <InventoryAnalyticsTable
                insights={
                    normalizedInsights
                }
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",
                    gap: theme.spacing.lg,
                    alignItems: "stretch"
                }}
            >

                <ReorderSuggestions
                    suggestions={
                        normalizedReorder
                    }
                />

                <FastMovingProducts
                    products={
                        normalizedFastMoving
                    }
                />

            </div>

            <StockMovementPanel
                movements={
                    normalizedStockMovement
                }
            />

            <DeadStockPanel
                items={
                    normalizedDeadStock
                }
            />

        </div>

    );

};

export default InventoryInsights;
