import { useState, useEffect, useCallback } from "react";

import {
    DashboardRepository
} from "../../repositories";

export default function useDashboard() {

    const [overview, setOverview] = useState(null);

    const [metrics, setMetrics] = useState(null);

    const [recentActivity, setRecentActivity] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const overviewData =
                await DashboardRepository.fetchDashboardOverview();

            const metricsData =
                await DashboardRepository.fetchDashboardMetrics();

            const activityData =
                await DashboardRepository.fetchRecentActivity();

            setOverview(overviewData);

            setMetrics(metricsData);

            setRecentActivity(activityData);

        }

        catch (err) {

            console.error(err);

            setError(err);

        }

        finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);

    return {

    data: {

        overview,

        metrics,

        recentActivity

    },

    loading,

    error,

    actions: {

        refresh

    }

};

}