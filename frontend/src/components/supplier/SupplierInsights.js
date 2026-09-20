// ====================================
// SUPPLIER INSIGHTS
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
// COMPONENT
// ====================================

const SupplierInsights = ({
    suppliers = []
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    if (!suppliers.length) {

        return (

            <Alert
                variant="info"
                isDark={isDark}
                title="Supplier portfolio insights"
            >
                No supplier records are
                currently available.
            </Alert>

        );

    }

    const highRiskSuppliers =
        suppliers.filter(
            supplier =>
                supplier.riskLevel === "High"
        );

    const mediumRiskSuppliers =
        suppliers.filter(
            supplier =>
                supplier.riskLevel === "Medium"
        );

    const bestSupplier =
        suppliers.reduce(
            (
                best,
                current
            ) =>
                Number(
                    current.intelligenceScore || 0
                ) >
                Number(
                    best.intelligenceScore || 0
                )
                    ? current
                    : best
        );

    const averageScore =
        (
            suppliers.reduce(
                (
                    total,
                    supplier
                ) =>
                    total +
                    Number(
                        supplier.intelligenceScore || 0
                    ),
                0
            ) /
            suppliers.length
        ).toFixed(1);

    return (

        <Card
            variant="glass"
            isDark={isDark}
        >

            <div
                style={{
                    marginBottom: "20px"
                }}
            >

                <h3
                    style={{
                        margin: 0,
                        color:
                            theme.colors.text
                    }}
                >
                    Supplier Portfolio Insights
                </h3>

                <p
                    style={{
                        margin:
                            "6px 0 0",
                        color:
                            theme.colors.textMuted,
                        fontSize:
                            theme.typography.fontSize.sm
                    }}
                >
                    Current observations derived
                    from supplier performance data.
                </p>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px"
                }}
            >

                {/* ==================================
                    TOP SUPPLIER
                    ================================== */}

                <Card
                    variant="flat"
                    isDark={isDark}
                >

                    <div
                        style={{
                            fontSize: "12px",
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        Top Performing Supplier
                    </div>

                    <div
                        style={{
                            marginTop: "8px",
                            fontWeight:
                                theme.typography.fontWeight.bold,
                            color:
                                theme.colors.text
                        }}
                    >
                        {
                            bestSupplier
                                ?.supplierName ||
                            "N/A"
                        }
                    </div>

                    <Badge
                        variant="primary"
                        isDark={isDark}
                        style={{
                            marginTop: "12px"
                        }}
                    >
                        Score{" "}
                        {
                            bestSupplier
                                ?.intelligenceScore ?? 0
                        }
                    </Badge>

                </Card>

                {/* ==================================
                    RISK
                    ================================== */}

                <Card
                    variant="flat"
                    isDark={isDark}
                >

                    <div
                        style={{
                            fontSize: "12px",
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        Risk Exposure
                    </div>

                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap"
                        }}
                    >

                        <Badge
                            variant={
                                highRiskSuppliers.length > 0
                                    ? "danger"
                                    : "success"
                            }
                            isDark={isDark}
                        >
                            High Risk{" "}
                            {highRiskSuppliers.length}
                        </Badge>

                        <Badge
                            variant="warning"
                            isDark={isDark}
                        >
                            Medium Risk{" "}
                            {mediumRiskSuppliers.length}
                        </Badge>

                    </div>

                </Card>

                {/* ==================================
                    PORTFOLIO SCORE
                    ================================== */}

                <Card
                    variant="flat"
                    isDark={isDark}
                >

                    <div
                        style={{
                            fontSize: "12px",
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        Average Intelligence Score
                    </div>

                    <div
                        style={{
                            marginTop: "8px",
                            fontSize: "30px",
                            fontWeight:
                                theme.typography.fontWeight.extrabold,
                            color:
                                theme.colors.text
                        }}
                    >
                        {averageScore}
                    </div>

                </Card>

            </div>

        </Card>

    );
};

export default SupplierInsights;