// ====================================
// REPORTS REPOSITORY
// ====================================
//
// Application-facing reporting boundary.
//
// No React.
// No Axios.
// No endpoint knowledge.
// ====================================

import ReportsService
    from "../../services/reports/ReportsService";

const ReportsRepository = {

    // ====================================
    // GET REPORT
    // ====================================

    getReport(params = {}) {
        return ReportsService.getReport(params);
    },

    // ====================================
    // EXPORT PDF
    // ====================================

    exportPDF(params = {}) {
        return ReportsService.exportPDF(params);
    },

    // ====================================
    // EXPORT CSV
    // ====================================

    exportCSV(params = {}) {
        return ReportsService.exportCSV(params);
    },

    // ====================================
    // EXPORT EXCEL
    // ====================================

    exportExcel(params = {}) {
        return ReportsService.exportExcel(params);
    },

    // ====================================
    // EXPORT DOCX
    // ====================================

    exportDocx(params = {}) {
        return ReportsService.exportDocx(params);
    }

};

export default ReportsRepository;