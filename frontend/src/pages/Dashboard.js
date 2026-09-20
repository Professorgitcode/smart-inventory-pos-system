// ====================================
// DASHBOARD PAGE
// ====================================
//
// Presentation layer for the application
// dashboard.
//
// Server state comes exclusively from:
//
// useDashboard
// useForecasting
// useInventoryInsights
//
// The page does not:
// - call fetch()
// - construct API URLs
// - manage server-state requests
// - know backend routes
//
// Architecture:
//
// Dashboard
//    ↓
// Business Hooks
//    ↓
// Repositories
//    ↓
// Services
//    ↓
// apiClient
//    ↓
// Backend
// ====================================

import React from "react";

import {
    Package,
    TrendingUp,
    AlertTriangle,
    Warehouse,
    RefreshCw,
} from "lucide-react";

import {
    BarChart,
    Bar,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from "recharts";

import useDashboard
    from "../hooks/business/dashboard/useDashboard";

import   useForecasting
    from "../hooks/business/forecasting/useForecasting";

import useInventoryInsights
    from "../hooks/business/inventory/useInventoryInsights";

import {
    useAuth
} from "../auth";


import MiniStat
    from "../components/dashboard/MiniStat";

import TableCard
    from "../components/dashboard/TableCard";

import InventoryHealthChart
    from "../components/dashboard/InventoryHealthChart";

import RevenueForecastChart
    from "../components/dashboard/RevenueForecastChart";

import QuickActionsPanel
    from "../components/dashboard/QuickActionsPanel";

import EnterpriseDashboardHeader
    from "../components/dashboard/EnterpriseDashboardHeader";

import StatisticsOverview
    from "../components/dashboard/StatisticsOverview";

import DataVisualizationSection
    from "../components/dashboard/DataVisualizationSection";

// ====================================
// DASHBOARD
// ====================================

const Dashboard = ({ theme }) => {

    // ====================================
    // AUTHENTICATED USER
    // ====================================

    const {
        user
    } = useAuth();

    // ====================================
    // DASHBOARD DATA
    // ====================================

    const {
        data: dashboard,
        loading: dashboardLoading,
        error: dashboardError,
        actions: dashboardActions
    } = useDashboard();

    // ====================================
    // GENERAL FORECAST
    // ====================================

    const {
        forecast,
        loading: forecastLoading,
        error: forecastError
    } = useForecasting();

    // ====================================
    // INVENTORY INSIGHTS
    // ====================================

    const {
        reorder,
        stockMovement,
        deadStock,
        fastMoving,
        loading: insightsLoading,
        error: insightsError
    } = useInventoryInsights();

    // ====================================
    // NORMALIZED DASHBOARD DATA
    // ====================================

    const totalProducts =
        Number(
            dashboard?.totalProducts || 0
        );

    const totalSales =
        Number(
            dashboard?.totalSales || 0
        );

    const lowStockCount =
        Number(
            dashboard?.lowStockCount || 0
        );

    const recentOrders =
        Array.isArray(
            dashboard?.recentOrders
        )
            ? dashboard.recentOrders
            : [];

    // ====================================
    // NORMALIZED ANALYTICS
    // ====================================

    const fastMovingProducts =
        Array.isArray(fastMoving)
            ? fastMoving
            : [];

    const deadStockProducts =
        Array.isArray(deadStock)
            ? deadStock
            : [];

    const reorderSuggestions =
        Array.isArray(reorder)
            ? reorder
            : [];

    const stockMovementData =
        Array.isArray(stockMovement)
            ? stockMovement
            : [];

    // ====================================
    // FORECAST DATA
    // ====================================

    const forecastData =
        Array.isArray(forecast)
            ? forecast
            : [];

    // ====================================
    // INVENTORY METRICS
    // ====================================

    const fastMovingCount =
        fastMovingProducts.length;

    const deadStockCount =
        deadStockProducts.length;

    const reorderCount =
        reorderSuggestions.length;

    const healthyCount =
        Math.max(
            totalProducts - lowStockCount,
            0
        );

    const healthyPercentage =
        totalProducts > 0
            ? (
                healthyCount /
                totalProducts
            ) * 100
            : 0;

    // ====================================
    // STOCK MOVEMENT CHART DATA
    // ====================================

    const movementChartData =
        stockMovementData.map(
            (item) => ({
                name:
                    item.productName,

                sold:
                    Number(
                        item.totalSold || 0
                    ),

                stock:
                    Number(
                        item.currentStock || 0
                    )
            })
        );

    // ====================================
    // REVENUE FORECAST DATA
    // ====================================

    const revenueData =
        forecastData.map(
            (item) => ({
                date:
                    item.date,

                actual:
                    Number(
                        item.actualRevenue || 0
                    ),

                predicted:
                    Number(
                        item.predictedRevenue || 0
                    )
            })
        );

    // ====================================
    // INVENTORY HEALTH
    // ====================================
    //
    // We only derive what the backend data
    // actually supports:
    //
    // Healthy products
    // Low-stock products
    //
    // We do not invent arbitrary percentages
    // for "At Risk" and "Critical".
    // ====================================

    const healthData = [
        {
            name: "Healthy",
            value: healthyCount,
            color:
                theme.colors.success ||
                "#10b981"
        },
        {
            name: "Low Stock",
            value: lowStockCount,
            color:
                theme.colors.warning ||
                "#f59e0b"
        }
    ];

    // ====================================
    // USER DISPLAY NAME
    // ====================================

    const userName = [
        user?.firstName,
        user?.lastName
    ]
        .filter(Boolean)
        .join(" ") ||
        user?.username ||
        "User";

    // ====================================
    // REQUEST STATE
    // ====================================

    const loading =
        dashboardLoading ||
        forecastLoading ||
        insightsLoading;

    const error =
        dashboardError ||
        forecastError ||
        insightsError ||
        null;

    // ====================================
    // REFRESH
    // ====================================

    const handleRefresh =
        async () => {

            await Promise.all([
                dashboardActions.refresh()
            ]);

        };

    // ====================================
    // OVERVIEW PANEL
    // ====================================

    const overviewPanel = (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "2fr 1fr",
                gap: "24px"
            }}
        >
            <RevenueForecastChart
                theme={theme}
                revenueData={revenueData}
            />

            <InventoryHealthChart
                theme={theme}
                healthData={healthData}
                healthyPercentage={
                    healthyPercentage
                }
            />
        </div>
    );

    // ====================================
    // TRENDS PANEL
    // ====================================

    const trendsPanel = (
        <div
            style={{
                background:
                    theme.colors.surface,
                border:
                    `1px solid ${theme.colors.border}`,
                borderRadius:
                    theme.radius?.xl ||
                    "24px",
                padding: "28px",
                boxShadow:
                    theme.shadows?.sm ||
                    "none"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center"
                }}
            >
                <div>
                    <h3
                        style={{
                            margin: 0,
                            color:
                                theme.colors.text,
                            fontSize: "16px",
                            fontWeight: 700
                        }}
                    >
                        Stock Movement
                    </h3>

                    <p
                        style={{
                            margin:
                                "4px 0 0",
                            color:
                                theme.colors.textMuted,
                            fontSize: "13px"
                        }}
                    >
                        Sales and current stock by product
                    </p>
                </div>
            </div>

            <div
                style={{
                    height: "340px",
                    marginTop: "20px"
                }}
            >
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={
                            movementChartData
                        }
                    >
                        <XAxis
                            dataKey="name"
                            hide
                        />

                        <Tooltip
                            formatter={(
                                value,
                                name
                            ) => [
                                `${value} units`,
                                name === "sold"
                                    ? "Sold"
                                    : "Stock"
                            ]}
                            contentStyle={{
                                backgroundColor:
                                    theme.colors.surface,
                                border:
                                    `1px solid ${theme.colors.border}`,
                                borderRadius:
                                    theme.radius?.md ||
                                    "12px",
                                color:
                                    theme.colors.text
                            }}
                        />

                        <Bar
                            dataKey="sold"
                            fill={
                                theme.colors.primary ||
                                "#3b82f6"
                            }
                            radius={[
                                4,
                                4,
                                0,
                                0
                            ]}
                            barSize={20}
                        />

                        <Bar
                            dataKey="stock"
                            fill={
                                theme.colors.accent ||
                                "#06b6d4"
                            }
                            radius={[
                                4,
                                4,
                                0,
                                0
                            ]}
                            barSize={20}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    // ====================================
    // DETAILS PANEL
    // ====================================

    const detailsPanel = (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "1fr 1fr",
                gap: "24px"
            }}
        >
            <TableCard
                theme={theme}
                title="Fast Moving Products"
                items={
                    fastMovingProducts
                        .slice(0, 5)
                        .map(
                            (product) => ({
                                name:
                                    product.productName,

                                stat:
                                    `${Number(
                                        product.totalSold ||
                                        0
                                    )} units sold`,

                                badge:
                                    product.velocityCategory ||
                                    "FAST",

                                bColor:
                                    "#06b6d4"
                            })
                        )
                }
            />

            <TableCard
                theme={theme}
                title="Dead Stock Alerts"
                items={
                    deadStockProducts
                        .slice(0, 5)
                        .map(
                            (product) => ({
                                name:
                                    product.productName,

                                stat:
                                    `${Number(
                                        product.daysInInventory ||
                                        0
                                    )} days in inventory`,

                                badge:
                                    product.riskLevel ||
                                    "REVIEW",

                                bColor:
                                    "#ef4444"
                            })
                        )
                }
            />
        </div>
    );

    // ====================================
    // RETURN
    // ====================================

    return (
        <div
            style={{
                padding: "32px",
                backgroundColor:
                    theme.colors.background,
                minHeight: "100vh",
                color:
                    theme.colors.text,
                fontFamily:
                    theme.typography
                        .fontFamily
                        .primary,
                boxSizing:
                    "border-box"
            }}
        >

            {/* ==================================
                ERROR / STATUS
            ================================== */}

            {error && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between",
                        gap: "16px",
                        padding: "14px 16px",
                        marginBottom: "24px",
                        borderRadius:
                            theme.radius?.md ||
                            "12px",
                        border:
                            `1px solid ${theme.colors.danger || "#ef4444"}`,
                        background:
                            "rgba(239, 68, 68, 0.08)"
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontWeight: 700,
                                color:
                                    theme.colors.text
                            }}
                        >
                            Dashboard data unavailable
                        </div>

                        <div
                            style={{
                                marginTop: "4px",
                                fontSize: "13px",
                                color:
                                    theme.colors.textMuted
                            }}
                        >
                            One or more dashboard data requests failed.
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={loading}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding:
                                "8px 12px",
                            border: "none",
                            borderRadius:
                                theme.radius?.sm ||
                                "8px",
                            background:
                                theme.colors.primary ||
                                "#3b82f6",
                            color: "#ffffff",
                            cursor:
                                loading
                                    ? "not-allowed"
                                    : "pointer",
                            opacity:
                                loading
                                    ? 0.6
                                    : 1
                        }}
                    >
                        <RefreshCw
                            size={14}
                        />

                        Retry
                    </button>
                </div>
            )}

            {/* ==================================
                HEADER
            ================================== */}

            <EnterpriseDashboardHeader
                theme={theme}
                user={userName}
            />

            {/* ==================================
                QUICK ACTIONS
            ================================== */}

            <QuickActionsPanel
                theme={theme}
            />

            {/* ==================================
                STATISTICS
            ================================== */}

            <StatisticsOverview
                theme={theme}
                items={[
                    {
                        label:
                            "Total Products",
                        value:
                            totalProducts,
                        icon:
                            <Package size={18} />,
                        color:
                            theme.colors.primary ||
                            "#3b82f6"
                    },
                    {
                        label:
                            "Low Stock",
                        value:
                            lowStockCount,
                        icon:
                            <AlertTriangle
                                size={18}
                            />,
                        color:
                            theme.colors.warning ||
                            "#f59e0b"
                    },
                    {
                        label:
                            "Fast Moving",
                        value:
                            fastMovingCount,
                        icon:
                            <TrendingUp
                                size={18}
                            />,
                        color:
                            theme.colors.success ||
                            "#10b981"
                    },
                    {
                        label:
                            "Dead Stock",
                        value:
                            deadStockCount,
                        icon:
                            <Warehouse
                                size={18}
                            />,
                        color:
                            "#8b5cf6"
                    },
                    {
                        label:
                            "Reorder Suggestions",
                        value:
                            reorderCount,
                        icon:
                            <RefreshCw
                                size={18}
                            />,
                        color:
                            theme.colors.danger ||
                            "#ef4444"
                    }
                ]}
            />

            {/* ==================================
                DATA VISUALIZATION
            ================================== */}

            <DataVisualizationSection
                theme={theme}
                overviewContent={
                    overviewPanel
                }
                trendsContent={
                    trendsPanel
                }
                detailsContent={
                    detailsPanel
                }
            />

            {/* ==================================
                FOOTER METRICS
            ================================== */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(4, 1fr)",
                    gap: "20px"
                }}
            >
                <MiniStat
                    theme={theme}
                    label="Total Sales"
                    val={
                        `$${totalSales.toLocaleString()}`
                    }
                    sub="Recorded sales"
                />

                <MiniStat
                    theme={theme}
                    label="Fast Movers"
                    val={
                        fastMovingCount
                    }
                    sub="Products"
                />

                <MiniStat
                    theme={theme}
                    label="Reorder Suggestions"
                    val={
                        reorderCount
                    }
                    sub="Items"
                />

                <MiniStat
                    theme={theme}
                    label="Dead Stock"
                    val={
                        deadStockCount
                    }
                    sub="Products"
                />
            </div>

            {/* ==================================
                OPTIONAL LOADING INDICATOR
            ================================== */}

            {loading && (
                <div
                    style={{
                        position: "fixed",
                        right: "24px",
                        bottom: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding:
                            "10px 14px",
                        borderRadius:
                            theme.radius?.md ||
                            "12px",
                        background:
                            theme.colors.surface,
                        border:
                            `1px solid ${theme.colors.border}`,
                        color:
                            theme.colors.textMuted,
                        fontSize: "12px",
                        boxShadow:
                            theme.shadows?.md ||
                            "none",
                        zIndex: 1000
                    }}
                >
                    <RefreshCw
                        size={14}
                    />

                    Updating dashboard...
                </div>
            )}

        </div>
    );
};

export default Dashboard;
