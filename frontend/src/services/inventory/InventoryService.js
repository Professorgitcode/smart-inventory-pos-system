import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class InventoryService {

    // ====================================
    // GET ALL PRODUCTS
    // ====================================
    async getAll() {

        const response =
            await apiClient.get(
                ENDPOINTS.PRODUCTS.ROOT
            );

        return response.data;
    }

    // ====================================
    // GET PRODUCT BY ID
    // ====================================
    async getById(id) {

        const response =
            await apiClient.get(
                ENDPOINTS.PRODUCTS.BY_ID(id)
            );

        return response.data;
    }

    // ====================================
    // CREATE PRODUCT
    // ====================================
    async create(product) {

        const response =
            await apiClient.post(
                ENDPOINTS.PRODUCTS.ROOT,
                product
            );

        return response.data;
    }

    // ====================================
    // UPDATE PRODUCT
    // ====================================
    async update(id, product) {

        const response =
            await apiClient.put(
                ENDPOINTS.PRODUCTS.BY_ID(id),
                product
            );

        return response.data;
    }

    // ====================================
    // DELETE PRODUCT
    // ====================================
    async delete(id) {

        await apiClient.delete(
            ENDPOINTS.PRODUCTS.BY_ID(id)
        );

        return true;
    }
}

const inventoryService = new InventoryService();

export default inventoryService;