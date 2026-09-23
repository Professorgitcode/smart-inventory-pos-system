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

            const availableStock =
                Number(
                    product.stockQuantity || 0
                );

            if (availableStock <= 0) {
                return;
            }

            setCart(
                currentCart => {

                    const existingItem =
                        currentCart.find(
                            item =>
                                item.id ===
                                product.id
                        );

                    if (existingItem) {

                        const nextQuantity =
                            existingItem.quantity +
                            quantity;

                        if (
                            nextQuantity >
                            availableStock
                        ) {
                            return currentCart;
                        }

                        return currentCart.map(
                            item =>
                                item.id ===
                                product.id
                                    ? {
                                        ...item,
                                        quantity:
                                            nextQuantity
                                    }
                                    : item
                        );
                    }

                    const safeQuantity =
                        Math.min(
                            Math.max(
                                1,
                                quantity
                            ),
                            availableStock
                        );

                    return [
                        ...currentCart,
                        {
                            ...product,
                            quantity:
                                safeQuantity
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
        (
            productId,
            quantity
        ) => {

            setCart(
                currentCart =>
                    currentCart.map(
                        item => {

                            if (
                                item.id !==
                                productId
                            ) {
                                return item;
                            }

                            const maxQuantity =
                                Number(
                                    item.stockQuantity ||
                                    0
                                );

                            const safeQuantity =
                                Math.min(
                                    Math.max(
                                        0,
                                        Number(
                                            quantity
                                        ) || 0
                                    ),
                                    maxQuantity
                                );

                            return {
                                ...item,
                                quantity:
                                    safeQuantity
                            };

                        }
                    ).filter(
                        item =>
                            item.quantity > 0
                    )
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
        async () => {

            if (
                cart.length === 0
            ) {

                throw new Error(
                    "Cannot checkout an empty cart."
                );

            }

            // ====================================
            // BACKEND ORDER CONTRACT
            // ====================================
            //
            // The current backend accepts only:
            //
            // items[]
            //   productId
            //   quantity
            //
            // Payment information, customer
            // information, tax and discount are
            // currently frontend/receipt metadata.
            //
            // Do not send them as part of this
            // order payload until the backend
            // transaction model supports them.
            // ====================================

            const checkoutData = {

                items:
                    cart.map(
                        item => ({
                            productId:
                                item.id,

                            quantity:
                                item.quantity
                        })
                    )

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
            checkoutMutation,
            clearCart
        ]
    );

    // ====================================
    // REFRESH PRODUCTS
    // ====================================

    const refreshProducts =
                productsQuery.refetch;

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

        isCheckingOut:
            checkoutMutation.isLoading,

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