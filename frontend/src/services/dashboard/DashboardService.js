import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class DashboardService {

    // ====================================
    // GET COMPLETE DASHBOARD
    // ====================================
    async getDashboard() {

        const response =
            await apiClient.get(
                ENDPOINTS.DASHBOARD.ROOT
            );

        return response.data;
    }
}

const dashboardService = new DashboardService();

export default dashboardService;