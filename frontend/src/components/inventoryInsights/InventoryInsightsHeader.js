import React from "react";

import {
    Activity,
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
// INVENTORY INSIGHTS HEADER
// ====================================
// Composition-only feature header.
//
// Responsibilities:
// - Page title
// - Description
// - Refresh action
//
// No API communication.
// ====================================

const InventoryInsightsHeader = ({
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

                title="Inventory Intelligence"

                subtitle={
                    "Monitor stock health, movement, dead stock and replenishment requirements."
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

                <Activity
                    size={17}
                    color={theme.colors.primary}
                />

                <span
                    style={{
                        fontSize:
                            theme.typography.fontSize.xs
                    }}
                >
                    Inventory analytics derived from current
                    stock and transaction history
                </span>

            </div>

        </Card>

    );

};

export default InventoryInsightsHeader;
