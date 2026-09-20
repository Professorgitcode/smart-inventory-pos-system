// ====================================
// INVENTORY INSIGHTS BUSINESS HOOK
// ====================================
//
// Server-state orchestration for inventory
// analytics used by Dashboard and the
// Inventory Insights page.
//
// Architecture:
//
// useInventoryInsights
//      ↓
// InventoryInsightsRepository
//      ↓
// InventoryInsightsService
//      ↓
// apiClient
//      ↓
// Backend
// ====================================

import {
    useCallback
} from "react";

import {
    useQuery
} from "../../../query";

import InventoryInsightsRepository
    from "../../../repositories/inventoryInsights/InventoryInsightsRepository";

// ====================================
// QUERY KEYS
// ====================================

const INSIGHTS_KEY = [
    "inventory-insights"
];

const REORDER_KEY = [
    "inventory-insights",
    "reorder"
];

const STOCK_MOVEMENT_KEY = [
    "inventory-insights",
    "stock-movement"
];

const DEAD_STOCK_KEY = [
    "inventory-insights",
    "dead-stock"
];

const FAST_MOVING_KEY = [
    "inventory-insights",
    "fast-moving"
];

// ====================================
// BUSINESS HOOK
// ====================================

const useInventoryInsights = () => {

    // ====================================
    // GENERAL INSIGHTS
    // ====================================

    const insightsQuery =
        useQuery(
            INSIGHTS_KEY,
            () =>
                InventoryInsightsRepository.getInsights(),
            {
                staleTime:
                    5 * 60 * 1000
            }
        );

    // ====================================
    // REORDER
    // ====================================

    const reorderQuery =
        useQuery(
            REORDER_KEY,
            () =>
                InventoryInsightsRepository.getReorder(),
            {
                staleTime:
                    5 * 60 * 1000
            }
        );

    // ====================================
    // STOCK MOVEMENT
    // ====================================

    const stockMovementQuery =
        useQuery(
            STOCK_MOVEMENT_KEY,
            () =>
                InventoryInsightsRepository.getStockMovement(),
            {
                staleTime:
                    5 * 60 * 1000
            }
        );

    // ====================================
    // DEAD STOCK
    // ====================================

    const deadStockQuery =
        useQuery(
            DEAD_STOCK_KEY,
            () =>
                InventoryInsightsRepository.getDeadStock(),
            {
                staleTime:
                    5 * 60 * 1000
            }
        );

    // ====================================
    // FAST MOVING
    // ====================================

    const fastMovingQuery =
        useQuery(
            FAST_MOVING_KEY,
            () =>
                InventoryInsightsRepository.getFastMoving(),
            {
                staleTime:
                    5 * 60 * 1000
            }
        );

    // ====================================
    // REFRESH ALL
    // ====================================

    const refresh =
        useCallback(
            async () => {

                return Promise.all([
                    insightsQuery.refetch(),
                    reorderQuery.refetch(),
                    stockMovementQuery.refetch(),
                    deadStockQuery.refetch(),
                    fastMovingQuery.refetch()
                ]);

            },
            [
                insightsQuery.refetch,
                reorderQuery.refetch,
                stockMovementQuery.refetch,
                deadStockQuery.refetch,
                fastMovingQuery.refetch
            ]
        );

    // ====================================
    // COMBINED STATE
    // ====================================

    const loading =
        insightsQuery.loading ||
        reorderQuery.loading ||
        stockMovementQuery.loading ||
        deadStockQuery.loading ||
        fastMovingQuery.loading;

    const error =
        insightsQuery.error ||
        reorderQuery.error ||
        stockMovementQuery.error ||
        deadStockQuery.error ||
        fastMovingQuery.error ||
        null;

    // ====================================
    // RETURN BUSINESS API
    // ====================================

    return {

        insights:
            insightsQuery.data,

        reorder:
            reorderQuery.data || [],

        stockMovement:
            stockMovementQuery.data || [],

        deadStock:
            deadStockQuery.data || [],

        fastMoving:
            fastMovingQuery.data || [],

        loading,

        error,

        actions: {

            refresh

        }

    };
};

export default useInventoryInsights;
