import React, {
    useEffect,
    useState
} from "react";

import {
    DollarSign,
    Layers3,
    Package,
} from "lucide-react";

import {
    Button,
    Input,
    Modal
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// INITIAL FORM
// ====================================

const EMPTY_FORM = {
    name: "",
    price: "",
    stockQuantity: ""
};

// ====================================
// COMPONENT
// ====================================

const ProductModal = ({
    isOpen,
    mode = "add",
    initialData = null,
    onClose,
    onSave,
    isSaving = false
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const [
        form,
        setForm
    ] = useState(
        EMPTY_FORM
    );

    const [
        errors,
        setErrors
    ] = useState({});

    // ====================================
    // INITIALIZE FORM
    // ====================================

    useEffect(() => {

        if (
            mode === "edit" &&
            initialData
        ) {

            setForm({
                name:
                    initialData.name || "",
                price:
                    initialData.price ?? "",
                stockQuantity:
                    initialData.stockQuantity ?? ""
            });

        } else {

            setForm(
                EMPTY_FORM
            );

        }

        setErrors({});

    }, [
        isOpen,
        mode,
        initialData
    ]);

    // ====================================
    // UPDATE FIELD
    // ====================================

    const updateField = (
        field,
        value
    ) => {

        setForm(
            previous => ({
                ...previous,
                [field]: value
            })
        );

        setErrors(
            previous => ({
                ...previous,
                [field]: ""
            })
        );

    };

    // ====================================
    // VALIDATE
    // ====================================

    const validate = () => {

        const nextErrors = {};

        const name =
            form.name.trim();

        const price =
            Number(form.price);

        const stockQuantity =
            Number(form.stockQuantity);

        if (!name) {

            nextErrors.name =
                "Product name is required.";

        }

        if (
            form.price === "" ||
            !Number.isFinite(price) ||
            price < 0
        ) {

            nextErrors.price =
                "Enter a valid price of 0 or more.";

        }

        if (
            form.stockQuantity === "" ||
            !Number.isInteger(
                stockQuantity
            ) ||
            stockQuantity < 0
        ) {

            nextErrors.stockQuantity =
                "Enter a whole-number quantity of 0 or more.";

        }

        setErrors(
            nextErrors
        );

        return Object.keys(
            nextErrors
        ).length === 0;

    };

    // ====================================
    // SUBMIT
    // ====================================

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        if (!validate()) {
            return;
        }

        await onSave({

            name:
                form.name.trim(),

            price:
                Number(form.price),

            stockQuantity:
                Number(form.stockQuantity)

        });

    };

    // ====================================
    // RENDER
    // ====================================

    return (

        <Modal
            isOpen={isOpen}
            onClose={
                isSaving
                    ? undefined
                    : onClose
            }
            title={
                mode === "edit"
                    ? "Edit Product"
                    : "Add Product"
            }
            size="md"
            isDark={isDark}
            closeOnOverlayClick={
                !isSaving
            }
        >

            <form
                onSubmit={
                    handleSubmit
                }
            >

                {/* ====================================
                    INTRO
                    ==================================== */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: theme.spacing.sm,
                        marginBottom: theme.spacing.xl,
                        padding: theme.spacing.md,
                        borderRadius: theme.radius.lg,
                        border:
                            `1px solid ${theme.colors.border}`,
                        background:
                            isDark
                                ? "rgba(255,255,255,0.025)"
                                : "rgba(255,255,255,0.38)"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "38px",
                            height: "38px",
                            borderRadius: theme.radius.md,
                            backgroundColor:
                                isDark
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(52,114,156,0.08)",
                            color:
                                theme.colors.primary,
                            flexShrink: 0
                        }}
                    >
                        <Package size={19} />
                    </div>

                    <div>

                        <div
                            style={{
                                fontSize:
                                    theme.typography
                                        .fontSize.sm,
                                fontWeight:
                                    theme.typography
                                        .fontWeight.semibold,
                                color:
                                    theme.colors.text
                            }}
                        >
                            Product information
                        </div>

                        <div
                            style={{
                                marginTop: "3px",
                                fontSize:
                                    theme.typography
                                        .fontSize.xs,
                                color:
                                    theme.colors.textMuted
                            }}
                        >
                            Maintain the core catalogue
                            information used by the
                            inventory system.
                        </div>

                    </div>

                </div>

                {/* ====================================
                    BASIC INFORMATION
                    ==================================== */}

                <section
                    style={{
                        marginBottom: theme.spacing.xl
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.xs,
                            marginBottom: theme.spacing.md
                        }}
                    >

                        <Layers3
                            size={17}
                            color={
                                theme.colors.primary
                            }
                        />

                        <h3
                            style={{
                                margin: 0,
                                fontSize:
                                    theme.typography
                                        .fontSize.sm,
                                fontWeight:
                                    theme.typography
                                        .fontWeight.bold,
                                color:
                                    theme.colors.text
                            }}
                        >
                            Basic information
                        </h3>

                    </div>

                    <Input
                        label="Product Name"
                        placeholder="e.g. Wireless Mouse"
                        value={form.name}
                        onChange={(event) =>
                            updateField(
                                "name",
                                event.target.value
                            )
                        }
                        errorText={
                            errors.name
                        }
                        disabled={
                            isSaving
                        }
                        isDark={isDark}
                        icon={Package}
                    />

                </section>

                {/* ====================================
                    PRICING / INVENTORY
                    ==================================== */}

                <section>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.xs,
                            marginBottom: theme.spacing.md
                        }}
                    >

                        <DollarSign
                            size={17}
                            color={
                                theme.colors.primary
                            }
                        />

                        <h3
                            style={{
                                margin: 0,
                                fontSize:
                                    theme.typography
                                        .fontSize.sm,
                                fontWeight:
                                    theme.typography
                                        .fontWeight.bold,
                                color:
                                    theme.colors.text
                            }}
                        >
                            Pricing & inventory
                        </h3>

                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(2, minmax(0, 1fr))",
                            gap: theme.spacing.md
                        }}
                    >

                        <Input
                            label="Selling Price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={form.price}
                            onChange={(event) =>
                                updateField(
                                    "price",
                                    event.target.value
                                )
                            }
                            errorText={
                                errors.price
                            }
                            disabled={
                                isSaving
                            }
                            isDark={isDark}
                            icon={DollarSign}
                        />

                        <Input
                            label="Stock Quantity"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="0"
                            value={
                                form.stockQuantity
                            }
                            onChange={(event) =>
                                updateField(
                                    "stockQuantity",
                                    event.target.value
                                )
                            }
                            errorText={
                                errors.stockQuantity
                            }
                            disabled={
                                isSaving
                            }
                            isDark={isDark}
                            icon={Layers3}
                        />

                    </div>

                </section>

                {/* ====================================
                    FUTURE DOMAIN EXTENSIONS
                    ==================================== */}

                <div
                    style={{
                        marginTop: theme.spacing.xl,
                        padding: theme.spacing.md,
                        borderRadius: theme.radius.lg,
                        border:
                            `1px solid ${theme.colors.border}`,
                        backgroundColor:
                            isDark
                                ? "rgba(255,255,255,0.02)"
                                : "rgba(52,114,156,0.025)"
                    }}
                >

                    <div
                        style={{
                            fontSize:
                                theme.typography
                                    .fontSize.xs,
                            fontWeight:
                                theme.typography
                                    .fontWeight.semibold,
                            color:
                                theme.colors.text
                        }}
                    >
                        More product attributes
                    </div>

                    <div
                        style={{
                            marginTop: "4px",
                            fontSize:
                                theme.typography
                                    .fontSize.xs,
                            lineHeight:
                                theme.typography
                                    .lineHeight.normal,
                            color:
                                theme.colors.textMuted
                        }}
                    >
                        Category, SKU, barcode, brand,
                        supplier, cost price and reorder
                        controls can be introduced when
                        the Product domain and API are
                        expanded.
                    </div>

                </div>

                {/* ====================================
                    FOOTER
                    ==================================== */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: theme.spacing.sm,
                        marginTop: theme.spacing.xl
                    }}
                >

                    <Button
                        type="button"
                        variant="outline"
                        isDark={isDark}
                        disabled={
                            isSaving
                        }
                        onClick={
                            onClose
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary"
                        isDark={isDark}
                        isLoading={
                            isSaving
                        }
                    >
                        {mode === "edit"
                            ? "Update Product"
                            : "Save Product"}
                    </Button>

                </div>

            </form>

        </Modal>

    );

};

export default ProductModal;
