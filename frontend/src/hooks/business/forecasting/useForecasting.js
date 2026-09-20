// ====================================
// FORECASTING BUSINESS HOOK
// ====================================
//
// Current backend responsibility:
//
// GET /api/forecast
//
// Accuracy and model metadata are not
// currently exposed by the backend, so
// they are not represented here.
// ====================================

import {
    useCallback
} from "react";

import {
    useQuery
} from "../../../query";

import ForecastRepository
    from "../../../repositories/forecasting/ForecastRepository";

const FORECAST_KEY = [
    "forecasting",
    "forecast"
];

const useForecasting = () => {

    // ====================================
    // FORECAST QUERY
    // ====================================

    const forecastQuery =
        useQuery(
            FORECAST_KEY,
            () =>
                ForecastRepository.getForecast(),
            {
                staleTime:
                    10 * 60 * 1000
            }
        );

    // ====================================
    // REFRESH
    // ====================================

    const refresh =
        useCallback(
            () =>
                forecastQuery.refetch(),
            [
                forecastQuery.refetch
            ]
        );

    // ====================================
    // RETURN
    // ====================================

    return {

        data:
            forecastQuery.data,

        forecast:
            forecastQuery.data,

        loading:
            forecastQuery.loading,

        error:
            forecastQuery.error,

        actions: {

            refresh

        }

    };
};

export default useForecasting;