import React, { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import Toast from "../components/Toast";
import CreatePaymentModal from "../components/CreatePaymentModal";
import ReceiptModal from "../components/ReceiptModal";


const POS = ({ theme }) => {
  const PRODUCT_API = "http://localhost:5216/api/products";
  const ORDER_API = "http://localhost:5216/api/orders";

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

   // Receipt states
  const [paymentData, setPaymentData] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState(null);


  // ================= TOAST STATE =================
 const [toast, setToast] = useState({
  isVisible: false,
  header: "",
  message: "",
  type: "info"
});

  const triggerToast = (
  header,
  message,
  type = "info"
) => {
  setToast({
    isVisible: false,
    header,
    message,
    type
  });

  setTimeout(() => {
    setToast({
      isVisible: true,
      header,
      message,
      type
    });
  }, 10);
};

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);

    } catch (error) {
      console.error(error);
      triggerToast(
  "Fetch Error",
  "Failed to load products from server.",
  "error"
);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= ADD TO CART =================
  const addToCart = (product) => {
    if (product.stockQuantity <= 0) {
      triggerToast(
        "Out of Stock",
        "Product is unavailable.",
        "error"
      );
      return;
    }

    const existingItem = cart.find(
      item => item.id === product.id
    );

    if (existingItem) {
      if (existingItem.quantity >= product.stockQuantity) {
        triggerToast(
  "Stock Limit",
  "Cannot exceed available stock quantity.",
  "error"
);
        return;
      }

      setCart(
        cart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      );

      triggerToast(
        `${product.name} quantity updated`,
        "info"
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

     triggerToast(
  "Cart Updated",
  `${product.name} added successfully.`,
  "success"
);;
    }
  };

  // ================= INCREASE QTY =================
  const increaseQty = (id) => {
    const item = cart.find(i => i.id === id);

    if (!item) return;

    if (item.quantity >= item.stockQuantity) {
      triggerToast(
  "Stock Limit",
  "Cannot exceed available stock quantity.",
  "error"
);
      return;
    }

    setCart(
      cart.map(i =>
        i.id === id
          ? {
              ...i,
              quantity: i.quantity + 1
            }
          : i
      )
    );
  };

  // ================= DECREASE QTY =================
  const decreaseQty = (id) => {
    const item = cart.find(i => i.id === id);

    if (!item) return;

    if (item.quantity === 1) {
      setCart(
        cart.filter(i => i.id !== id)
      );

      triggerToast(
  "Item Removed",
  `${item.name} removed from cart.`,
  "info"
);
    } else {
      setCart(
        cart.map(i =>
          i.id === id
            ? {
                ...i,
                quantity: i.quantity - 1
              }
            : i
        )
      );
    }
  };

  // ================= TOTAL =================
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // ================= OPEN PAYMENT MODAL =================
  const handleCheckout = () => {
    if (cart.length === 0) {
     triggerToast(
  "Empty Cart",
  "Add products before checkout.",
  "error"
);
      return;
    }

    setIsPaymentModalOpen(true);
  };

  // ================= FINAL PAYMENT CONFIRM =================
  const handlePaymentConfirm = async (paymentInfo) => {
    const orderData = {
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    try {
      const res = await fetch(ORDER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        const responseData = await res.json();

        setGeneratedOrderId(
          responseData.orderId || responseData.id
        );

        setPaymentData(paymentInfo);

        setShowReceipt(true);

        setIsPaymentModalOpen(false);

        fetchProducts();

        triggerToast(
          "Payment Successful",
          `Payment completed for ${paymentInfo.customer}`,
          "success"
        );

      } else {
        const err = await res.text();

        triggerToast(
          "Checkout Failed",
          err || "Order processing failed.",
          "error"
        );
      }

    } catch (error) {
      console.error(error);

      triggerToast(
        "Server Error",
        "Checkout failed due to server issue.",
        "error"
      );
    }
  };

  // ================= RECEIPT CLOSE =================
  const handleReceiptClose = () => {
    setShowReceipt(false);
    setPaymentData(null);
    setGeneratedOrderId(null);

    // clear cart only after receipt finishes
    setCart([]);

    triggerToast(
      "Transaction Completed",
      "Receipt printed successfully.",
      "success"
    );
  };

  return (
    <>
      {/* TOAST */}
      <Toast
  header={toast.header}
  message={toast.message}
  type={toast.type}
  isVisible={toast.isVisible}
  theme={theme}
  onClose={() =>
    setToast(prev => ({
      ...prev,
      isVisible: false
    }))
  }
/>

      <div
        style={{
          display: "flex",
          gap: "24px",
          height: "100%"
        }}
      >
        {/* LEFT SIDE PRODUCTS */}
        <div style={{ flex: 2 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "16px"
            }}
          >
            {products.map(product => (
              <div
                key={product.id}
                style={{
                  backgroundColor: theme.surface,
                  padding: "16px",
                  borderRadius: "12px",
                  border: `1px solid ${theme.border}`,
                  textAlign: "center"
                }}
              >
                {/* Product image placeholder */}
                <div
                  style={{
                    height: "100px",
                    backgroundColor: theme.bg,
                    borderRadius: "8px",
                    marginBottom: "12px"
                  }}
                />

                <div style={{ fontWeight: "700" }}>
                  {product.name}
                </div>

                <div
                  style={{
                    color: theme.primary,
                    fontWeight: "800"
                  }}
                >
                  ${product.price}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: theme.muted,
                    marginBottom: "10px"
                  }}
                >
                  Stock: {product.stockQuantity}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stockQuantity <= 0}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: `1px solid ${theme.primary}`,
                    background:
                      product.stockQuantity <= 0
                        ? "#ccc"
                        : "transparent",
                    color:
                      product.stockQuantity <= 0
                        ? "#666"
                        : theme.primary,
                    fontWeight: "600",
                    cursor:
                      product.stockQuantity <= 0
                        ? "not-allowed"
                        : "pointer"
                  }}
                >
                  {product.stockQuantity <= 0
                    ? "Out of Stock"
                    : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE CART */}
        <div
          style={{
            flex: 1,
            backgroundColor: theme.surface,
            borderRadius: "16px",
            border: `1px solid ${theme.border}`,
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Cart Header */}
          <div
            style={{
              padding: "24px",
              borderBottom: `1px solid ${theme.border}`,
              fontWeight: "700",
              display: "flex",
              gap: "10px"
            }}
          >
            <ShoppingCart size={20} />
            Current Cart
          </div>

          {/* Cart Items */}
          <div
            style={{
              flex: 1,
              padding: "24px",
              overflowY: "auto"
            }}
          >
            {cart.length === 0 ? (
              <p style={{ color: theme.muted }}>
                No items added yet
              </p>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px"
                  }}
                >
                  <div>
                    <div>{item.name}</div>
                    <small style={{ color: theme.muted }}>
                      ${item.price} × {item.quantity}
                    </small>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <Minus
                      size={14}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    />

                    <span>{item.quantity}</span>

                    <Plus
                      size={14}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        increaseQty(item.id)
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Section */}
          <div
            style={{
              padding: "24px",
              backgroundColor: theme.bg,
              borderRadius: "0 0 16px 16px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.25rem",
                fontWeight: "800",
                marginBottom: "16px"
              }}
            >
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                backgroundColor: theme.primary,
                color: "white",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      <CreatePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirmPayment={handlePaymentConfirm}
        cartItems={cart}
        totalAmount={total}
        theme={theme}
      />

      {/* RECEIPT MODAL */}
      <ReceiptModal
        isOpen={showReceipt}
        onClose={handleReceiptClose}
        paymentData={paymentData}
        orderId={generatedOrderId}
        theme={theme}
      />
    </>
  );
};

export default POS;