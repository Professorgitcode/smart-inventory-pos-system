import React, {
    useMemo
} from "react";

import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
    Package
} from "lucide-react";

import {
    Card
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// SUMMARY CARD
// ====================================

const SummaryCard = ({
    icon: Icon,
    label,
    value,
    description
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="md"
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: theme.spacing.md
                }}
            >

                <div>

                    <div
                        style={{
                            fontSize:
                                theme.typography.fontSize.xs,
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        {label}
                    </div>

                    <div
                        style={{
                            marginTop: "4px",
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

                    <div
                        style={{
                            marginTop: "4px",
                            fontSize:
                                theme.typography.fontSize.xs,
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        {description}
                    </div>

                </div>

                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: theme.radius.md,
                        backgroundColor:
                            isDark
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(52,114,156,0.08)",
                        color:
                            theme.colors.primary
                    }}
                >

                    <Icon size={19} />

                </div>

            </div>

        </Card>

    );

};

// ====================================
// COMPONENT
// ====================================

const InsightsSummary = ({
    insights = []
}) => {

    const {
        theme
    } = useTheme();

    const summary = useMemo(
        () => {

            const items =
                Array.isArray(
                    insights
                )
                    ? insights
                    : [];

            const critical =
                items.filter(
                    item =>
                        item.urgency ===
                        "CRITICAL"
                ).length;

            const low =
                items.filter(
                    item =>
                        item.urgency ===
                        "LOW"
                ).length;

            const stable =
                items.filter(
                    item =>
                        item.urgency ===
                        "STABLE"
                ).length;

            const averageDays =
                items.length > 0
                    ? (
                        items.reduce(
                            (
                                total,
                                item
                            ) =>
                                total +
                                Number(
                                    item.estimatedDaysRemaining
                                ),
                            0
                        ) /
                        items.length
                    ).toFixed(1)
                    : "0";

            return {
                critical,
                low,
                stable,
                averageDays
            };

        },
        [
            insights
        ]
    );

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(4, minmax(0, 1fr))",
                gap: theme.spacing.lg
            }}
        >

            <SummaryCard
                icon={AlertTriangle}
                label="Critical products"
                value={summary.critical}
                description={
                    "Products requiring immediate attention"
                }
            />

            <SummaryCard
                icon={Clock3}
                label="Low-stock products"
                value={summary.low}
                description={
                    "Products approaching low inventory"
                }
            />

            <SummaryCard
                icon={CheckCircle2}
                label="Stable products"
                value={summary.stable}
                description={
                    "Products currently outside warning thresholds"
                }
            />

            <SummaryCard
                icon={Package}
                label="Average inventory days"
                value={summary.averageDays}
                description={
                    "Estimated remaining stock coverage"
                }
            />

        </div>

    );

};

export default InsightsSummary;
