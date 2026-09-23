import React, {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Banknote,
    CheckCircle2,
    CreditCard,
    DollarSign,
    Receipt,
    Smartphone,
    User,
    WalletCards
} from "lucide-react";

import {
    Badge,
    Button,
    Card,
    Input,
    Modal,
    Select,
    TextArea
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// INITIAL FORM
// ====================================

const INITIAL_FORM = {
    customerName: "",
    receivedAmount: "",
    paymentMethod: "Cash",
    notes: ""
};

// ====================================
// PAYMENT METHODS
// ====================================

const PAYMENT_METHODS = [
    {
        value: "Cash",
        label: "Cash"
    },
    {
        value: "EcoCash",
        label: "EcoCash"
    },
    {
        value: "Bank Card",
        label: "Bank Card"
    },
    {
        value: "Mobile Money",
        label: "Mobile Money"
    },
    {
        value: "Other",
        label: "Other"
    }
];

// ====================================
// FORMAT CURRENCY
// ====================================

const formatCurrency = (
    value
) => {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD"
        }
    ).format(
        Number(value) || 0
    );

};

// ====================================
// COMPONENT
// ====================================

const CreatePaymentModal = ({
    isOpen,
    onClose,
    onConfirmPayment,
    cartItems = [],
    subtotal = 0,
    tax = 0,
    totalAmount = 0,
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
        INITIAL_FORM
    );

    const [
        error,
        setError
    ] = useState("");

    // ====================================
    // RESET FORM
    // ====================================

    const resetForm =
        useCallback(() => {

            setForm({
                ...INITIAL_FORM,
                receivedAmount:
                    Number(totalAmount)
                        .toFixed(2)
            });

            setError("");

        }, [
            totalAmount
        ]);

    // ====================================
    // INITIALIZE
    // ====================================

    useEffect(() => {

        if (isOpen) {
            resetForm();
        }

    }, [
        isOpen,
        resetForm
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

        setError("");

    };

    // ====================================
    // CALCULATED PAYMENT VALUES
    // ====================================

    const receivedAmount =
        Number(
            form.receivedAmount
        ) || 0;

    const change =
        Math.max(
            0,
            receivedAmount -
                Number(totalAmount)
        );

    const isInsufficient =
        receivedAmount <
        Number(totalAmount);

    const itemCount =
        useMemo(
            () =>
                cartItems.reduce(
                    (
                        count,
                        item
                    ) =>
                        count +
                        Number(
                            item.quantity || 0
                        ),
                    0
                ),
            [cartItems]
        );

    // ====================================
    // VALIDATION
    // ====================================

    const validate = () => {

        if (
            cartItems.length === 0
        ) {

            setError(
                "There are no items in the cart."
            );

            return false;

        }

        if (
            !Number.isFinite(
                receivedAmount
            ) ||
            receivedAmount <
                Number(totalAmount)
        ) {

            setError(
                "The amount received must cover the total payable amount."
            );

            return false;

        }

        return true;

    };

    // ====================================
    // CONFIRM PAYMENT
    // ====================================

    const handleSubmit =
        async event => {

            event.preventDefault();

            if (!validate()) {
                return;
            }

            const paymentData = {

                orderDate:
                    new Date().toISOString(),

                customer:
                    form.customerName.trim() ||
                    "Walk-in Customer",

                items:
                    cartItems,

                financials: {

                    subtotal:
                        Number(subtotal) || 0,

                    discount:
                        0,

                    tax:
                        Number(tax) || 0,

                    finalPayable:
                        Number(totalAmount) || 0,

                    received:
                        receivedAmount,

                    change

                },

                paymentMethod:
                    form.paymentMethod,

                notes:
                    form.notes.trim()

            };

            try {

                await onConfirmPayment(
                    paymentData
                );

            } catch (submissionError) {

                setError(
                    submissionError?.message ||
                    "Unable to complete the transaction."
                );

            }

        };

    // ====================================
    // SUMMARY ROW
    // ====================================

    const SummaryRow = ({
        label,
        value,
        emphasis = false
    }) => (

        <div
            style={{
                display: "flex",
                justifyContent:
                    "space-between",
                alignItems: "center",
                gap: theme.spacing.sm,
                padding:
                    emphasis
                        ? `${theme.spacing.sm} 0`
                        : "4px 0",
                borderTop:
                    emphasis
                        ? `1px dashed ${theme.colors.border}`
                        : "none"
            }}
        >

            <span
                style={{
                    color:
                        emphasis
                            ? theme.colors.text
                            : theme.colors.textMuted,
                    fontSize:
                        theme.typography.fontSize.sm,
                    fontWeight:
                        emphasis
                            ? theme.typography
                                .fontWeight.bold
                            : theme.typography
                                .fontWeight.medium
                }}
            >
                {label}
            </span>

            <span
                style={{
                    color:
                        emphasis
                            ? theme.colors.primary
                            : theme.colors.text,
                    fontSize:
                        emphasis
                            ? theme.typography
                                .fontSize.md
                            : theme.typography
                                .fontSize.sm,
                    fontWeight:
                        theme.typography
                            .fontWeight.bold
                }}
            >
                {value}
            </span>

        </div>

    );

    // ====================================
    // FOOTER
    // ====================================

    const footer = (

        <>

            <Button
                type="button"
                variant="outline"
                isDark={isDark}
                disabled={isSaving}
                onClick={onClose}
            >
                Cancel
            </Button>

            <Button
                type="submit"
                form="payment-form"
                variant="primary"
                isDark={isDark}
                isLoading={isSaving}
                disabled={
                    isSaving ||
                    cartItems.length === 0 ||
                    isInsufficient
                }
                icon={CheckCircle2}
            >
                Confirm Payment
            </Button>

        </>

    );

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
            title="Complete Transaction"
            size="lg"
            isDark={isDark}
            closeOnOverlayClick={
                !isSaving
            }
            footer={footer}
        >

            <form
                id="payment-form"
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
                        justifyContent:
                            "space-between",
                        gap: theme.spacing.md,
                        padding: theme.spacing.md,
                        marginBottom:
                            theme.spacing.lg,
                        borderRadius:
                            theme.radius.lg,
                        border:
                            `1px solid ${theme.colors.border}`,
                        backgroundColor:
                            theme.colors.surfaceGlass
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.sm
                        }}
                    >

                        <div
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius:
                                    theme.radius.md,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor:
                                    isDark
                                        ? "rgba(131,135,195,0.14)"
                                        : "rgba(52,114,156,0.09)",
                                color:
                                    theme.colors.primary,
                                flexShrink: 0
                            }}
                        >
                            <Receipt size={21} />
                        </div>

                        <div>

                            <div
                                style={{
                                    color:
                                        theme.colors.text,
                                    fontWeight:
                                        theme.typography
                                            .fontWeight.bold,
                                    fontSize:
                                        theme.typography
                                            .fontSize.sm
                                }}
                            >
                                Review transaction
                            </div>

                            <div
                                style={{
                                    marginTop: "3px",
                                    color:
                                        theme.colors.textMuted,
                                    fontSize:
                                        theme.typography
                                            .fontSize.xs
                                }}
                            >
                                Verify payment details
                                before completing the sale.
                            </div>

                        </div>

                    </div>

                    <Badge
                        variant="primary"
                        isDark={isDark}
                    >
                        {itemCount} item
                        {itemCount === 1
                            ? ""
                            : "s"}
                    </Badge>

                </div>

                {/* ====================================
                    MAIN GRID
                    ==================================== */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "minmax(0, 1.35fr) minmax(260px, 0.65fr)",
                        gap: theme.spacing.lg,
                        alignItems: "start"
                    }}
                >

                    {/* ====================================
                        PAYMENT FORM
                        ==================================== */}

                    <Card
                        variant="flat"
                        isDark={isDark}
                        padding="md"
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: theme.spacing.xs,
                                marginBottom:
                                    theme.spacing.md
                            }}
                        >

                            <WalletCards
                                size={17}
                                color={
                                    theme.colors.primary
                                }
                            />

                            <h3
                                style={{
                                    margin: 0,
                                    color:
                                        theme.colors.text,
                                    fontSize:
                                        theme.typography
                                            .fontSize.sm,
                                    fontWeight:
                                        theme.typography
                                            .fontWeight.bold
                                }}
                            >
                                Payment details
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
                                label="Customer Name"
                                placeholder="Walk-in Customer"
                                value={
                                    form.customerName
                                }
                                onChange={event =>
                                    updateField(
                                        "customerName",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                isDark={isDark}
                                icon={User}
                            />

                            <Select
                                label="Payment Method"
                                options={
                                    PAYMENT_METHODS
                                }
                                value={
                                    form.paymentMethod
                                }
                                onChange={event =>
                                    updateField(
                                        "paymentMethod",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                isDark={isDark}
                            />

                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(2, minmax(0, 1fr))",
                                gap: theme.spacing.md,
                                marginTop:
                                    theme.spacing.md
                            }}
                        >

                            <Input
                                label="Amount Due"
                                value={
                                    Number(
                                        totalAmount
                                    ).toFixed(2)
                                }
                                disabled
                                isDark={isDark}
                                icon={DollarSign}
                            />

                            <Input
                                label="Amount Received"
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    form.receivedAmount
                                }
                                onChange={event =>
                                    updateField(
                                        "receivedAmount",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                isDark={isDark}
                                icon={Banknote}
                                errorText={
                                    error ||
                                    (
                                        form.receivedAmount &&
                                        isInsufficient
                                            ? "Insufficient payment."
                                            : ""
                                    )
                                }
                            />

                        </div>

                        <div
                            style={{
                                marginTop:
                                    theme.spacing.md
                            }}
                        >

                            <TextArea
                                label="Transaction Notes"
                                rows={4}
                                placeholder="Optional notes for this transaction..."
                                value={
                                    form.notes
                                }
                                onChange={event =>
                                    updateField(
                                        "notes",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                isDark={isDark}
                            />

                        </div>

                        {/* ====================================
                            CHANGE CARD
                            ==================================== */}

                        <div
                            style={{
                                marginTop:
                                    theme.spacing.md,
                                padding:
                                    theme.spacing.md,
                                borderRadius:
                                    theme.radius.lg,
                                border:
                                    `1px solid ${isInsufficient
                                        ? theme.colors.danger
                                        : theme.colors.border}`,
                                backgroundColor:
                                    isInsufficient
                                        ? theme.colors.dangerBg
                                        : theme.colors.surfaceGlass
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: theme.spacing.xs
                                }}
                            >

                                <CreditCard
                                    size={17}
                                    color={
                                        isInsufficient
                                            ? theme.colors.danger
                                            : theme.colors.primary
                                    }
                                />

                                <span
                                    style={{
                                        fontSize:
                                            theme.typography
                                                .fontSize.xs,
                                        fontWeight:
                                            theme.typography
                                                .fontWeight.semibold,
                                        color:
                                            theme.colors.textMuted
                                    }}
                                >
                                    Change to return
                                </span>

                            </div>

                            <div
                                style={{
                                    marginTop: "4px",
                                    fontSize:
                                        "1.65rem",
                                    fontWeight:
                                        theme.typography
                                            .fontWeight.extrabold,
                                    color:
                                        isInsufficient
                                            ? theme.colors.danger
                                            : theme.colors.primary
                                }}
                            >
                                {formatCurrency(
                                    change
                                )}
                            </div>

                            {isInsufficient && (

                                <div
                                    style={{
                                        marginTop: "4px",
                                        fontSize:
                                            theme.typography
                                                .fontSize.xs,
                                        color:
                                            theme.colors.danger
                                    }}
                                >
                                    Receive at least{" "}
                                    {formatCurrency(
                                        totalAmount
                                    )} to complete this sale.
                                </div>

                            )}

                        </div>

                    </Card>

                    {/* ====================================
                        ORDER SUMMARY
                        ==================================== */}

                    <Card
                        variant="glass"
                        isDark={isDark}
                        padding="md"
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: theme.spacing.xs,
                                marginBottom:
                                    theme.spacing.md
                            }}
                        >

                            <Receipt
                                size={17}
                                color={
                                    theme.colors.primary
                                }
                            />

                            <h3
                                style={{
                                    margin: 0,
                                    color:
                                        theme.colors.text,
                                    fontSize:
                                        theme.typography
                                            .fontSize.sm,
                                    fontWeight:
                                        theme.typography
                                            .fontWeight.bold
                                }}
                            >
                                Order summary
                            </h3>

                        </div>

                        {/* ====================================
                            ITEM PREVIEW
                            ==================================== */}

                        <div
                            style={{
                                display: "flex",
                                flexDirection:
                                    "column",
                                gap: "10px",
                                maxHeight: "220px",
                                overflowY: "auto",
                                marginBottom:
                                    theme.spacing.md
                            }}
                        >

                            {cartItems.map(
                                item => (

                                    <div
                                        key={
                                            item.id
                                        }
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            gap:
                                                theme.spacing.sm,
                                            paddingBottom:
                                                "10px",
                                            borderBottom:
                                                `1px solid ${theme.colors.border}`
                                        }}
                                    >

                                        <div
                                            style={{
                                                minWidth: 0
                                            }}
                                        >

                                            <div
                                                style={{
                                                    color:
                                                        theme.colors.text,
                                                    fontWeight:
                                                        theme.typography
                                                            .fontWeight.semibold,
                                                    fontSize:
                                                        theme.typography
                                                            .fontSize.xs,
                                                    overflow:
                                                        "hidden",
                                                    textOverflow:
                                                        "ellipsis",
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {item.name}
                                            </div>

                                            <div
                                                style={{
                                                    marginTop: "2px",
                                                    color:
                                                        theme.colors.textMuted,
                                                    fontSize:
                                                        "11px"
                                                }}
                                            >
                                                {item.quantity}
                                                {" × "}
                                                {formatCurrency(
                                                    item.price
                                                )}
                                            </div>

                                        </div>

                                        <span
                                            style={{
                                                color:
                                                    theme.colors.text,
                                                fontWeight:
                                                    theme.typography
                                                        .fontWeight.semibold,
                                                fontSize:
                                                    theme.typography
                                                        .fontSize.xs,
                                                whiteSpace:
                                                    "nowrap"
                                            }}
                                        >
                                            {formatCurrency(
                                                Number(
                                                    item.price
                                                ) *
                                                Number(
                                                    item.quantity
                                                )
                                            )}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                        {/* ====================================
                            FINANCIAL SUMMARY
                            ==================================== */}

                        <SummaryRow
                            label="Subtotal"
                            value={
                                formatCurrency(
                                    subtotal
                                )
                            }
                        />

                        <SummaryRow
                            label="Tax"
                            value={
                                formatCurrency(
                                    tax
                                )
                            }
                        />

                        <SummaryRow
                            label="Total due"
                            value={
                                formatCurrency(
                                    totalAmount
                                )
                            }
                            emphasis
                        />

                        <div
                            style={{
                                marginTop:
                                    theme.spacing.md,
                                padding:
                                    theme.spacing.md,
                                borderRadius:
                                    theme.radius.lg,
                                backgroundColor:
                                    isDark
                                        ? "rgba(131,135,195,0.10)"
                                        : "rgba(52,114,156,0.07)"
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: theme.spacing.xs
                                }}
                            >

                                <Smartphone
                                    size={16}
                                    color={
                                        theme.colors.primary
                                    }
                                />

                                <span
                                    style={{
                                        color:
                                            theme.colors.textMuted,
                                        fontSize:
                                            theme.typography
                                                .fontSize.xs
                                    }}
                                >
                                    Payment method
                                </span>

                            </div>

                            <div
                                style={{
                                    marginTop: "4px",
                                    color:
                                        theme.colors.text,
                                    fontWeight:
                                        theme.typography
                                            .fontWeight.bold,
                                    fontSize:
                                        theme.typography
                                            .fontSize.sm
                                }}
                            >
                                {form.paymentMethod}
                            </div>

                        </div>

                    </Card>

                </div>

            </form>

        </Modal>

    );

};

export default CreatePaymentModal;
