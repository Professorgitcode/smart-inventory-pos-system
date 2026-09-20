/**
 * Formats a numeric or numeric-string value as currency.
 * Backend Price fields sometimes arrive as strings — this handles both.
 */
export const formatCurrency = (value, options = {}) => {
    const { currency = "USD", locale = "en-US" } = options;
    const numericValue = Number(value);

    if (value === null || value === undefined || Number.isNaN(numericValue)) {
        return "—";
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericValue);
};

export default formatCurrency;
