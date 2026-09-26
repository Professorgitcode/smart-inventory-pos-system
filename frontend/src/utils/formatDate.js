/**
 * Formats a date for display. Accepts a Date object or an ISO string
 * (backend timestamps arrive as ISO strings by default).
 */
export const formatDate = (value, options = {}) => {
    const { style = "short" } = options;
    if (!value) return "—";

    // Backend persistence uses UTC. Some SQLite round-trips can
    // return a timestamp without an explicit offset, so interpret
    // offset-less ISO timestamps as UTC rather than browser-local time.
    let normalizedValue = value;

    if (typeof value === "string") {
        const trimmed = value.trim();
        const hasOffset = /(?:Z|[+-]\d{2}:\d{2})$/i.test(trimmed);
        const looksLikeDateTime = /T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(trimmed);

        if (looksLikeDateTime && !hasOffset) {
            normalizedValue = trimmed + "Z";
        }
    }

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
