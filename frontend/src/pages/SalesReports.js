import React, {
    useMemo,
    useState
} from "react";

import {
    useTheme
} from "../context/ThemeContext";

import useReports
    from "../hooks/business/reports/useReports";

import useToast
    from "../hooks/ui/useToast";

import ReportsHeader
    from "../components/reports/ReportsHeader";

import ReportsSummary
    from "../components/reports/ReportsSummary";

import SalesTrendChart
    from "../components/reports/SalesTrendChart";

import RecentOrders
    from "../components/reports/RecentOrders";

import ReportExportMenu
    from "../components/reports/ReportExportMenu";

import Toast
    from "../components/common/Toast";

import {
    Card,
    SkeletonLoader,
    Alert
} from "../components/ui";

// ====================================
// SALES REPORTS PAGE
// ====================================
// Composition layer.
//
// Responsibilities:
// - report filter state
// - business hook orchestration
// - export event handling
// - composition of report components
//
// API communication does not belong here.
// ====================================

const SalesReports = () => {

    const {
        theme
    } = useTheme();

    // ====================================
    // FILTER STATE
    // ====================================

    const [
        startDate,
        setStartDate
    ] = useState("");

    const [
        endDate,
        setEndDate
    ] = useState("");

    // ====================================
    // UI STATE
    // ====================================

    const toast =
        useToast();

    const [
        isExporting,
        setIsExporting
    ] = useState(false);

    // ====================================
    // REPORT PARAMETERS
    // ====================================

    const parameters =
        useMemo(
            () => ({
                startDate,
                endDate
            }),
            [
                startDate,
                endDate
            ]
        );

    // ====================================
    // BUSINESS STATE
    // ====================================

    const {
        data,
        loading,
        error,
        actions
    } = useReports(
        parameters
    );

    // ====================================
    // EXPORT
    // ====================================

    const handleExport = async (
        format
    ) => {

        setIsExporting(
            true
        );

        try {

            let response;

            switch (
                format
            ) {

                case "pdf":
                    response =
                        await actions.exportPDF(
                            parameters
                        );
                    break;

                case "excel":
                    response =
                        await actions.exportExcel(
                            parameters
                        );
                    break;

                case "csv":
                    response =
                        await actions.exportCSV(
                            parameters
                        );
                    break;

                case "docx":
                    response =
                        await actions.exportDocx(
                            parameters
                        );
                    break;

                default:
                    throw new Error(
                        "Unsupported report format."
                    );

            }

            const blob =
                response?.data instanceof Blob
                    ? response.data
                    : response;

            const url =
                window.URL.createObjectURL(
                    blob
                );

            const anchor =
                document.createElement(
                    "a"
                );

            const extension =
                format === "excel"
                    ? "xlsx"
                    : format;

            anchor.href = url;

            anchor.download =
                `sales-report${
                    startDate
                        ? `-${startDate}`
                        : ""
                }${
                    endDate
                        ? `-to-${endDate}`
                        : ""
                }.${extension}`;

            document.body.appendChild(
                anchor
            );

            anchor.click();

            anchor.remove();

            window.URL.revokeObjectURL(
                url
            );

            toast.success(
                "Export Complete",
                `${format.toUpperCase()} report downloaded successfully.`
            );

        } catch (
            exportError
        ) {

            toast.error(
                "Export Failed",
                exportError?.message ||
                    "Unable to export the sales report."
            );

        } finally {

            setIsExporting(
                false
            );

        }

    };

    // ====================================
    // REFRESH
    // ====================================

    const handleRefresh = () => {

        actions.refresh();

    };

    // ====================================
    // LOADING
    // ====================================

    if (
        loading &&
        !data
    ) {

        return (

            <div
                style={{
                    display: "flex",
                    flexDirection:
                        "column",
                    gap: theme.spacing.lg
                }}
            >

                <SkeletonLoader
                    variant="rect"
                    height="82px"
                    isDark={theme.isDark}
                />

                <SkeletonLoader
                    variant="rect"
                    height="110px"
                    isDark={theme.isDark}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "minmax(0, 2fr) minmax(320px, 1fr)",
                        gap: theme.spacing.lg
                    }}
                >

                    <SkeletonLoader
                        variant="rect"
                        height="420px"
                        isDark={theme.isDark}
                    />

                    <SkeletonLoader
                        variant="rect"
                        height="420px"
                        isDark={theme.isDark}
                    />

                </div>

            </div>

        );

    }

    // ====================================
    // ERROR
    // ====================================

    if (
        error &&
        !data
    ) {

        return (

            <Alert
                variant="danger"
                title="Sales report error"
            >
                {error.message ||
                    "Unable to load sales reporting data."}
            </Alert>

        );

    }

    // ====================================
    // PAGE
    // ====================================

    return (

        <div
            style={{
                display: "flex",
                flexDirection:
                    "column",
                gap: theme.spacing.lg
            }}
        >

            <ReportsHeader

                startDate={
                    startDate
                }

                endDate={
                    endDate
                }

                onStartDateChange={
                    event =>
                        setStartDate(
                            event.target.value
                        )
                }

                onEndDateChange={
                    event =>
                        setEndDate(
                            event.target.value
                        )
                }

                onRefresh={
                    handleRefresh
                }

                loading={
                    loading
                }

            />

            {data && (

                <>

                    <ReportsSummary

                        todayRevenue={
                            data.todayRevenue
                        }

                        weeklyRevenue={
                            data.weeklyRevenue
                        }

                        totalOrders={
                            data.totalOrders
                        }

                        bestSeller={
                            data.bestSeller
                        }

                    />

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "minmax(0, 2fr) minmax(320px, 1fr)",
                            gap: theme.spacing.lg,
                            alignItems:
                                "stretch"
                        }}
                    >

                        <SalesTrendChart

                            salesTrend={
                                data.salesTrend
                            }

                            forecast={
                                data.forecast
                            }

                        />

                        <RecentOrders

                            orders={
                                data.recentOrders
                            }

                        />

                    </div>

                    <Card
                        variant="glass"
                        isDark={
                            undefined
                        }
                        padding="md"
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems:
                                    "center",
                                gap: theme.spacing.md,
                                flexWrap: "wrap"
                            }}
                        >

                            <div>

                                <div
                                    style={{
                                        fontWeight:
                                            theme.typography
                                                .fontWeight.bold,
                                        color:
                                            theme.colors.text
                                    }}
                                >
                                    Export sales report
                                </div>

                                <div
                                    style={{
                                        marginTop:
                                            "3px",
                                        fontSize:
                                            theme.typography
                                                .fontSize.xs,
                                        color:
                                            theme.colors.textMuted
                                    }}
                                >
                                    Download the report
                                    in a supported format.
                                </div>

                            </div>

                            <ReportExportMenu
                                onExport={
                                    handleExport
                                }
                                loading={
                                    isExporting
                                }
                            />

                        </div>

                    </Card>

                </>

            )}

            <Toast

                header={
                    toast.toast.header
                }

                message={
                    toast.toast.message
                }

                type={
                    toast.toast.type
                }

                isVisible={
                    toast.toast.isVisible
                }

                theme={
                    theme
                }

                onClose={
                    toast.hide
                }

            />

        </div>

    );

};

export default SalesReports;
