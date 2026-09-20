// ====================================
// POS REPOSITORY
// ====================================
//
// Application-facing POS boundary.
//
// Product catalogue is obtained through
// InventoryService because products are
// owned by the inventory/product domain.
//
// Checkout is handled by POSService.
//
// No React.
// No Axios.
// No endpoint knowledge.
// ====================================

import InventoryService
    from "../../services/inventory/InventoryService";

import POSService
    from "../../services/pos/POSService";

const POSRepository = {

    // ====================================
    // GET PRODUCTS FOR POS
    // ====================================

    getProducts() {
        return InventoryService.getAll();
    },

    // ====================================
    // CHECKOUT
    // ====================================

    checkout(order) {
        return POSService.createSale(order);
    }

};

export default POSRepository;