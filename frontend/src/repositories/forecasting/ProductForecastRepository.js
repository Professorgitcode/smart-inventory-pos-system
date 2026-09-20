// ====================================
// PRODUCT FORECAST REPOSITORY
// ====================================

import ProductForecastService
    from "../../services/forecasting/ProductForecastService";

const ProductForecastRepository = {

    // ====================================
    // GET PRODUCT FORECAST
    // ====================================

    getProductForecast() {
        return ProductForecastService.getProductForecast();
    }

};

export default ProductForecastRepository;