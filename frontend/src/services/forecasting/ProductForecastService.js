import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class ProductForecastService {

    // ====================================
    // GET PRODUCT FORECAST
    // ====================================
    async getProductForecast() {

        const response =
            await apiClient.get(
                ENDPOINTS.PRODUCT_FORECAST.ROOT
            );

        return response.data;
    }
}

const productForecastService =
    new ProductForecastService();

export default productForecastService;