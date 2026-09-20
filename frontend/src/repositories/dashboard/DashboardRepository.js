// ====================================
// DASHBOARD REPOSITORY
// ====================================
//
// Application-facing dashboard boundary.
//
// No React.
// No Axios.
// No endpoint knowledge.
// ====================================

import DashboardService
    from "../../services/dashboard/DashboardService";

const DashboardRepository = {

    // ====================================
    // GET DASHBOARD
    // ====================================

    getDashboard() {
        return DashboardService.getDashboard();
    }

};

export default DashboardRepository;