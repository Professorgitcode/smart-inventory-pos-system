import React, {
    useState
} from "react";

import {
    useTheme
} from "../context/ThemeContext";

import usePOS
    from "../hooks/business/pos/usePOS";

import useToast
    from "../hooks/ui/useToast";

import POSHeader
    from "../components/pos/POSHeader";

import ProductCatalog
    from "../components/pos/ProductCatalog";

import CartPanel
    from "../components/pos/CartPanel";

import CreatePaymentModal
    from "../components/pos/CreatePaymentModal";

import ReceiptModal
    from "../components/pos/ReceiptModal";

import Toast
    from "../components/common/Toast";

// ====================================
// POS PAGE
// ====================================
// Composition layer.
//
// API communication remains inside
// usePOS -> repository -> service.
// ====================================

const POS = () => {

    const {
        theme
    } = useTheme();

    // ====================================
    // BUSINESS STATE
    // ====================================

    const {
        products,
        cart,
        subtotal,
        tax,
        total,
        loading,
        isCheckingOut,
        error,
        actions
    } = usePOS();

    // ====================================
    // UI STATE
    // ====================================

    const toast =
        useToast();

    const [
        isPaymentModalOpen,
        setIsPaymentModalOpen
    ] = useState(false);

    const [
        paymentData,
        setPaymentData
    ] = useState(null);

    const [
        showReceipt,
        setShowReceipt
    ] = useState(false);

    const [
        generatedOrderId,
        setGeneratedOrderId
    ] = useState(null);

    // ====================================
    // ADD TO CART
    // ====================================

    const handleAddToCart = (
        product
    ) => {

        if (
            Number(
                product?.stockQuantity || 0
            ) <= 0
        ) {

            toast.error(
                "Out of Stock",
                "This product is currently unavailable."
            );

            return;
        }

        const existing =
            cart.find(
                item =>
                    item.id ===
                    product.id
            );

        if (
            existing &&
            existing.quantity >=
                product.stockQuantity
        ) {

            toast.error(
                "Stock Limit",
                "Cannot exceed available stock quantity."
            );

            return;
        }

        actions.addToCart(
            product
        );

        toast.success(
            "Cart Updated",
            `${product.name} added to the cart.`
        );

    };

    // ====================================
    // UPDATE CART
    // ====================================

    const handleUpdateQuantity = (
        productId,
        quantity
    ) => {

        actions.updateQuantity(
            productId,
            quantity
        );

    };

    // ====================================
    // REMOVE ITEM
    // ====================================

    const handleRemoveItem = (
        productId
    ) => {

        const item =
            cart.find(
                product =>
                    product.id ===
                    productId
            );

        actions.removeFromCart(
            productId
        );

        if (item) {

            toast.info(
                "Item Removed",
                `${item.name} was removed from the cart.`
            );

        }

    };

    // ====================================
    // OPEN CHECKOUT
    // ====================================

    const handleCheckout = () => {

        if (cart.length === 0) {

            toast.error(
                "Empty Cart",
                "Add products before checkout."
            );

            return;
        }

        setIsPaymentModalOpen(
            true
        );

    };

  // ====================================
// CONFIRM PAYMENT
// ====================================

const handlePaymentConfirm =
    async paymentInfo => {

        try {

            const result =
                await actions.checkout();

            const orderId =
                result?.orderId ||
                result?.id;

            setGeneratedOrderId(
                orderId
            );

            setPaymentData(
                paymentInfo
            );

            setIsPaymentModalOpen(
                false
            );

            setShowReceipt(
                true
            );

            toast.success(
                "Payment Successful",
                "Transaction completed successfully."
            );

            return result;

        } catch (
            checkoutError
        ) {

            toast.error(
                "Checkout Failed",
                checkoutError?.message ||
                    "Unable to complete the transaction."
            );

            // Important:
            // Let the payment modal know that
            // checkout failed so it remains open.
            throw checkoutError;

        }

    };

    // ====================================
    // CLOSE RECEIPT
    // ====================================

    const handleReceiptClose = () => {

        setShowReceipt(
            false
        );

        setPaymentData(
            null
        );

        setGeneratedOrderId(
            null
        );

        toast.info(
            "Transaction Complete",
            "The transaction has been completed."
        );

    };

    // ====================================
    // PAGE
    // ====================================

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing.lg
            }}
        >

            <POSHeader
                cartItemCount={
                    cart.length
                }
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "minmax(0, 1.8fr) minmax(360px, 1fr)",
                    gap: theme.spacing.lg,
                    alignItems: "start"
                }}
            >

                <ProductCatalog

                    products={
                        products
                    }

                    loading={
                        loading
                    }

                    error={
                        error
                    }

                    onAddToCart={
                        handleAddToCart
                    }

                />

                <CartPanel

                    cart={
                        cart
                    }

                    onUpdateQuantity={
                        handleUpdateQuantity
                    }

                    onRemoveItem={
                        handleRemoveItem
                    }

                    subtotal={
                        subtotal
                    }

                    tax={
                        tax
                    }

                    total={
                        total
                    }

                    onCheckout={
                        handleCheckout
                    }

                />

            </div>

            <CreatePaymentModal

                isOpen={
                    isPaymentModalOpen
                }

                onClose={() =>
                    setIsPaymentModalOpen(
                        false
                    )
                }

                onConfirmPayment={
                    handlePaymentConfirm
                }

                cartItems={
                    cart
                }

                subtotal={subtotal}

                tax={tax}

                totalAmount={
                    total
                }

                isSaving={isCheckingOut}

                theme={
                    theme
                }

            />

            <ReceiptModal

                isOpen={
                    showReceipt
                }

                onClose={
                    handleReceiptClose
                }

                paymentData={
                    paymentData
                }

                orderId={
                    generatedOrderId
                }

                theme={
                    theme
                }

            />

            <Toast

                header={
                    toast.toast.header
                }

                message={
                    toast.toast.message
                }

                type={
                    toast.toast.type
                }

                isVisible={
                    toast.toast.isVisible
                }

                theme={
                    theme
                }

                onClose={
                    toast.hide
                }

            />

        </div>

    );

};

export default POS;
