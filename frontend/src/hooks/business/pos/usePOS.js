// ====================================
// POS BUSINESS HOOK
// ====================================
//
// Server state:
//
// - Product catalogue
// - Checkout
//
// Local state:
//
// - Shopping cart
//
// Architecture:
//
// usePOS
//   ↓
// POSRepository
//   ├── InventoryService
//   └── POSService
// ====================================

import {
    useCallback,
    useMemo,
    useState
} from "react";

import {
    useQuery,
    useMutation
} from "../../../query";

import POSRepository
    from "../../../repositories/pos/POSRepository";

const POS_PRODUCTS_KEY = [
    "pos",
    "products"
];

const usePOS = () => {

    // ====================================
    // CART STATE
    // ====================================

    const [cart, setCart] =
        useState([]);

    // ====================================
    // PRODUCT QUERY
    // ====================================

    const productsQuery =
        useQuery(
            POS_PRODUCTS_KEY,
            () =>
                POSRepository.getProducts(),
            {
                staleTime:
                    2 * 60 * 1000
            }
        );

    // ====================================
    // CHECKOUT MUTATION
    // ====================================

    const checkoutMutation =
        useMutation(
            (checkoutData) =>
                POSRepository.checkout(
                    checkoutData
                ),
            {
                invalidateKeys: [
                    POS_PRODUCTS_KEY,
                    ["inventory"],
                    ["dashboard"],
                    ["reports"]
                ],
                throwOnError: true
            }
        );

    // ====================================
    // ADD TO CART
    // ====================================

    const addToCart =
        useCallback(
            (product, quantity = 1) => {

                if (!product) {
                    return;
                }

                setCart(
                    (currentCart) => {

                        const existingItem =
                            currentCart.find(
                                (item) =>
                                    item.id ===
                                    product.id
                            );

                        if (existingItem) {

                            return currentCart.map(
                                (item) =>
                                    item.id ===
                                    product.id
                                        ? {
                                            ...item,
                                            quantity:
                                                item.quantity +
                                                quantity
                                        }
                                        : item
                            );
                        }

                        return [
                            ...currentCart,
                            {
                                ...product,
                                quantity
                            }
                        ];
                    }
                );
            },
            []
        );

    // ====================================
    // UPDATE QUANTITY
    // ====================================

    const updateQuantity =
        useCallback(
            (productId, quantity) => {

                setCart(
                    (currentCart) => {

                        if (
                            quantity <= 0
                        ) {

                            return currentCart.filter(
                                (item) =>
                                    item.id !==
                                    productId
                            );
                        }

                        return currentCart.map(
                            (item) =>
                                item.id ===
                                productId
                                    ? {
                                        ...item,
                                        quantity
                                    }
                                    : item
                        );
                    }
                );
            },
            []
        );

    // ====================================
    // REMOVE FROM CART
    // ====================================

    const removeFromCart =
        useCallback(
            (productId) => {

                setCart(
                    (currentCart) =>
                        currentCart.filter(
                            (item) =>
                                item.id !==
                                productId
                        )
                );
            },
            []
        );

    // ====================================
    // CLEAR CART
    // ====================================

    const clearCart =
        useCallback(
            () => {
                setCart([]);
            },
            []
        );

    // ====================================
    // SUBTOTAL
    // ====================================

    const subtotal =
        useMemo(
            () =>
                cart.reduce(
                    (
                        total,
                        item
                    ) => {

                        const price =
                            Number(
                                item.price || 0
                            );

                        const quantity =
                            Number(
                                item.quantity || 0
                            );

                        return (
                            total +
                            price * quantity
                        );

                    },
                    0
                ),
            [cart]
        );

    // ====================================
    // TAX
    // ====================================
    //
    // Temporary business rule.
    //
    // This should eventually come from
    // backend/application configuration.
    // ====================================

    const tax =
        useMemo(
            () =>
                subtotal * 0.15,
            [subtotal]
        );

    // ====================================
    // TOTAL
    // ====================================

    const total =
        useMemo(
            () =>
                subtotal + tax,
            [
                subtotal,
                tax
            ]
        );

    // ====================================
    // CHECKOUT
    // ====================================

    const checkout =
        useCallback(
            async (additionalData = {}) => {

                if (
                    cart.length === 0
                ) {

                    throw new Error(
                        "Cannot checkout an empty cart."
                    );
                }

                const checkoutData = {

                    items:
                        cart.map(
                            (item) => ({
                                productId:
                                    item.id,

                                quantity:
                                    item.quantity,

                                price:
                                    Number(
                                        item.price || 0
                                    )
                            })
                        ),

                    subtotal,

                    tax,

                    total,

                    ...additionalData

                };

                const result =
                    await checkoutMutation.mutate(
                        checkoutData
                    );

                if (
                    result !== undefined
                ) {

                    clearCart();

                }

                return result;
            },
            [
                cart,
                subtotal,
                tax,
                total,
                checkoutMutation.mutate,
                clearCart
            ]
        );

    // ====================================
    // REFRESH PRODUCTS
    // ====================================

    const refreshProducts =
        useCallback(
            () =>
                productsQuery.refetch(),
            [
                productsQuery.refetch
            ]
        );

    // ====================================
    // COMBINED STATE
    // ====================================

    const loading =
        productsQuery.loading ||
        checkoutMutation.isLoading;

    const error =
        productsQuery.error ||
        checkoutMutation.error ||
        null;

    // ====================================
    // RETURN
    // ====================================

    return {

        data:
            productsQuery.data || [],

        products:
            productsQuery.data || [],

        cart,

        subtotal,

        tax,

        total,

        loading,

        error,

        actions: {

            addToCart,

            updateQuantity,

            removeFromCart,

            clearCart,

            checkout,

            refreshProducts

        }

    };
};

export default usePOS;