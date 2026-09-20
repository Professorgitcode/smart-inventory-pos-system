import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class ForecastingService {

    // ====================================
    // GET GENERAL FORECAST
    // ====================================
    async forecast() {

        const response =
            await apiClient.get(
                ENDPOINTS.FORECAST.ROOT
            );

        return response.data;
    }
}

const forecastingService = new ForecastingService();

export default forecastingService;