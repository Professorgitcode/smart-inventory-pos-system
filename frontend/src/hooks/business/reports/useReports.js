// ====================================
// REPORTS BUSINESS HOOK
// ====================================
//
// Server state:
//
// - Report data
//
// Imperative operations:
//
// - PDF export
// - CSV export
// - Excel export
// - DOCX export
// ====================================

import {
    useCallback
} from "react";

import {
    useQuery
} from "../../../query";

import ReportsRepository
    from "../../../repositories/reports/ReportsRepository";

const REPORTS_KEY = [
    "reports"
];

const useReports = (
    parameters = {}
) => {

    // ====================================
    // REPORT QUERY
    // ====================================

    const reportQuery =
        useQuery(
            REPORTS_KEY,
            () =>
                ReportsRepository.getReport(
                    parameters
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
            (params = parameters) =>
                ReportsRepository.exportPDF(
                    params
                ),
            [
                parameters
            ]
        );

    // ====================================
    // EXPORT CSV
    // ====================================

    const exportCSV =
        useCallback(
            (params = parameters) =>
                ReportsRepository.exportCSV(
                    params
                ),
            [
                parameters
            ]
        );

    // ====================================
    // EXPORT EXCEL
    // ====================================

    const exportExcel =
        useCallback(
            (params = parameters) =>
                ReportsRepository.exportExcel(
                    params
                ),
            [
                parameters
            ]
        );

    // ====================================
    // EXPORT DOCX
    // ====================================

    const exportDocx =
        useCallback(
            (params = parameters) =>
                ReportsRepository.exportDocx(
                    params
                ),
            [
                parameters
            ]
        );

    // ====================================
    // REFRESH
    // ====================================

    const refresh =
        useCallback(
            () =>
                reportQuery.refetch(),
            [
                reportQuery.refetch
            ]
        );

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