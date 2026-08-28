import { useState, useEffect, useCallback } from "react";

import useAsync from "../ui/useAsync";

import { POSRepository } from "../../repositories";

const usePOS = () => {

    /*
    =====================================
    Async State
    =====================================
    */

    const {

        loading,

        error,

        execute

    } = useAsync();

    /*
    =====================================
    State
    =====================================
    */

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    const [receipt, setReceipt] = useState(null);

    /*
    =====================================
    Load Products
    =====================================
    */

    const loadProducts = useCallback(async () => {

        const result = await execute(() =>
            POSRepository.getProducts()
        );

        if (result) {

            setProducts(result);

        }

    }, [execute]);

    /*
    =====================================
    Load Receipt
    =====================================
    */

    const loadReceipt = useCallback(async (saleId) => {

        const result = await execute(() =>
            POSRepository.getReceipt(saleId)
        );

        if (result) {

            setReceipt(result);

        }

    }, [execute]);

    /*
    =====================================
    Cart Operations
    =====================================
    */

    const addToCart = useCallback((product) => {

        setCart(previous => {

            const existing = previous.find(
                item => item.id === product.id
            );

            if (existing) {

                return previous.map(item =>

                    item.id === product.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity + 1
                          }
                        : item

                );

            }

            return [

                ...previous,

                {

                    ...product,

                    quantity: 1

                }

            ];

        });

    }, []);

    const removeFromCart = useCallback((productId) => {

        setCart(previous =>
            previous.filter(
                item => item.id !== productId
            )
        );

    }, []);

    const updateQuantity = useCallback(

        (productId, quantity) => {

            setCart(previous =>

                previous.map(item =>

                    item.id === productId

                        ? {

                              ...item,

                              quantity

                          }

                        : item

                )

            );

        },

        []

    );

    const clearCart = useCallback(() => {

        setCart([]);

    }, []);

    /*
    =====================================
    Checkout
    =====================================
    */

    const checkout = useCallback(async () => {

        const result = await execute(() =>
            POSRepository.checkout(cart)
        );

        if (result) {

            setReceipt(result);

            clearCart();

        }

    }, [

        cart,

        clearCart,

        execute

    ]);

    /*
    =====================================
    Cancel Sale
    =====================================
    */

    const cancelSale = useCallback(() => {

        clearCart();

        setReceipt(null);

    }, [clearCart]);

    /*
    =====================================
    Calculations
    =====================================
    */

    const subtotal = cart.reduce(

        (sum, item) =>

            sum +

            item.price *

            item.quantity,

        0

    );

    const tax = subtotal * 0.15;

    const total = subtotal + tax;

    /*
    =====================================
    Effects
    =====================================
    */

    useEffect(() => {

        loadProducts();

    }, [loadProducts]);

    /*
    =====================================
    Public API
    =====================================
    */

    return {

        data: {

            products,

            cart,

            receipt,

            subtotal,

            tax,

            total

        },

        loading,

        error,

        actions: {

            refresh: loadProducts,

            loadReceipt,

            addToCart,

            removeFromCart,

            updateQuantity,

            checkout,

            clearCart,

            cancelSale

        }

    };

};

export default usePOS;