// ====================================
// INVENTORY INSIGHTS REPOSITORY
// ====================================

import InventoryInsightsService
    from "../../services/inventoryInsights/InventoryInsightsService";

const InventoryInsightsRepository = {

    // ====================================
    // GENERAL INSIGHTS
    // ====================================

    getInsights() {
        return InventoryInsightsService.getInsights();
    },

    // ====================================
    // REORDER
    // ====================================

    getReorder() {
        return InventoryInsightsService.getReorder();
    },

    // ====================================
    // STOCK MOVEMENT
    // ====================================

    getStockMovement() {
        return InventoryInsightsService.getStockMovement();
    },

    // ====================================
    // DEAD STOCK
    // ====================================

    getDeadStock() {
        return InventoryInsightsService.getDeadStock();
    },

    // ====================================
    // FAST MOVING
    // ====================================

    getFastMoving() {
        return InventoryInsightsService.getFastMoving();
    }

};

export default InventoryInsightsRepository;