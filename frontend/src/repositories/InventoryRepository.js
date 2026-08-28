import InventoryService from "../services/inventory/InventoryService";

const InventoryRepository = {

    async fetchInventory() {
        return await InventoryService.getInventory();
    },

    async fetchInventoryItem(id) {
        return await InventoryService.getItem(id);
    },

    async saveInventoryItem(item) {
        return await InventoryService.createItem(item);
    },

    async updateInventoryItem(id, item) {
        return await InventoryService.updateItem(id, item);
    },

    async deleteInventoryItem(id) {
        return await InventoryService.deleteItem(id);
    },

    async fetchLowStockItems() {
        return await InventoryService.getLowStock();
    },

    async fetchInventoryForecast() {
        return await InventoryService.getForecast();
    }

};

export default InventoryRepository;