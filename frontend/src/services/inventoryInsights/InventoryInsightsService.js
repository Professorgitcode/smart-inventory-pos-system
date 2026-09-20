import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class InventoryInsightsService {

    // ====================================
    // GET INVENTORY INSIGHTS
    // ====================================
    async getInsights() {

        const response =
            await apiClient.get(
                ENDPOINTS.INVENTORY_INSIGHTS.ROOT
            );

        return response.data;
    }

    // ====================================
    // GET REORDER RECOMMENDATIONS
    // ====================================
    async getReorder() {

        const response =
            await apiClient.get(
                ENDPOINTS.INVENTORY_INSIGHTS.REORDER
            );

        return response.data;
    }

    // ====================================
    // GET STOCK MOVEMENT
    // ====================================
    async getStockMovement() {

        const response =
            await apiClient.get(
                ENDPOINTS.INVENTORY_INSIGHTS.STOCK_MOVEMENT
            );

        return response.data;
    }

    // ====================================
    // GET DEAD STOCK
    // ====================================
    async getDeadStock() {

        const response =
            await apiClient.get(
                ENDPOINTS.INVENTORY_INSIGHTS.DEAD_STOCK
            );

        return response.data;
    }

    // ====================================
    // GET FAST-MOVING PRODUCTS
    // ====================================
    async getFastMoving() {

        const response =
            await apiClient.get(
                ENDPOINTS.INVENTORY_INSIGHTS.FAST_MOVING
            );

        return response.data;
    }
}

const inventoryInsightsService =
    new InventoryInsightsService();

export default inventoryInsightsService;