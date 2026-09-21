import React from "react";

import {
    Package,
    Plus
} from "lucide-react";

import {
    Button,
    Card,
    PageHeader
} from "../ui";

import {
    RoleGuard
} from "../../auth";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// INVENTORY HEADER
// ====================================
// Composition-only feature header.
//
// Responsibilities:
// - Inventory title
// - Inventory description
// - Product count
// - Admin-only create action
//
// No API access.
// ====================================

const InventoryHeader = ({
    productCount = 0,
    onAddProduct
}) => {

    const {
        isDark
    } = useTheme();

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="lg"
            style={{
                marginBottom: "24px"
            }}
        >

            <PageHeader

                title="Inventory Management"

                subtitle={
                    `${productCount} ${
                        productCount === 1
                            ? "product"
                            : "products"
                    } in the catalogue`
                }

                actions={

                    <RoleGuard
                        roles={["Admin"]}
                    >

                        <Button
                            variant="primary"
                            size="md"
                            isDark={isDark}
                            icon={Plus}
                            onClick={onAddProduct}
                        >
                            Add Product
                        </Button>

                    </RoleGuard>

                }

            />

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "-8px",
                    color: isDark
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(15,23,42,0.65)"
                }}
            >

                <Package size={17} />

                <span
                    style={{
                        fontSize: "13px"
                    }}
                >
                    Monitor catalogue pricing,
                    stock levels and product availability.
                </span>

            </div>

        </Card>

    );
};

export default InventoryHeader;
