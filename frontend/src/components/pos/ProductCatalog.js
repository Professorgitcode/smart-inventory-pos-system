import React, {
    useMemo,
    useState
} from "react";

import {
    Package
} from "lucide-react";

import {
    Alert,
    Badge,
    Button,
    Card,
    EmptyState,
    SearchBox,
    SkeletonLoader
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// COMPONENT
// ====================================

const ProductCatalog = ({
    products = [],
    loading = false,
    error = null,
    onAddToCart
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const [
        search,
        setSearch
    ] = useState("");

    // ====================================
    // FILTER
    // ====================================

    const filteredProducts =
        useMemo(() => {

            const term =
                search
                    .trim()
                    .toLowerCase();

            if (!term) {
                return products;
            }

            return products.filter(
                product =>
                    product?.name
                        ?.toLowerCase()
                        .includes(term)
            );

        }, [
            products,
            search
        ]);

    // ====================================
    // LOADING
    // ====================================

    if (
        loading &&
        products.length === 0
    ) {

        return (

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing.md
                }}
            >

                <Card
                    variant="glass"
                    isDark={isDark}
                >

                    <SkeletonLoader
                        variant="rect"
                        height="42px"
                        isDark={isDark}
                    />

                </Card>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(190px, 1fr))",
                        gap: theme.spacing.md
                    }}
                >

                    {Array.from(
                        { length: 6 }
                    ).map(
                        (_, index) => (

                            <Card
                                key={index}
                                variant="glass"
                                isDark={isDark}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection:
                                            "column",
                                        gap: "12px"
                                    }}
                                >

                                    <SkeletonLoader
                                        variant="rect"
                                        height="110px"
                                        isDark={isDark}
                                    />

                                    <SkeletonLoader
                                        variant="text"
                                        width="70%"
                                        isDark={isDark}
                                    />

                                    <SkeletonLoader
                                        variant="text"
                                        width="45%"
                                        isDark={isDark}
                                    />

                                </div>

                            </Card>

                        )
                    )}

                </div>

            </div>

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
                title="POS product data error"
            >
                {error.message ||
                    "Unable to load products for the point of sale."}
            </Alert>

        );

    }

    // ====================================
    // EMPTY
    // ====================================

    if (products.length === 0) {

        return (

            <EmptyState
                icon={Package}
                isDark={isDark}
                title="No products available"
                description={
                    "There are currently no products available for sale."
                }
            />

        );

    }

    // ====================================
    // CATALOGUE
    // ====================================

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing.md
            }}
        >

            <Card
                variant="glass"
                isDark={isDark}
                padding="md"
            >

                <SearchBox
                    value={search}
                    onChange={event =>
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

            </Card>

            {filteredProducts.length === 0 ? (

                <Card
                    variant="glass"
                    isDark={isDark}
                >

                    <EmptyState
                        icon={Package}
                        isDark={isDark}
                        title="No matching products"
                        description={
                            "Try another product name."
                        }
                    />

                </Card>

            ) : (

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(190px, 1fr))",
                        gap: theme.spacing.md
                    }}
                >

                    {filteredProducts.map(
                        product => {

                            const stock =
                                Number(
                                    product.stockQuantity ||
                                    0
                                );

                            const outOfStock =
                                stock <= 0;

                            const lowStock =
                                stock > 0 &&
                                stock < 10;

                            return (

                                <Card
                                    key={product.id}
                                    variant="glass"
                                    isDark={isDark}
                                    padding="md"
                                    style={{
                                        display: "flex",
                                        flexDirection:
                                            "column",
                                        gap: "12px",
                                        transition:
                                            "transform 180ms ease"
                                    }}
                                >

                                    <div
                                        style={{
                                            height: "110px",
                                            borderRadius:
                                                theme.radius.lg,
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            backgroundColor:
                                                isDark
                                                    ? "rgba(255,255,255,0.04)"
                                                    : "rgba(52,114,156,0.06)",
                                            color:
                                                theme.colors.primary
                                        }}
                                    >

                                        <Package
                                            size={38}
                                            strokeWidth={1.6}
                                        />

                                    </div>

                                    <div
                                        style={{
                                            minHeight: "42px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontWeight:
                                                    theme.typography
                                                        .fontWeight.semibold,
                                                color:
                                                    theme.colors.text,
                                                fontSize:
                                                    theme.typography
                                                        .fontSize.sm
                                            }}
                                        >
                                            {product.name}
                                        </div>

                                        <div
                                            style={{
                                                marginTop: "4px",
                                                color:
                                                    theme.colors.primary,
                                                fontWeight:
                                                    theme.typography
                                                        .fontWeight.bold
                                            }}
                                        >
                                            $
                                            {Number(
                                                product.price || 0
                                            ).toFixed(2)}
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <Badge
                                            variant={
                                                outOfStock
                                                    ? "danger"
                                                    : lowStock
                                                        ? "warning"
                                                        : "success"
                                            }
                                            isDark={isDark}
                                        >
                                            {outOfStock
                                                ? "Out of Stock"
                                                : lowStock
                                                    ? "Low Stock"
                                                    : "Available"}
                                        </Badge>

                                        <span
                                            style={{
                                                fontSize:
                                                    theme.typography
                                                        .fontSize.xs,
                                                color:
                                                    theme.colors.textMuted
                                            }}
                                        >
                                            {stock} units
                                        </span>

                                    </div>

                                    <Button
                                        variant="primary"
                                        size="sm"
                                        isDark={isDark}
                                        disabled={outOfStock}
                                        onClick={() =>
                                            onAddToCart(
                                                product
                                            )
                                        }
                                    >
                                        {outOfStock
                                            ? "Unavailable"
                                            : "Add to Cart"}
                                    </Button>

                                </Card>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

};

export default ProductCatalog;
