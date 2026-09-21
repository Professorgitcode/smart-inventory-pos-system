import React, {
    useMemo,
    useState
} from "react";

import {
    useTheme
} from "../context/ThemeContext";

import useInventory
    from "../hooks/business/inventory/useInventory";

import useModal
    from "../hooks/ui/useModal";

import useToast
    from "../hooks/ui/useToast";

import usePagination
    from "../hooks/ui/usePagination";

import InventoryHeader
    from "../components/inventory/InventoryHeader";

import InventoryTable
    from "../components/inventory/InventoryTable";

import ProductModal
    from "../components/inventory/ProductModal";

import Toast
    from "../components/common/Toast";

// ====================================
// INVENTORY PAGE
// ====================================
// Composition layer only.
//
// Responsibilities:
// - Connect business hook
// - Connect UI hooks
// - Manage search/filter state
// - Handle CRUD events
// - Compose feature components
//
// API communication does not belong here.
// ====================================

const Inventory = () => {

    const {
        theme
    } = useTheme();

    // ====================================
    // BUSINESS STATE
    // ====================================

    const {
        data: products,
        loading,
        error,
        actions
    } = useInventory();

    // ====================================
    // UI HOOKS
    // ====================================

    const productModal =
        useModal();

    const toast =
        useToast();

    // ====================================
    // SEARCH STATE
    // ====================================

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
    // PAGINATION
    // ====================================

    const pagination =
        usePagination(
            filteredProducts,
            10
        );

    // ====================================
    // ADD PRODUCT
    // ====================================

    const handleAddProduct = () => {

        productModal.open({
            mode: "add",
            data: null
        });

    };

    // ====================================
    // EDIT PRODUCT
    // ====================================

    const handleEditProduct = (
        product
    ) => {

        productModal.open({
            mode: "edit",
            data: product
        });

    };

    // ====================================
    // SAVE PRODUCT
    // ====================================

    const handleSaveProduct = async (
        productData
    ) => {

        try {

            if (
                productModal.data?.mode ===
                "edit"
            ) {

                const product =
                    productModal.data?.data;

                await actions.updateProduct({

                    id: product.id,

                    product: {

                        id: product.id,

                        ...productData

                    }

                });

                toast.success(
                    "Product Updated",
                    "Product details updated successfully."
                );

            } else {

                await actions.createProduct(
                    productData
                );

                toast.success(
                    "Product Added",
                    "New product added successfully."
                );

            }

            productModal.reset();

        } catch (operationError) {

            toast.error(
                "Operation Failed",
                operationError?.message ||
                    "Unable to save the product."
            );

        }

    };

    // ====================================
    // DELETE PRODUCT
    // ====================================

    const handleDeleteProduct = async (
        id
    ) => {

        const confirmed =
            window.confirm(
                "Delete this product from inventory?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await actions.deleteProduct(
                id
            );

            toast.success(
                "Product Deleted",
                "Product removed from inventory."
            );

        } catch (operationError) {

            toast.error(
                "Delete Failed",
                operationError?.message ||
                    "Unable to delete the product."
            );

        }

    };

    // ====================================
    // RENDER
    // ====================================

    return (

        <div>

            {/* ====================================
                HEADER
                ==================================== */}

            <InventoryHeader
                productCount={
                    products.length
                }
                onAddProduct={
                    handleAddProduct
                }
            />

            {/* ====================================
                INVENTORY TABLE
                ==================================== */}

            <InventoryTable
                products={
                    pagination.data
                }
                totalProducts={
                    filteredProducts.length
                }
                catalogueSize={
                    products.length
                }
                search={
                    search
                }
                setSearch={
                    setSearch
                }
                onEdit={
                    handleEditProduct
                }
                onDelete={
                    handleDeleteProduct
                }
                onAddProduct={
                    handleAddProduct
                }
                loading={
                    loading
                }
                error={
                    error
                }
                pagination={{
                    totalItems:
                        pagination.pagination
                            .totalItems,

                    pageSize:
                        pagination.pagination
                            .pageSize,

                    currentPage:
                        pagination.pagination
                            .currentPage,

                    onPageChange:
                        pagination.actions
                            .goToPage
                }}
            />

            {/* ====================================
                PRODUCT MODAL
                ==================================== */}

            <ProductModal

                isOpen={
                    productModal.isOpen
                }

                mode={
                    productModal.data?.mode ||
                    "add"
                }

                initialData={
                    productModal.data?.data ||
                    null
                }

                onClose={
                    productModal.reset
                }

                onSave={
                    handleSaveProduct
                }

                isSaving={
                    loading
                }

            />

            {/* ====================================
                TOAST
                ==================================== */}

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

export default Inventory;
