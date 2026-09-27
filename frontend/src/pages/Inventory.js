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

import { Toast } from "../components/ui";

import {
    ConfirmDialog
} from "../components/ui";

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
        isDark
    } = useTheme();

    // ====================================
    // BUSINESS STATE
    // ====================================

    const {
        data: products,
        loading,
        error,
        actions,
        mutation
    } = useInventory();

    // ====================================
    // UI HOOKS
    // ====================================

    const productModal =
        useModal();

    const toast =
        useToast();

    const [
        productPendingDeletion,
        setProductPendingDeletion
    ] = useState(null);

    const [
        isDeletingProduct,
        setIsDeletingProduct
    ] = useState(false);

    // ====================================
    // SEARCH STATE
    // ====================================

    const [
        search,
        setSearch
    ] = useState("");

    // ====================================
    // SORT STATE
    // ====================================

    const [
        sortKey,
        setSortKey
    ] = useState(null);

    const [
        sortDirection,
        setSortDirection
    ] = useState("asc");

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
    // SORT
    // ====================================

    const sortedProducts =
        useMemo(() => {

            if (!sortKey) {
                return filteredProducts;
            }

            const sorted = [
                ...filteredProducts
            ];

            sorted.sort(
                (a, b) => {

                    const first =
                        a?.[sortKey];

                    const second =
                        b?.[sortKey];

                    if (
                        first == null &&
                        second == null
                    ) {
                        return 0;
                    }

                    if (first == null) {
                        return 1;
                    }

                    if (second == null) {
                        return -1;
                    }

                    let comparison;

                    if (
                        typeof first === "number" &&
                        typeof second === "number"
                    ) {

                        comparison =
                            first - second;

                    } else {

                        comparison =
                            String(first).localeCompare(
                                String(second),
                                undefined,
                                {
                                    numeric: true,
                                    sensitivity: "base"
                                }
                            );

                    }

                    return sortDirection === "asc"
                        ? comparison
                        : -comparison;

                }
            );

            return sorted;

        }, [
            filteredProducts,
            sortKey,
            sortDirection
        ]);

    // ====================================
    // PAGINATION
    // ====================================

    const pagination =
        usePagination(
            sortedProducts,
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

    const handleDeleteProduct = (
        id
    ) => {

        setProductPendingDeletion(id);

    };

    const confirmDeleteProduct = async () => {

        if (productPendingDeletion === null || isDeletingProduct) {
            return;
        }

        setIsDeletingProduct(true);

        try {

            await actions.deleteProduct(
                productPendingDeletion
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

        finally {

            setIsDeletingProduct(false);
            setProductPendingDeletion(null);

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

                sortKey={
                    sortKey
                }

                sortDirection={
                    sortDirection
                }

                onSortChange={
                    (key, direction) => {

                        setSortKey(
                            key
                        );

                        setSortDirection(
                            direction
                        );

                    }
                }
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
                    mutation.isSaving
                }

            />

            <ConfirmDialog
                open={
                    productPendingDeletion !== null
                }
                title="Delete product?"
                message="This action will remove the product from inventory."
                confirmLabel="Delete"
                variant="danger"
                isDark={isDark}
                loading={isDeletingProduct}
                onConfirm={confirmDeleteProduct}
                onCancel={() => setProductPendingDeletion(null)}
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

                isDark={
                    isDark
                }

                onClose={
                    toast.hide
                }

            />

        </div>

    );

};

export default Inventory;
