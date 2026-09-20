import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class ReportsService {

    // ====================================
    // GET REPORT
    // ====================================

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

    // ====================================
    // EXPORT PDF
    // ====================================

    async exportPDF(params = {}) {

        return apiClient.get(
            ENDPOINTS.REPORTS.EXPORT_PDF,
            {
                params,
                responseType: "blob"
            }
        );
    }

    // ====================================
    // EXPORT CSV
    // ====================================

    async exportCSV(params = {}) {

        return apiClient.get(
            ENDPOINTS.REPORTS.EXPORT_CSV,
            {
                params,
                responseType: "blob"
            }
        );
    }

    // ====================================
    // EXPORT EXCEL
    // ====================================

    async exportExcel(params = {}) {

        return apiClient.get(
            ENDPOINTS.REPORTS.EXPORT_EXCEL,
            {
                params,
                responseType: "blob"
            }
        );
    }

    // ====================================
    // EXPORT DOCX
    // ====================================

    async exportDocx(params = {}) {

        return apiClient.get(
            ENDPOINTS.REPORTS.EXPORT_DOCX,
            {
                params,
                responseType: "blob"
            }
        );
    }
}

const reportsService =
    new ReportsService();

export default reportsService;