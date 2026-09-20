// ====================================
// SUPPLIER BUSINESS HOOK
// ====================================
//
// Feature-level orchestration for supplier
// server state and business operations.
//
// Architecture:
//
// Page
//   ↓
// useSuppliers
//   ↓
// Query / Mutation
//   ↓
// SupplierRepository
//   ↓
// SupplierService
//   ↓
// apiClient
//   ↓
// Backend
//
// UI-only concerns remain in UI hooks.
// ====================================



import {
    useQuery,
    useMutation
} from "../../../query";

import SupplierRepository
    from "../../../repositories/suppliers/SupplierRepository";

// ====================================
// QUERY KEYS
// ====================================

const SUPPLIERS_KEY = [
    "suppliers"
];

const SUPPLIER_ANALYTICS_KEY = [
    "suppliers",
    "analytics"
];

// ====================================
// BUSINESS HOOK
// ====================================

const useSuppliers = () => {

    // ====================================
    // SUPPLIERS QUERY
    // ====================================

    const suppliersQuery =
        useQuery(
            SUPPLIERS_KEY,
            () =>
                SupplierRepository.getAll(),
            {
                staleTime:
                    2 * 60 * 1000
            }
        );

    // ====================================
    // ANALYTICS QUERY
    // ====================================

    const analyticsQuery =
        useQuery(
            SUPPLIER_ANALYTICS_KEY,
            () =>
                SupplierRepository.getAnalytics(),
            {
                staleTime:
                    5 * 60 * 1000
            }
        );

    // ====================================
    // CREATE
    // ====================================

    const createMutation =
        useMutation(
            (supplier) =>
                SupplierRepository.create(
                    supplier
                ),
            {
                invalidateKeys: [
                    SUPPLIERS_KEY,
                    SUPPLIER_ANALYTICS_KEY
                ],
                throwOnError: true
            }
        );

    // ====================================
    // UPDATE
    // ====================================

    const updateMutation =
        useMutation(
            ({ id, supplier }) =>
                SupplierRepository.update(
                    id,
                    supplier
                ),
            {
                invalidateKeys: [
                    SUPPLIERS_KEY,
                    SUPPLIER_ANALYTICS_KEY
                ],
                throwOnError: true
            }
        );

    // ====================================
    // DELETE
    // ====================================

    const deleteMutation =
        useMutation(
            (id) =>
                SupplierRepository.remove(id),
            {
                invalidateKeys: [
                    SUPPLIERS_KEY,
                    SUPPLIER_ANALYTICS_KEY
                ],
                throwOnError: true
            }
        );

    // ====================================
    // REFRESH SUPPLIERS
    // ====================================

    const refresh = suppliersQuery.refetch;

    // ====================================
    // REFRESH ANALYTICS
    // ====================================

    const refreshAnalytics =
    analyticsQuery.refetch;

    // ====================================
    // QUERY STATE
    // ====================================

    const loading =
        suppliersQuery.loading ||
        analyticsQuery.loading;

    const error =
        suppliersQuery.error ||
        analyticsQuery.error ||
        null;

    // ====================================
    // RETURN BUSINESS API
    // ====================================

    return {

        // --------------------------------
        // DATA
        // --------------------------------

        data:
            suppliersQuery.data || [],

        analytics:
            analyticsQuery.data || null,

        // --------------------------------
        // QUERY STATE
        // --------------------------------

        loading,

        error,

        // --------------------------------
        // QUERIES
        // --------------------------------

        suppliersQuery,

        analyticsQuery,

        // --------------------------------
        // BUSINESS ACTIONS
        // --------------------------------

        actions: {

            createSupplier:
                createMutation.mutate,

            updateSupplier:
                updateMutation.mutate,

            deleteSupplier:
                deleteMutation.mutate,

            refresh,

            refreshAnalytics

        },

        // --------------------------------
        // MUTATION STATE
        // --------------------------------

        mutation: {

            isCreating:
                createMutation.isLoading,

            isUpdating:
                updateMutation.isLoading,

            isDeleting:
                deleteMutation.isLoading,

            error:
                createMutation.error ||
                updateMutation.error ||
                deleteMutation.error ||
                null

        }

    };
};

export default useSuppliers;