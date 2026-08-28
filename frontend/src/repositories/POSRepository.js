import POSService from "../services/pos/POSService";

const POSRepository = {

    async fetchProducts() {
        return await POSService.getProducts();
    },

    async checkout(order) {
        return await POSService.checkout(order);
    },

    async fetchReceipt(id) {
        return await POSService.getReceipt(id);
    }

};

export default POSRepository;