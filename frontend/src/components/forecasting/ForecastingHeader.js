import React from "react";

import {
    BrainCircuit,
    RefreshCw
} from "lucide-react";

import {
    Button,
    Card,
    PageHeader
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// FORECASTING HEADER
// ====================================
// Composition-only header.
//
// Responsibilities:
// - Forecasting page title
// - Description
// - Refresh action
//
// No API communication.
// ====================================

const ForecastingHeader = ({
    onRefresh,
    loading = false
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="lg"
        >

            <PageHeader

                title="Forecasting"

                subtitle={
                    "Analyse revenue predictions and product demand using the current forecasting service."
                }

                actions={

                    <Button
                        variant="outline"
                        size="md"
                        isDark={isDark}
                        icon={RefreshCw}
                        disabled={loading}
                        onClick={onRefresh}
                    >
                        {loading
                            ? "Refreshing..."
                            : "Refresh"
                        }
                    </Button>

                }

            />

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.xs,
                    marginTop: theme.spacing.xs,
                    color: theme.colors.textMuted
                }}
            >

                <BrainCircuit
                    size={17}
                    color={theme.colors.primary}
                />

                <span
                    style={{
                        fontSize:
                            theme.typography.fontSize.xs
                    }}
                >
                    Revenue analysis and product
                    demand forecasting
                </span>

            </div>

        </Card>

    );

};

export default ForecastingHeader;
