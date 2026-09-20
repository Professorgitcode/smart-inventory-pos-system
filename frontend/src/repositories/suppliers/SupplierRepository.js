// ====================================
// SUPPLIER REPOSITORY
// ====================================
//
// Application-facing supplier data boundary.
//
// No React.
// No Axios.
// No endpoint knowledge.
// ====================================

import SupplierService
    from "../../services/suppliers/SupplierService";

const SupplierRepository = {

    // ====================================
    // READ
    // ====================================

    getAll() {
        return SupplierService.getSuppliers();
    },

    getAnalytics() {
        return SupplierService.getAnalytics();
    },

    // ====================================
    // CREATE
    // ====================================

    create(data) {
        return SupplierService.createSupplier(
            data
        );
    },

    // ====================================
    // UPDATE
    // ====================================

    update(id, data) {
        return SupplierService.updateSupplier(
            id,
            data
        );
    },

    // ====================================
    // DELETE
    // ====================================

    remove(id) {
        return SupplierService.deleteSupplier(
            id
        );
    }

};

export default SupplierRepository;