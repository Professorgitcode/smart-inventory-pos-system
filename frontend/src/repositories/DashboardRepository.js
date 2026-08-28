import DashboardService from "../services/dashboard/DashboardService";

const DashboardRepository = {

    async fetchDashboardOverview() {
        return await DashboardService.getDashboard();
    },

    async fetchDashboardMetrics() {
        return await DashboardService.getMetrics();
    },

    async fetchRecentActivity() {
        return await DashboardService.getRecentActivity();
    }

};

export default DashboardRepository;