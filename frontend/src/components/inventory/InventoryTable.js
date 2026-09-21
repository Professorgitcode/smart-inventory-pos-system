import React, {
    useMemo
} from "react";

import {
    Edit3,
    Package,
    Trash2
} from "lucide-react";

import {
    Alert,
    Badge,
    Button,
    Card,
    EmptyState,
    SearchBox,
    SkeletonLoader,
    Table
} from "../ui";

import {
    RoleGuard
} from "../../auth";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// STOCK STATUS
// ====================================

const getStockStatus = (
    quantity
) => {

    const stock =
        Number(quantity) || 0;

    if (stock <= 0) {

        return {
            label: "Out of Stock",
            variant: "danger"
        };

    }

    if (stock < 10) {

        return {
            label: "Low Stock",
            variant: "warning"
        };

    }

    return {
        label: "Healthy",
        variant: "success"
    };

};

// ====================================
// CURRENCY FORMATTER
// ====================================

const formatCurrency = (
    amount
) => {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD"
        }
    ).format(
        Number(amount) || 0
    );

};

// ====================================
// COMPONENT
// ====================================

const InventoryTable = ({
    products = [],
    totalProducts = 0,
    catalogueSize = 0,
    search,
    setSearch,
    onEdit,
    onDelete,
    onAddProduct,
    loading = false,
    error = null,
    pagination
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    // ====================================
    // TABLE COLUMNS
    // ====================================

    const columns = useMemo(
        () => [

            {
                key: "name",
                label: "Product",
                sortable: true,
                render: (
                    value
                ) => (

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >

                        <div
                            style={{
                                width: "34px",
                                height: "34px",
                                borderRadius:
                                    theme.radius.md,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: isDark
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(52,114,156,0.08)",
                                color:
                                    theme.colors.primary,
                                flexShrink: 0
                            }}
                        >
                            <Package size={17} />
                        </div>

                        <span
                            style={{
                                fontWeight:
                                    theme.typography
                                        .fontWeight.semibold,
                                color:
                                    theme.colors.text
                            }}
                        >
                            {value || "Unnamed Product"}
                        </span>

                    </div>

                )
            },

            {
                key: "price",
                label: "Price",
                sortable: true,
                render: (
                    value
                ) => (

                    <span
                        style={{
                            color:
                                theme.colors.text,
                            fontWeight:
                                theme.typography
                                    .fontWeight.medium
                        }}
                    >
                        {formatCurrency(value)}
                    </span>

                )
            },

            {
                key: "stockQuantity",
                label: "Stock",
                sortable: true,
                render: (
                    value
                ) => (

                    <span
                        style={{
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        {Number(value) || 0} units
                    </span>

                )
            },

            {
                key: "status",
                label: "Status",
                render: (
                    _,
                    product
                ) => {

                    const status =
                        getStockStatus(
                            product.stockQuantity
                        );

                    return (

                        <Badge
                            variant={
                                status.variant
                            }
                            isDark={isDark}
                        >
                            {status.label}
                        </Badge>

                    );

                }
            },

            {
                key: "actions",
                label: "Actions",
                render: (
                    _,
                    product
                ) => (

                    <RoleGuard
                        roles={["Admin"]}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: theme.spacing.xxs
                            }}
                        >

                            <Button
                                variant="icon"
                                size="sm"
                                isDark={isDark}
                                title="Edit product"
                                aria-label={
                                    `Edit ${product.name}`
                                }
                                onClick={(event) => {

                                    event.stopPropagation();

                                    onEdit(
                                        product
                                    );

                                }}
                            >

                                <Edit3 size={17} />

                            </Button>

                            <Button
                                variant="icon"
                                size="sm"
                                isDark={isDark}
                                title="Delete product"
                                aria-label={
                                    `Delete ${product.name}`
                                }
                                onClick={(event) => {

                                    event.stopPropagation();

                                    onDelete(
                                        product.id
                                    );

                                }}
                            >

                                <Trash2
                                    size={17}
                                    color={
                                        theme.colors.danger
                                    }
                                />

                            </Button>

                        </div>

                    </RoleGuard>

                )
            }

        ],
        [
            isDark,
            onDelete,
            onEdit,
            theme
        ]
    );

    // ====================================
    // LOADING
    // ====================================

    if (loading && products.length === 0) {

        return (

            <Card
                variant="glass"
                isDark={isDark}
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}
                >

                    <SkeletonLoader
                        variant="rect"
                        height="44px"
                        isDark={isDark}
                    />

                    {Array.from(
                        { length: 6 }
                    ).map(
                        (_, index) => (

                            <SkeletonLoader
                                key={index}
                                variant="rect"
                                height="48px"
                                isDark={isDark}
                            />

                        )
                    )}

                </div>

            </Card>

        );

    }

    // ====================================
    // ERROR
    // ====================================

    if (error) {

        return (

            <Alert
                variant="danger"
                isDark={isDark}
                title="Inventory data error"
            >
                {error.message ||
                    "Unable to load inventory records."}
            </Alert>

        );

    }

    // ====================================
    // EMPTY INVENTORY
    // ====================================

    if (totalProducts === 0) {

        return (

            <EmptyState
                icon={Package}
                isDark={isDark}
                title="Your inventory is empty"
                description={
                    "Add your first product to begin building the catalogue."
                }
                action={

                    <RoleGuard
                        roles={["Admin"]}
                    >

                        <Button
                            variant="primary"
                            isDark={isDark}
                            onClick={onAddProduct}
                            icon={Package}
                        >
                            Add Product
                        </Button>

                    </RoleGuard>

                }
            />

        );

    }
    if (products.length === 0) {

    return (
        <Card
            variant="glass"
            isDark={isDark}
            padding="lg"
        >
            <Alert
                variant="info"
                isDark={isDark}
                title="No matching products"
            >
                Try a different product name.
            </Alert>
        </Card>
    );

}
if (catalogueSize === 0) {
    // Entire inventory is empty
}

    // ====================================
    // TABLE
    // ====================================

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="md"
        >

            {/* ====================================
                SEARCH BAR
                ==================================== */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: theme.spacing.md,
                    marginBottom: theme.spacing.md,
                    flexWrap: "wrap"
                }}
            >

                <div>

                    <h2
                        style={{
                            margin: 0,
                            fontSize:
                                theme.typography
                                    .fontSize.md,
                            color:
                                theme.colors.text,
                            fontWeight:
                                theme.typography
                                    .fontWeight.bold
                        }}
                    >
                        Product Catalogue
                    </h2>

                    <span
                        style={{
                            display: "block",
                            marginTop: "3px",
                            fontSize:
                                theme.typography
                                    .fontSize.xs,
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        {pagination.totalItems} matching
                        {" "}
                        {pagination.totalItems === 1
                            ? "product"
                            : "products"}
                    </span>

                </div>

                <div
                    style={{
                        width:
                            "min(360px, 100%)"
                    }}
                >

                    <SearchBox
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        onClear={() =>
                            setSearch("")
                        }
                        placeholder="Search products..."
                        isDark={isDark}
                    />

                </div>

            </div>

            {/* ====================================
                SEARCH EMPTY STATE
                ==================================== */}

            {products.length === 0 ? (

                <Alert
                    variant="info"
                    isDark={isDark}
                    title="No matching products"
                >
                    Try a different product name.
                </Alert>

            ) : (

                <Table
                    columns={columns}
                    data={products}
                    isDark={isDark}
                    stickyHeader
                    pagination={{
                        totalItems:
                            pagination.totalItems,
                        itemsPerPage:
                            pagination.pageSize,
                        currentPage:
                            pagination.currentPage,
                        onPageChange:
                            pagination.onPageChange
                    }}
                />

            )}

        </Card>

    );

};

export default InventoryTable;
