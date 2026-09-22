import React from "react";

import {
    CalendarRange,
    RefreshCw
} from "lucide-react";

import {
    Button,
    PageHeader
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// REPORTS HEADER
// ====================================

const ReportsHeader = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onRefresh,
    loading
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    return (

        <PageHeader

            title="Sales Analytics"

            subtitle={
                "Monitor sales performance, revenue trends and recent transactions."
            }

            actions={

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing.sm,
                        flexWrap: "wrap",
                        justifyContent: "flex-end"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.xs,
                            padding:
                                `${theme.spacing.xs} ${theme.spacing.sm}`,
                            border:
                                `1px solid ${theme.colors.border}`,
                            borderRadius:
                                theme.radius.md,
                            backgroundColor:
                                theme.colors.surfaceGlass
                        }}
                    >

                        <CalendarRange
                            size={16}
                            color={
                                theme.colors.primary
                            }
                        />

                        <input
                            type="date"
                            value={
                                startDate
                            }
                            onChange={
                                onStartDateChange
                            }
                            aria-label="Report start date"
                            style={{
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                color:
                                    theme.colors.text,
                                fontSize:
                                    theme.typography
                                        .fontSize.xs
                            }}
                        />

                        <span
                            style={{
                                color:
                                    theme.colors.textMuted
                            }}
                        >
                            to
                        </span>

                        <input
                            type="date"
                            value={
                                endDate
                            }
                            onChange={
                                onEndDateChange
                            }
                            aria-label="Report end date"
                            style={{
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                color:
                                    theme.colors.text,
                                fontSize:
                                    theme.typography
                                        .fontSize.xs
                            }}
                        />

                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        isDark={isDark}
                        icon={RefreshCw}
                        isLoading={loading}
                        disabled={loading}
                        onClick={onRefresh}
                    >
                        Refresh
                    </Button>

                </div>

            }

        />

    );

};

export default ReportsHeader;
