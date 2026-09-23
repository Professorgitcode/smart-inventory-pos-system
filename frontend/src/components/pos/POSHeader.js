import React from "react";

import {
    ShoppingCart
} from "lucide-react";

import {
    PageHeader
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// POS HEADER
// ====================================

const POSHeader = ({
    cartItemCount = 0
}) => {

    const {
        isDark
    } = useTheme();

    return (

        <PageHeader

            title="Point of Sale"

            subtitle="Process sales, manage the active cart and complete customer transactions."

            actions={

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "999px",
                        border:
                            "1px solid " +
                            (
                                isDark
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(52,114,156,0.12)"
                            ),
                        backgroundColor:
                            isDark
                                ? "rgba(255,255,255,0.04)"
                                : "rgba(255,255,255,0.55)",
                        color:
                            isDark
                                ? "rgba(255,255,255,0.82)"
                                : "rgba(15,23,42,0.72)",
                        fontSize: "13px",
                        fontWeight: 600
                    }}
                >

                    <ShoppingCart size={16} />

                    <span>
                        {cartItemCount} cart
                        {cartItemCount === 1
                            ? " item"
                            : " items"}
                    </span>

                </div>

            }

        />

    );

};

export default POSHeader;
