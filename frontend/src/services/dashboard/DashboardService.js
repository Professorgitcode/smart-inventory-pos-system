import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class DashboardService {

  async getDashboard() {
    const response =
      await apiClient.get(
        ENDPOINTS.DASHBOARD.ROOT
      );

    return response.data;
  }

  async getStatistics() {
    const response =
      await apiClient.get(
        ENDPOINTS.DASHBOARD.STATS
      );

    return response.data;
  }

  async getRecentOrders() {
    const response =
      await apiClient.get(
        ENDPOINTS.DASHBOARD.RECENT_ORDERS
      );

    return response.data;
  }

  async getForecast() {
    const response =
      await apiClient.get(
        ENDPOINTS.DASHBOARD.FORECAST
      );

    return response.data;
  }

}

export default new DashboardService();