// ====================================
// REPORTS BUSINESS HOOK
// ====================================
//
// Server state:
// - Sales report data
//
// Imperative operations:
// - PDF export
// - CSV export
// - Excel export
// - DOCX export
//
// Architecture:
//
// useReports
//   ↓
// ReportsRepository
//   ↓
// ReportsService
//   ↓
// apiClient
// ====================================

import {
    useCallback,
    useMemo
} from "react";

import {
    useQuery
} from "../../../query";

import ReportsRepository
    from "../../../repositories/reports/ReportsRepository";

// ====================================
// COMPONENT
// ====================================

const useReports = (
    parameters = {}
) => {

    // ====================================
    // NORMALIZE PARAMETERS
    // ====================================

    const normalizedParameters =
        useMemo(
            () => ({
                startDate:
                    parameters.startDate || "",
                endDate:
                    parameters.endDate || ""
            }),
            [
                parameters.startDate,
                parameters.endDate
            ]
        );

    // ====================================
    // QUERY KEY
    // ====================================

    const reportKey = useMemo(
        () => [
            "reports",
            normalizedParameters.startDate,
            normalizedParameters.endDate
        ],
        [
            normalizedParameters.startDate,
            normalizedParameters.endDate
        ]
    );

    // ====================================
    // REPORT QUERY
    // ====================================

    const reportQuery =
        useQuery(
            reportKey,
            () =>
                ReportsRepository.getReport(
                    normalizedParameters
                ),
            {
                staleTime:
                    5 * 60 * 1000
            }
        );

    // ====================================
    // EXPORT PDF
    // ====================================

    const exportPDF =
        useCallback(
            (params = normalizedParameters) =>
                ReportsRepository.exportPDF(
                    params
                ),
            [
                normalizedParameters
            ]
        );

    // ====================================
    // EXPORT CSV
    // ====================================

    const exportCSV =
        useCallback(
            (params = normalizedParameters) =>
                ReportsRepository.exportCSV(
                    params
                ),
            [
                normalizedParameters
            ]
        );

    // ====================================
    // EXPORT EXCEL
    // ====================================

    const exportExcel =
        useCallback(
            (params = normalizedParameters) =>
                ReportsRepository.exportExcel(
                    params
                ),
            [
                normalizedParameters
            ]
        );

    // ====================================
    // EXPORT DOCX
    // ====================================

    const exportDocx =
        useCallback(
            (params = normalizedParameters) =>
                ReportsRepository.exportDocx(
                    params
                ),
            [
                normalizedParameters
            ]
        );

    // ====================================
    // REFRESH
    // ====================================

    const refresh =
        reportQuery.refetch;

    // ====================================
    // RETURN
    // ====================================

    return {

        data:
            reportQuery.data,

        loading:
            reportQuery.loading,

        error:
            reportQuery.error,

        actions: {

            exportPDF,

            exportCSV,

            exportExcel,

            exportDocx,

            refresh

        }

    };

};

export default useReports;