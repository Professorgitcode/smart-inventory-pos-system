import React from "react";

import {
    Minus,
    Plus,
    ShoppingCart,
    Trash2
} from "lucide-react";

import {
    Badge,
    Button,
    Card,
    EmptyState
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// CART PANEL
// ====================================

const CartPanel = ({
    cart = [],
    onUpdateQuantity,
    onRemoveItem,
    subtotal = 0,
    tax = 0,
    total = 0,
    onCheckout
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    return (

        <Card
            variant="glass"
            isDark={isDark}
            padding="md"
            style={{
                position: "sticky",
                top: "20px",
                height:
                    "calc(100vh - 190px)",
                minHeight: "520px",
                display: "flex",
                flexDirection: "column"
            }}
        >

            {/* ====================================
                HEADER
                ==================================== */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                        "space-between",
                    paddingBottom: theme.spacing.md,
                    borderBottom:
                        `1px solid ${theme.colors.border}`
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >

                    <ShoppingCart
                        size={18}
                        color={
                            theme.colors.primary
                        }
                    />

                    <span
                        style={{
                            fontWeight:
                                theme.typography
                                    .fontWeight.bold,
                            color:
                                theme.colors.text
                        }}
                    >
                        Current Cart
                    </span>

                </div>

                <Badge
                    variant="primary"
                    isDark={isDark}
                >
                    {cart.length} items
                </Badge>

            </div>

            {/* ====================================
                ITEMS
                ==================================== */}

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding:
                        `${theme.spacing.md} 0`
                }}
            >

                {cart.length === 0 ? (

                    <EmptyState
                        icon={ShoppingCart}
                        isDark={isDark}
                        title="Cart is empty"
                        description={
                            "Select products from the catalogue to begin a transaction."
                        }
                    />

                ) : (

                    <div
                        style={{
                            display: "flex",
                            flexDirection:
                                "column",
                            gap: "14px"
                        }}
                    >

                        {cart.map(
                            item => (

                                <div
                                    key={item.id}
                                    style={{
                                        paddingBottom:
                                            "14px",
                                        borderBottom:
                                            `1px solid ${theme.colors.border}`
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            gap: "12px"
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
                                                    marginTop: "3px",
                                                    fontSize:
                                                        theme.typography
                                                            .fontSize.xs,
                                                    color:
                                                        theme.colors.textMuted
                                                }}
                                            >
                                                $
                                                {Number(
                                                    item.price ||
                                                    0
                                                ).toFixed(2)}
                                                {" × "}
                                                {item.quantity}
                                            </div>

                                        </div>

                                        <span
                                            style={{
                                                color:
                                                    theme.colors.text,
                                                fontWeight:
                                                    theme.typography
                                                        .fontWeight.semibold,
                                                whiteSpace:
                                                    "nowrap"
                                            }}
                                        >
                                            $
                                            {(
                                                Number(
                                                    item.price || 0
                                                ) *
                                                Number(
                                                    item.quantity || 0
                                                )
                                            ).toFixed(2)}
                                        </span>

                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "space-between",
                                            marginTop:
                                                "10px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems:
                                                    "center",
                                                gap: "4px"
                                            }}
                                        >

                                            <Button
                                                variant="icon"
                                                size="sm"
                                                isDark={isDark}
                                                icon={Minus}
                                                disabled={
                                                    item.quantity <= 1
                                                }
                                                onClick={() =>
                                                    onUpdateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                aria-label={
                                                    `Decrease quantity of ${item.name}`
                                                }
                                            />

                                            <span
                                                style={{
                                                    minWidth:
                                                        "28px",
                                                    textAlign:
                                                        "center",
                                                    color:
                                                        theme.colors.text,
                                                    fontWeight:
                                                        600
                                                }}
                                            >
                                                {item.quantity}
                                            </span>

                                            <Button
                                                variant="icon"
                                                size="sm"
                                                isDark={isDark}
                                                icon={Plus}
                                                disabled={
                                                    item.quantity >=
                                                    item.stockQuantity
                                                }
                                                onClick={() =>
                                                    onUpdateQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                aria-label={
                                                    `Increase quantity of ${item.name}`
                                                }
                                            />

                                        </div>

                                        <Button
                                            variant="icon"
                                            size="sm"
                                            isDark={isDark}
                                            icon={Trash2}
                                            onClick={() =>
                                                onRemoveItem(
                                                    item.id
                                                )
                                            }
                                            aria-label={
                                                `Remove ${item.name} from cart`
                                            }
                                            style={{
                                                color:
                                                    theme.colors.danger
                                            }}
                                        />

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

            {/* ====================================
                SUMMARY
                ==================================== */}

            <div
                style={{
                    paddingTop: theme.spacing.md,
                    borderTop:
                        `1px solid ${theme.colors.border}`
                }}
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        fontSize:
                            theme.typography
                                .fontSize.sm
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between"
                        }}
                    >
                        <span
                            style={{
                                color:
                                    theme.colors.textMuted
                            }}
                        >
                            Subtotal
                        </span>

                        <span>
                            ${subtotal.toFixed(2)}
                        </span>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between"
                        }}
                    >
                        <span
                            style={{
                                color:
                                    theme.colors.textMuted
                            }}
                        >
                            Tax
                        </span>

                        <span>
                            ${tax.toFixed(2)}
                        </span>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            marginTop: "8px",
                            paddingTop: "12px",
                            borderTop:
                                `1px dashed ${theme.colors.border}`,
                            fontSize:
                                theme.typography
                                    .fontSize.md,
                            fontWeight:
                                theme.typography
                                    .fontWeight.bold
                        }}
                    >

                        <span>Total</span>

                        <span
                            style={{
                                color:
                                    theme.colors.primary
                            }}
                        >
                            ${total.toFixed(2)}
                        </span>

                    </div>

                </div>

                <Button
                    variant="primary"
                    size="lg"
                    isDark={isDark}
                    disabled={
                        cart.length === 0
                    }
                    onClick={onCheckout}
                    style={{
                        width: "100%",
                        marginTop: theme.spacing.md
                    }}
                >
                    Checkout
                </Button>

            </div>

        </Card>

    );

};

export default CartPanel;
