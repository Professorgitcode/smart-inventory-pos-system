import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class POSService {

    async createSale(data) {

        const response =
            await apiClient.post(
                ENDPOINTS.POS.ROOT,
                data
            );

        return response.data;

    }

    async getSales() {

        const response =
            await apiClient.get(
                ENDPOINTS.POS.SALES
            );

        return response.data;

    }

}

export default new POSService();