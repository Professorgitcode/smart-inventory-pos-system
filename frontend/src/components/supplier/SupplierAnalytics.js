// ====================================
// SUPPLIER ANALYTICS
// ====================================

import React from "react";

import {
    Card,
    Badge,
    Alert
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// HELPERS
// ====================================

const clamp = (
    value,
    min = 0,
    max = 100
) =>
    Math.min(
        max,
        Math.max(
            min,
            Number(value) || 0
        )
    );

// ====================================
// PERFORMANCE BAR
// ====================================

const PerformanceBar = ({
    label,
    value,
    displayValue,
    isDark
}) => {

    const {
        theme
    } = useTheme();

    const percentage =
        clamp(value);

    return (

        <div
            style={{
                marginBottom: "22px"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontSize:
                        theme.typography.fontSize.sm
                }}
            >

                <span
                    style={{
                        color:
                            theme.colors.text
                    }}
                >
                    {label}
                </span>

                <strong
                    style={{
                        color:
                            theme.colors.text
                    }}
                >
                    {displayValue}
                </strong>

            </div>

            <div
                style={{
                    width: "100%",
                    height: "8px",
                    borderRadius:
                        theme.radius.full,
                    backgroundColor:
                        isDark
                            ? "rgba(255,255,255,0.08)"
                            : theme.colors.border,
                    overflow: "hidden"
                }}
            >

                <div
                    style={{
                        width:
                            `${percentage}%`,
                        height: "100%",
                        borderRadius:
                            theme.radius.full,
                        backgroundColor:
                            theme.colors.primary,
                        transition:
                            "width 300ms ease"
                    }}
                />

            </div>

        </div>

    );
};

// ====================================
// COMPONENT
// ====================================

const SupplierAnalytics = ({
    analytics
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    if (!analytics) {

        return (

            <Alert
                variant="info"
                isDark={isDark}
                title="Supplier analytics"
            >
                Supplier analytics are
                loading.
            </Alert>

        );

    }

    const averageRating =
        clamp(
            (
                Number(
                    analytics.averageRating
                ) / 5
            ) * 100
        );

    const delivery =
        clamp(
            analytics.averageDelivery
        );

    // ====================================
    // NORMALIZED HEALTH SCORE
    // ====================================

    const healthScore =
        Math.round(
            (
                averageRating +
                delivery
            ) / 2
        );

    const healthVariant =
        healthScore >= 80
            ? "success"
            : healthScore >= 60
                ? "warning"
                : "danger";

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "2fr 1fr",
                gap: "24px"
            }}
        >

            {/* ==================================
                CURRENT PERFORMANCE
                ================================== */}

            <Card
                variant="standard"
                isDark={isDark}
            >

                <h3
                    style={{
                        marginTop: 0,
                        marginBottom: "24px",
                        color:
                            theme.colors.text
                    }}
                >
                    Current Supplier Performance
                </h3>

                <PerformanceBar
                    label="Average Rating"
                    value={averageRating}
                    displayValue={
                        `${Number(
                            analytics.averageRating || 0
                        ).toFixed(1)} / 5`
                    }
                    isDark={isDark}
                />

                <PerformanceBar
                    label="On-Time Delivery"
                    value={delivery}
                    displayValue={
                        `${Number(
                            analytics.averageDelivery || 0
                        ).toFixed(0)}%`
                    }
                    isDark={isDark}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(2, 1fr)",
                        gap: "16px"
                    }}
                >

                    <div>
                        <div
                            style={{
                                fontSize: "12px",
                                color:
                                    theme.colors.textMuted
                            }}
                        >
                            Average Lead Time
                        </div>

                        <strong>
                            {
                                Number(
                                    analytics.averageLeadTime || 0
                                ).toFixed(0)
                            } Days
                        </strong>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: "12px",
                                color:
                                    theme.colors.textMuted
                            }}
                        >
                            Active Suppliers
                        </div>

                        <strong>
                            {
                                analytics.activeSuppliers || 0
                            }
                        </strong>
                    </div>

                </div>

            </Card>

            {/* ==================================
                HEALTH SCORE
                ================================== */}

            <Card
                variant="glass"
                isDark={isDark}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}
            >

                <div
                    style={{
                        fontSize:
                            theme.typography.fontSize.md,
                        fontWeight:
                            theme.typography.fontWeight.semibold,
                        color:
                            theme.colors.text
                    }}
                >
                    Supplier Health Score
                </div>

                <div
                    style={{
                        marginTop: "24px",
                        fontSize: "56px",
                        lineHeight: 1,
                        fontWeight:
                            theme.typography.fontWeight.extrabold,
                        color:
                            theme.colors.primary
                    }}
                >
                    {healthScore}%
                </div>

                <Badge
                    variant={healthVariant}
                    isDark={isDark}
                    style={{
                        marginTop: "16px"
                    }}
                >
                    {
                        healthVariant === "success"
                            ? "Healthy"
                            : healthVariant === "warning"
                                ? "Needs Monitoring"
                                : "High Attention"
                    }
                </Badge>

            </Card>

        </div>

    );

};

export default SupplierAnalytics;