// ====================================
// PRODUCT FORECAST BUSINESS HOOK
// ====================================

import {
    useQuery
} from "../../../query";

import ProductForecastRepository
    from "../../../repositories/forecasting/ProductForecastRepository";

const PRODUCT_FORECAST_KEY = [
    "forecasting",
    "products"
];

const useProductForecast = () => {

    // ====================================
    // PRODUCT FORECAST QUERY
    // ====================================

    const forecastQuery =
        useQuery(
            PRODUCT_FORECAST_KEY,
            () =>
                ProductForecastRepository.getProductForecast(),
            {
                staleTime:
                    10 * 60 * 1000
            }
        );

    // ====================================
    // REFRESH
    // ====================================

    const refresh =
                forecastQuery.refetch;

    // ====================================
    // RETURN
    // ====================================

    return {

        data:
            forecastQuery.data || [],

        loading:
            forecastQuery.loading,

        error:
            forecastQuery.error,

        actions: {

            refresh

        }

    };
};

export default useProductForecast;