import ReportsService from "../services/reports/ReportsService";

const ReportsRepository = {

    async fetchSalesReport(filters) {
        return await ReportsService.getSalesReport(filters);
    },

    async exportPdf(filters) {
        return await ReportsService.exportPdf(filters);
    },

    async exportCsv(filters) {
        return await ReportsService.exportCsv(filters);
    },

    async exportExcel(filters) {
        return await ReportsService.exportExcel(filters);
    }

};

export default ReportsRepository;