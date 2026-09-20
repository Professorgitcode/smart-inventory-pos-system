// ====================================
// FORECAST REPOSITORY
// ====================================

import ForecastingService
    from "../../services/forecasting/ForecastingService";

const ForecastRepository = {

    // ====================================
    // GET GENERAL FORECAST
    // ====================================

    getForecast() {
        return ForecastingService.forecast();
    }

};

export default ForecastRepository;