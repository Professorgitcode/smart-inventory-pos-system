import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class ReportsService {

    async getReport(params = {}) {

        const response =
            await apiClient.get(
                ENDPOINTS.REPORTS.ROOT,
                {
                    params
                }
            );

        return response.data;

    }

    async exportPDF() {

        return apiClient.get(
            ENDPOINTS.REPORTS.EXPORT_PDF,
            {
                responseType: "blob"
            }
        );

    }

    async exportCSV() {

        return apiClient.get(
            ENDPOINTS.REPORTS.EXPORT_CSV,
            {
                responseType: "blob"
            }
        );

    }

    async exportExcel() {

        return apiClient.get(
            ENDPOINTS.REPORTS.EXPORT_EXCEL,
            {
                responseType: "blob"
            }
        );

    }

}

export default new ReportsService();