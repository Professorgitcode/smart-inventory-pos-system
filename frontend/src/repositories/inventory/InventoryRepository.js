// ====================================
// INVENTORY REPOSITORY
// ====================================
//
// Application-facing inventory boundary.
//
// Inventory currently operates against
// the Products API because the backend
// exposes products as the inventory entity.
//
// No React.
// No Axios.
// No endpoint knowledge.
// ====================================

import InventoryService
    from "../../services/inventory/InventoryService";

const InventoryRepository = {

    // ====================================
    // READ ALL
    // ====================================

    getAll() {
        return InventoryService.getAll();
    },

    // ====================================
    // READ ONE
    // ====================================

    getById(id) {
        return InventoryService.getById(id);
    },

    // ====================================
    // CREATE
    // ====================================

    create(product) {
        return InventoryService.create(product);
    },

    // ====================================
    // UPDATE
    // ====================================

    update(id, product) {
        return InventoryService.update(
            id,
            product
        );
    },

    // ====================================
    // DELETE
    // ====================================

    remove(id) {
        return InventoryService.delete(id);
    }

};

export default InventoryRepository;