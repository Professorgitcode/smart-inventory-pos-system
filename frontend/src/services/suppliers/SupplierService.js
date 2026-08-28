import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class SupplierService {

    async getSuppliers() {
    const response =
        await apiClient.get(
            ENDPOINTS.SUPPLIERS.ROOT
        );

    return response.data.data;
}

    async getAnalytics() {
    const response =
        await apiClient.get(
            ENDPOINTS.SUPPLIERS.ANALYTICS
        );

    return response.data.data;
}

    async createSupplier(supplier) {

        const response =
            await apiClient.post(
                ENDPOINTS.SUPPLIERS.ROOT,
                supplier
            );

        return response.data.data;
    }

    async updateSupplier(id, supplier) {

        const response =
            await apiClient.put(
                `${ENDPOINTS.SUPPLIERS.ROOT}/${id}`,
                supplier
            );

        return response.data.data;
    }

    async deleteSupplier(id) {

        await apiClient.delete(
            `${ENDPOINTS.SUPPLIERS.ROOT}/${id}`
        );
    }

}

export default new SupplierService();