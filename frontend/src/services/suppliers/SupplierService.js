// ====================================
// SUPPLIER SERVICE
// ====================================
//
// HTTP/API communication for suppliers.
//
// This layer knows:
// - apiClient
// - endpoint definitions
// - HTTP operations
// - backend ApiResponse<T>
//
// It does not know about React or UI.
// ====================================

import apiClient
    from "../../api/apiClient";

import ENDPOINTS
    from "../../api/endpoints";

// ====================================
// SERVICE
// ====================================

class SupplierService {

    // ====================================
    // RESPONSE HANDLER
    // ====================================

    unwrapResponse(response) {

        const payload = response.data;

        if (payload?.success === false) {

            throw new Error(
                payload.message ||
                "Supplier operation failed."
            );

        }

        return payload?.data;
    }

    // ====================================
    // GET SUPPLIERS
    // ====================================

    async getSuppliers() {

        const response =
            await apiClient.get(
                ENDPOINTS.SUPPLIERS.ROOT
            );

        return this.unwrapResponse(
            response
        );
    }

    // ====================================
    // GET ANALYTICS
    // ====================================

    async getAnalytics() {

        const response =
            await apiClient.get(
                ENDPOINTS.SUPPLIERS.ANALYTICS
            );

        return this.unwrapResponse(
            response
        );
    }

    // ====================================
    // CREATE
    // ====================================

    async createSupplier(
        supplier
    ) {

        const response =
            await apiClient.post(
                ENDPOINTS.SUPPLIERS.ROOT,
                supplier
            );

        return this.unwrapResponse(
            response
        );
    }

    // ====================================
    // UPDATE
    // ====================================

    async updateSupplier(
        id,
        supplier
    ) {

        const response =
            await apiClient.put(
                `${ENDPOINTS.SUPPLIERS.ROOT}/${id}`,
                supplier
            );

        return this.unwrapResponse(
            response
        );
    }

    // ====================================
    // DELETE
    // ====================================

    async deleteSupplier(id) {

        const response =
            await apiClient.delete(
                `${ENDPOINTS.SUPPLIERS.ROOT}/${id}`
            );

        this.unwrapResponse(
            response
        );

        return true;
    }

}

// ====================================
// SERVICE INSTANCE
// ====================================

const supplierService =
    new SupplierService();

export default supplierService;