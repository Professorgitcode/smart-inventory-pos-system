import { useState, useEffect, useCallback } from "react";

import useAsync from "../ui/useAsync";

import { ReportRepository } from "../../repositories";

const useReports = () => {

    /*
    =====================================
    Async State
    =====================================
    */

    const {

        loading,

        error,

        execute

    } = useAsync();

    /*
    =====================================
    State
    =====================================
    */

    const [salesReport, setSalesReport] = useState(null);

    const [inventoryReport, setInventoryReport] = useState(null);

    const [dashboardSummary, setDashboardSummary] = useState(null);

    /*
    =====================================
    Load Methods
    =====================================
    */

    const loadSalesReport = useCallback(async () => {

        const result = await execute(() =>
            ReportRepository.getSalesReport()
        );

        if (result) {

            setSalesReport(result);

        }

    }, [execute]);

    const loadInventoryReport = useCallback(async () => {

        const result = await execute(() =>
            ReportRepository.getInventoryReport()
        );

        if (result) {

            setInventoryReport(result);

        }

    }, [execute]);

    const loadDashboardSummary = useCallback(async () => {

        const result = await execute(() =>
            ReportRepository.getDashboardSummary()
        );

        if (result) {

            setDashboardSummary(result);

        }

    }, [execute]);

    /*
    =====================================
    Business Methods
    =====================================
    */

    const refresh = useCallback(async () => {

        await Promise.all([

            loadSalesReport(),

            loadInventoryReport(),

            loadDashboardSummary()

        ]);

    }, [

        loadSalesReport,

        loadInventoryReport,

        loadDashboardSummary

    ]);

    /*
    =====================================
    Export Methods
    =====================================
    */

    const exportPDF = useCallback(() => {

        return ReportRepository.exportPDF();

    }, []);

    const exportExcel = useCallback(() => {

        return ReportRepository.exportExcel();

    }, []);

    const exportCSV = useCallback(() => {

        return ReportRepository.exportCSV();

    }, []);

    /*
    =====================================
    Effects
    =====================================
    */

    useEffect(() => {

        refresh();

    }, [refresh]);

    /*
    =====================================
    Public API
    =====================================
    */

    return {

        data: {

            salesReport,

            inventoryReport,

            dashboardSummary

        },

        loading,

        error,

        actions: {

            refresh,

            exportPDF,

            exportExcel,

            exportCSV

        }

    };

};

export default useReports;