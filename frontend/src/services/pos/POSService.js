import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class POSService {

    // ====================================
    // CREATE SALE / ORDER
    // ====================================
    async createSale(data) {

        const response =
            await apiClient.post(
                ENDPOINTS.ORDERS.ROOT,
                data
            );

        return response.data;
    }
}

const posService = new POSService();

export default posService;