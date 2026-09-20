// ====================================
// INVENTORY BUSINESS HOOK
// ====================================
//
// Server-state responsibilities:
//
// - Product catalogue
// - Product creation
// - Product update
// - Product deletion
//
// UI concerns remain outside this hook.
// ====================================

import {
    useCallback
} from "react";

import {
    useQuery,
    useMutation
} from "../../../query";

import InventoryRepository
    from "../../../repositories/inventory/InventoryRepository";

const INVENTORY_KEY = [
    "inventory"
];

const useInventory = () => {

    // ====================================
    // INVENTORY QUERY
    // ====================================

    const inventoryQuery =
        useQuery(
            INVENTORY_KEY,
            () =>
                InventoryRepository.getAll(),
            {
                staleTime:
                    2 * 60 * 1000
            }
        );

    // ====================================
    // CREATE PRODUCT
    // ====================================

    const createMutation =
        useMutation(
            (product) =>
                InventoryRepository.create(
                    product
                ),
            {
                invalidateKeys: [
                    INVENTORY_KEY
                ],
                throwOnError: true
            }
        );

    // ====================================
    // UPDATE PRODUCT
    // ====================================

    const updateMutation =
        useMutation(
            ({ id, product }) =>
                InventoryRepository.update(
                    id,
                    product
                ),
            {
                invalidateKeys: [
                    INVENTORY_KEY
                ],
                throwOnError: true
            }
        );

    // ====================================
    // DELETE PRODUCT
    // ====================================

    const deleteMutation =
        useMutation(
            (id) =>
                InventoryRepository.remove(id),
            {
                invalidateKeys: [
                    INVENTORY_KEY
                ],
                throwOnError: true
            }
        );

    // ====================================
    // GET PRODUCT BY ID
    // ====================================
    //
    // Temporary imperative operation.
    //
    // When the Inventory page is migrated,
    // this can become a parameterized query:
    //
    // ["inventory", id]
    //
    // ====================================

    const getProduct =
        useCallback(
            (id) =>
                InventoryRepository.getById(id),
            []
        );

    // ====================================
    // REFRESH
    // ====================================

    const refresh =
        useCallback(
            () =>
                inventoryQuery.refetch(),
            [
                inventoryQuery.refetch
            ]
        );

    // ====================================
    // COMBINED STATE
    // ====================================

    const loading =
        inventoryQuery.loading ||
        createMutation.isLoading ||
        updateMutation.isLoading ||
        deleteMutation.isLoading;

    const error =
        inventoryQuery.error ||
        createMutation.error ||
        updateMutation.error ||
        deleteMutation.error ||
        null;

    // ====================================
    // RETURN BUSINESS API
    // ====================================

    return {

        data:
            inventoryQuery.data || [],

        loading,

        error,

        actions: {

            getProduct,

            createProduct:
                createMutation.mutate,

            updateProduct:
                updateMutation.mutate,

            deleteProduct:
                deleteMutation.mutate,

            refresh

        }

    };
};

export default useInventory;