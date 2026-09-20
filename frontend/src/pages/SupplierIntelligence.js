// ====================================
// SUPPLIER INTELLIGENCE PAGE
// ====================================
//
// Composition layer only.
//
// Responsibilities:
// - Compose supplier UI components
// - Manage UI-only state
// - Connect UI events to business actions
//
// API access does not belong here.
//
// Architecture:
//
// Page
//   ↓
// useSuppliers
//   ↓
// Query / Mutation
//   ↓
// Repository
//   ↓
// Service
//   ↓
// apiClient
//   ↓
// Backend
// ====================================

import React, {
    useMemo,
    useState
} from "react";

import {
    useTheme
} from "../context/ThemeContext";

import useSuppliers
    from "../hooks/business/suppliers/useSuppliers";

import useModal
    from "../hooks/ui/useModal";

import useToast
    from "../hooks/ui/useToast";

import usePagination
    from "../hooks/ui/usePagination";

import SupplierHeader
    from "../components/supplier/SupplierHeader";

import SupplierKPIs
    from "../components/supplier/SupplierKPIs";

import SupplierAnalytics
    from "../components/supplier/SupplierAnalytics";

import SupplierTable
    from "../components/supplier/SupplierTable";

import SupplierInsights
    from "../components/supplier/SupplierInsights";

import AddSupplierModal
    from "../components/supplier/AddSupplierModal";

import Toast
    from "../components/common/Toast";

// ====================================
// COMPONENT
// ====================================

const SupplierIntelligence = () => {

    const {
        theme
    } = useTheme();

    // ====================================
    // BUSINESS STATE
    // ====================================

    const {
        data: suppliers,
        analytics,
        loading,
        error,
        actions,
        mutation
    } = useSuppliers();

    // ====================================
    // UI HOOKS
    // ====================================

    const supplierModal =
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

    const filteredSuppliers =
        useMemo(() => {

            const term =
                search
                    .trim()
                    .toLowerCase();

            if (!term) {
                return suppliers;
            }

            return suppliers.filter(
                supplier =>
                    supplier.supplierName
                        ?.toLowerCase()
                        .includes(term)
            );

        }, [
            suppliers,
            search
        ]);

    // ====================================
    // PAGINATION
    // ====================================

    const pagination =
        usePagination(
            filteredSuppliers,
            10
        );

    // ====================================
    // ADD SUPPLIER
    // ====================================

    const handleAddSupplier =
        async supplier => {

            try {

                await actions.createSupplier(
                    supplier
                );

                supplierModal.reset();

                toast.success(
                    "Supplier Created",
                    "Supplier created successfully."
                );

            } catch (operationError) {

                console.error(
                    "Supplier creation failed:",
                    operationError
                );

                toast.error(
                    "Supplier Creation Failed",
                    operationError?.message ||
                    "Unable to create supplier."
                );

            }

        };

    // ====================================
    // DELETE SUPPLIER
    // ====================================

    const handleDeleteSupplier =
        async id => {

            const confirmed =
                window.confirm(
                    "Delete this supplier?"
                );

            if (!confirmed) {
                return;
            }

            try {

                await actions.deleteSupplier(
                    id
                );

                toast.success(
                    "Supplier Deleted",
                    "Supplier deleted successfully."
                );

            } catch (operationError) {

                console.error(
                    "Supplier deletion failed:",
                    operationError
                );

                toast.error(
                    "Supplier Deletion Failed",
                    operationError?.message ||
                    "Unable to delete supplier."
                );

            }

        };

    // ====================================
    // RENDER
    // ====================================

    return (

        <div>

            {/* ==================================
                PAGE HEADER
                ================================== */}

            <SupplierHeader
                onAddSupplier={
                    supplierModal.open
                }
            />

            {/* ==================================
                KPI SECTION
                ================================== */}

            <section
                style={{
                    marginTop: "24px"
                }}
            >

                <SupplierKPIs
                    analytics={analytics}
                    suppliers={suppliers}
                />

            </section>

            {/* ==================================
                ANALYTICS SECTION
                ================================== */}

            <section
                style={{
                    marginTop: "24px"
                }}
            >

                <SupplierAnalytics
                    analytics={analytics}
                />

            </section>

            {/* ==================================
                SUPPLIER DIRECTORY
                ================================== */}

            <section
                style={{
                    marginTop: "24px"
                }}
            >

                <SupplierTable
                    suppliers={
                        pagination.data
                    }
                    search={search}
                    setSearch={
                        value =>
                            setSearch(value)
                    }
                    onDelete={
                        handleDeleteSupplier
                    }
                    loading={loading}
                    error={error}
                    isDeleting={
                        mutation.isDeleting
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

            </section>

            {/* ==================================
                INSIGHTS
                ================================== */}

            <section
                style={{
                    marginTop: "24px"
                }}
            >

                <SupplierInsights
                    suppliers={
                        suppliers
                    }
                />

            </section>

            {/* ==================================
                ADD SUPPLIER MODAL
                ================================== */}

            <AddSupplierModal
                isOpen={
                    supplierModal.isOpen
                }
                onClose={
                    supplierModal.reset
                }
                onSave={
                    handleAddSupplier
                }
                isLoading={
                    mutation.isCreating
                }
            />

            {/* ==================================
                TOAST
                ================================== */}

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
                theme={theme}
                onClose={
                    toast.hide
                }
            />

        </div>

    );

};

export default SupplierIntelligence;