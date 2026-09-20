/**
 * Formats a date for display. Accepts a Date object or an ISO string
 * (backend timestamps arrive as ISO strings by default).
 */
export const formatDate = (value, options = {}) => {
    const { style = "short" } = options;
    if (!value) return "—";

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "—";

    if (style === "long") {
        return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date);
    }
    if (style === "datetime") {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit"
        }).format(date);
    }
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "numeric", day: "numeric" }).format(date);
};

export default formatDate;
