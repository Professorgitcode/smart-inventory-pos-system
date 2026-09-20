// ====================================
// SUPPLIER KPIs
// ====================================

import React, {
    useMemo
} from "react";

import {
    Truck,
    Star,
    Clock3,
    CheckCircle,
    PackageCheck,
    AlertTriangle
} from "lucide-react";

import {
    Card,
    SkeletonLoader
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// KPI CARD
// ====================================

const KPICard = ({
    title,
    value,
    icon: Icon,
    iconColor,
    isDark
}) => {

    const { theme } = useTheme();

    return (

        <Card
            variant="standard"
            padding="lg"
            isDark={isDark}
            style={{
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}
        >

            <Icon
                size={24}
                color={
                    iconColor ||
                    theme.colors.primary
                }
            />

            <div
                style={{
                    fontSize:
                        theme.typography.fontSize.sm,
                    color:
                        theme.colors.textMuted
                }}
            >
                {title}
            </div>

            <div
                style={{
                    fontSize:
                        theme.typography.fontSize.xl,
                    fontWeight:
                        theme.typography.fontWeight.bold,
                    color:
                        theme.colors.text
                }}
            >
                {value}
            </div>

        </Card>

    );
};

// ====================================
// COMPONENT
// ====================================

const SupplierKPIs = ({
    analytics,
    suppliers = []
}) => {

    const {
        isDark
    } = useTheme();

    const supplierOrders =
        useMemo(
            () =>
                suppliers.reduce(
                    (
                        total,
                        supplier
                    ) =>
                        total +
                        Number(
                            supplier.totalOrders ||
                            0
                        ),
                    0
                ),
            [suppliers]
        );

    const highRiskSuppliers =
        useMemo(
            () =>
                suppliers.filter(
                    supplier =>
                        supplier.riskLevel ===
                        "High"
                ).length,
            [suppliers]
        );

    if (!analytics) {

        return (

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "16px"
                }}
            >

                {Array.from(
                    { length: 6 }
                ).map(
                    (_, index) => (

                        <Card
                            key={index}
                            isDark={isDark}
                        >

                            <SkeletonLoader
                                variant="circle"
                                width="32px"
                                height="32px"
                                isDark={isDark}
                            />

                            <div
                                style={{
                                    marginTop:
                                        "16px"
                                }}
                            >
                                <SkeletonLoader
                                    width="90px"
                                    height="12px"
                                    isDark={isDark}
                                />
                            </div>

                            <div
                                style={{
                                    marginTop:
                                        "12px"
                                }}
                            >
                                <SkeletonLoader
                                    width="120px"
                                    height="24px"
                                    isDark={isDark}
                                />
                            </div>

                        </Card>

                    )
                )}

            </div>

        );
    }

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px"
            }}
        >

            <KPICard
                title="Active Suppliers"
                value={
                    analytics.activeSuppliers
                }
                icon={Truck}
                isDark={isDark}
            />

            <KPICard
                title="Average Rating"
                value={
                    `${Number(
                        analytics.averageRating || 0
                    ).toFixed(1)} / 5`
                }
                icon={Star}
                isDark={isDark}
            />

            <KPICard
                title="Average Lead Time"
                value={
                    `${Number(
                        analytics.averageLeadTime || 0
                    ).toFixed(0)} Days`
                }
                icon={Clock3}
                isDark={isDark}
            />

            <KPICard
                title="On-Time Delivery"
                value={
                    `${Number(
                        analytics.averageDelivery || 0
                    ).toFixed(0)}%`
                }
                icon={CheckCircle}
                isDark={isDark}
            />

            <KPICard
                title="Supplier Orders"
                value={supplierOrders}
                icon={PackageCheck}
                isDark={isDark}
            />

            <KPICard
                title="High Risk Suppliers"
                value={highRiskSuppliers}
                icon={AlertTriangle}
                iconColor={
                    highRiskSuppliers > 0
                        ? undefined
                        : undefined
                }
                isDark={isDark}
            />

        </div>

    );
};

export default SupplierKPIs;