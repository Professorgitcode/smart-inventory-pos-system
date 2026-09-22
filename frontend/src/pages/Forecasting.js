import React from "react";

import {
    useTheme
} from "../context/ThemeContext";

import useForecasting
    from "../hooks/business/forecasting/useForecasting";

import useProductForecast
    from "../hooks/business/forecasting/useProductForecast";

import ForecastingHeader
    from "../components/forecasting/ForecastingHeader";

import ForecastSummary
    from "../components/forecasting/ForecastSummary";

import RevenueForecastChart
    from "../components/forecasting/RevenueForecastChart";

import ProductForecastGrid
    from "../components/forecasting/ProductForecastGrid";

import {
    Alert,
    SkeletonLoader
} from "../components/ui";

// ====================================
// FORECASTING PAGE
// ====================================
// Composition layer.
//
// Responsibilities:
// - Connect business hooks
// - Coordinate refresh actions
// - Compose forecasting components
//
// API communication and business logic
// do not belong in this page.
// ====================================

const Forecasting = () => {

    const {
        theme,
        isDark
    } = useTheme();

    // ====================================
    // REVENUE FORECAST
    // ====================================

    const {
        data: forecast,
        loading: forecastLoading,
        error: forecastError,
        actions: forecastActions
    } = useForecasting();

    // ====================================
    // PRODUCT FORECAST
    // ====================================

    const {
        data: productForecasts,
        loading: productForecastLoading,
        error: productForecastError,
        actions: productForecastActions
    } = useProductForecast();

    // ====================================
    // REFRESH
    // ====================================

    const handleRefresh = () => {

        forecastActions.refresh();

        productForecastActions.refresh();

    };

    // ====================================
    // LOADING
    // ====================================

    const initialLoading =
        forecastLoading &&
        !forecast &&
        productForecastLoading &&
        productForecasts.length === 0;

    if (initialLoading) {

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
                    height="118px"
                    isDark={isDark}
                />

                <SkeletonLoader
                    variant="rect"
                    height="400px"
                    isDark={isDark}
                />

                <SkeletonLoader
                    variant="rect"
                    height="300px"
                    isDark={isDark}
                />

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

            <ForecastingHeader
                onRefresh={
                    handleRefresh
                }
                loading={
                    forecastLoading ||
                    productForecastLoading
                }
            />

            {forecastError && (

                <Alert
                    variant="danger"
                    isDark={isDark}
                    title="Revenue forecast unavailable"
                >
                    {forecastError.message ||
                        "Unable to load the revenue forecast."}
                </Alert>

            )}

            {productForecastError && (

                <Alert
                    variant="danger"
                    isDark={isDark}
                    title="Product forecasting unavailable"
                >
                    {productForecastError.message ||
                        "Unable to load product demand forecasts."}
                </Alert>

            )}

            <ForecastSummary
                forecast={
                    Array.isArray(
                        forecast
                    )
                        ? forecast
                        : []
                }
                productForecasts={
                    productForecasts
                }
            />

            <RevenueForecastChart
                forecast={
                    Array.isArray(
                        forecast
                    )
                        ? forecast
                        : []
                }
            />

            <ProductForecastGrid
                forecasts={
                    productForecasts
                }
            />

        </div>

    );

};

export default Forecasting;
