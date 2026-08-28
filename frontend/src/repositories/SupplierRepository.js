import SupplierService from "../services/suppliers/SupplierService";

const SupplierRepository = {

    async getAll() {
        return await SupplierService.getSuppliers();
    },

    async getAnalytics() {
        return await SupplierService.getAnalytics();
    },

    async create(data) {
        return await SupplierService.createSupplier(data);
    },

    async update(id, data) {
        return await SupplierService.updateSupplier(id, data);
    },

    async remove(id) {
        return await SupplierService.deleteSupplier(id);
    }

};

export default SupplierRepository;