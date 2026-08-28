import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class ForecastingService {

    async forecast() {

        const response =
            await apiClient.get(
                ENDPOINTS.FORECASTING.ROOT
            );

        return response.data;

    }

}

export default new ForecastingService();