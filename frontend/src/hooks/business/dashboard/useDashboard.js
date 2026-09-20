// ====================================
// DASHBOARD BUSINESS HOOK
// ====================================
//
// Server-state responsibilities:
//
// - Dashboard data
// - Loading state
// - Error state
// - Refresh
//
// Architecture:
//
// useDashboard
//      ↓
// DashboardRepository
//      ↓
// DashboardService
//      ↓
// GET /api/dashboard
// ====================================

import {
    useCallback
} from "react";

import {
    useQuery
} from "../../../query";

import DashboardRepository
    from "../../../repositories/dashboard/DashboardRepository";

const DASHBOARD_KEY = [
    "dashboard"
];

const useDashboard = () => {

    // ====================================
    // DASHBOARD QUERY
    // ====================================

    const dashboardQuery =
        useQuery(
            DASHBOARD_KEY,
            () =>
                DashboardRepository.getDashboard(),
            {
                staleTime:
                    2 * 60 * 1000
            }
        );

    // ====================================
    // REFRESH
    // ====================================

    const refresh =
        useCallback(
            () =>
                dashboardQuery.refetch(),
            [
                dashboardQuery.refetch
            ]
        );

    // ====================================
    // RETURN BUSINESS API
    // ====================================

    return {

        data:
            dashboardQuery.data,

        loading:
            dashboardQuery.loading,

        error:
            dashboardQuery.error,

        actions: {

            refresh

        }

    };
};

export default useDashboard;