import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class InventoryService {

    async getAll() {

        const response =
            await apiClient.get(
                ENDPOINTS.INVENTORY.ROOT
            );

        return response.data;

    }

    async getById(id) {

        const response =
            await apiClient.get(
                `${ENDPOINTS.INVENTORY.ROOT}/${id}`
            );

        return response.data;

    }

    async create(product) {

        const response =
            await apiClient.post(
                ENDPOINTS.INVENTORY.ROOT,
                product
            );

        return response.data;

    }

    async update(id, product) {

        const response =
            await apiClient.put(
                `${ENDPOINTS.INVENTORY.ROOT}/${id}`,
                product
            );

        return response.data;

    }

    async delete(id) {

        await apiClient.delete(
            `${ENDPOINTS.INVENTORY.ROOT}/${id}`
        );

    }

    async getLowStock() {

        const response =
            await apiClient.get(
                ENDPOINTS.INVENTORY.LOW_STOCK
            );

        return response.data;

    }

}

export default new InventoryService();