/**
 * Calculates percentage change between a current and previous value,
 * plus the direction, for dashboard/report trend badges (e.g. "+12.4%").
 */
export const calculateTrend = (current, previous) => {
    const currentValue = Number(current) || 0;
    const previousValue = Number(previous) || 0;

    if (previousValue === 0) {
        if (currentValue === 0) {
            return { percentage: 0, direction: "flat", isPositive: true, formatted: "0.0%" };
        }
        return { percentage: 100, direction: "up", isPositive: true, formatted: "+100.0%" };
    }

    const rawPercentage = ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
    const percentage = Math.round(rawPercentage * 10) / 10;
    const direction = percentage > 0 ? "up" : percentage < 0 ? "down" : "flat";
    const sign = percentage > 0 ? "+" : "";

    return {
        percentage,
        direction,
        isPositive: percentage >= 0,
        formatted: `${sign}${percentage.toFixed(1)}%`
    };
};

export default calculateTrend;
