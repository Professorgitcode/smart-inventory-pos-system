/**
 * Formats a date for display. Accepts a Date object or an ISO string
 * (backend timestamps arrive as ISO strings by default).
 */
export const formatDate = (value, options = {}) => {
    const { style = "short" } = options;
    if (!value) return "—";

    // Backend order timestamps currently use the server's
    // business-local timezone. Preserve explicit ISO offsets when
    // provided and let the browser format the resulting instant.
    const normalizedValue = value;

    const date = normalizedValue instanceof Date
        ? normalizedValue
        : new Date(normalizedValue);
    if (Number.isNaN(date.getTime())) return "—";

    if (style === "long") {
        return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date);
    }
    if (style === "datetime") {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit"
        }).format(date);
    }
    if (style === "time") {
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric", minute: "2-digit"
        }).format(date);
    }
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "numeric", day: "numeric" }).format(date);
};

export default formatDate;
