import React, { useEffect, useRef } from "react";
import {
  Printer,
  X,
  Receipt,
  Smartphone,
  CheckCircle
} from "lucide-react";

const ReceiptModal = ({
  isOpen,
  onClose,
  paymentData,
  orderId,
  theme
}) => {
  const hasPrinted = useRef(false);

  // Auto print only once
  useEffect(() => {
    if (isOpen && !hasPrinted.current) {
      hasPrinted.current = true;

      const timer = setTimeout(() => {
        window.print();
      }, 700);

      return () => clearTimeout(timer);
    }

    if (!isOpen) {
      hasPrinted.current = false;
    }
  }, [isOpen]);

  if (!isOpen || !paymentData) return null;

  const {
    customer,
    items,
    paymentMethod,
    financials,
    orderDate,
    customerPhone,
    cashierName,
    cashierId
  } = paymentData;

  const handleManualPrint = () => {
    window.print();
  };

  const transactionRef =
    "TXN-" + Math.floor(100000 + Math.random() * 900000);

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(15, 23, 42, 0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000
    },

    modalCard: {
      backgroundColor: "#ffffff",
      width: "380px",
      maxHeight: "90vh",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      boxShadow:
        "0 25px 50px -12px rgba(0,0,0,0.5)",
      position: "relative",
      overflow: "hidden"
    },

    receiptContent: {
      padding: "24px",
      overflowY: "auto",
      color: "#000",
      fontFamily: "Century Gothic, sans-serif"
    },

    header: {
      textAlign: "center",
      borderBottom: "1px dashed #ccc",
      paddingBottom: "16px",
      marginBottom: "16px"
    },

    section: {
      marginBottom: "16px",
      fontSize: "0.85rem"
    },

    row: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "4px"
    },

    footer: {
      textAlign: "center",
      borderTop: "1px dashed #ccc",
      paddingTop: "16px",
      marginTop: "16px",
      fontSize: "0.8rem",
      color: "#666"
    }
  };

  return (
    <div
      style={styles.overlay}
      className="no-print-overlay"
    >
      <div
        style={styles.modalCard}
        className="receipt-modal-card"
      >
        {/* Top Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: theme.surface,
            borderBottom: `1px solid ${theme.border}`
          }}
          className="hide-on-print"
        >
          <span
            style={{
              fontWeight: "700",
              color: theme.text,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <Receipt size={18} />
            Receipt Preview
          </span>

          <div
            style={{
              display: "flex",
              gap: "10px"
            }}
          >
            <Printer
              size={20}
              onClick={handleManualPrint}
              style={{
                cursor: "pointer",
                color: theme.primary
              }}
            />

            <X
              size={20}
              onClick={onClose}
              style={{
                cursor: "pointer",
                color: theme.muted
              }}
            />
          </div>
        </div>

        {/* Receipt Body */}
        <div
          style={styles.receiptContent}
          id="printable-receipt"
        >
          {/* Business Header */}
          <div style={styles.header}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "8px"
              }}
            >
              <Smartphone size={32} color="#000" />
            </div>

            <h2
              style={{
                margin: "0 0 4px 0",
                fontSize: "1.2rem",
                fontWeight: "800"
              }}
            >
              Smart Inventory POS
            </h2>

            <p style={{ margin: 0, fontSize: "0.75rem" }}>
              Mobile Repair & Sales
            </p>

            <p style={{ margin: 0, fontSize: "0.75rem" }}>
              Tel: +263 770 000 000
            </p>
          </div>

          {/* Order Details */}
          <div style={styles.section}>
            <div style={styles.row}>
              <span>Order ID:</span>
              <span>#{orderId}</span>
            </div>

            <div style={styles.row}>
              <span>Transaction Ref:</span>
              <span>{transactionRef}</span>
            </div>

            <div style={styles.row}>
              <span>Date:</span>
              <span>
                {new Date(orderDate).toLocaleDateString()}
              </span>
            </div>

            <div style={styles.row}>
              <span>Time:</span>
              <span>
                {new Date(orderDate).toLocaleTimeString()}
              </span>
            </div>

            <div style={styles.row}>
              <span>Cashier:</span>
              <span>
                {cashierName || "Admin"}
              </span>
            </div>

            <div style={styles.row}>
              <span>Cashier ID:</span>
              <span>
                {cashierId || "EMP001"}
              </span>
            </div>

            <div style={styles.row}>
              <span>Customer:</span>
              <span>
                {customer || "Walk-in Customer"}
              </span>
            </div>

            {customerPhone && (
              <div style={styles.row}>
                <span>Phone:</span>
                <span>{customerPhone}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div
            style={{
              ...styles.section,
              borderBottom: "1px solid #000",
              paddingBottom: "8px"
            }}
          >
            <div
              style={{
                ...styles.row,
                fontWeight: "bold",
                borderBottom: "1px solid #eee",
                paddingBottom: "4px"
              }}
            >
              <span>Item</span>
              <span>Total</span>
            </div>

            {items.map((item, idx) => (
              <div
                key={idx}
                style={{ marginTop: "8px" }}
              >
                <div style={styles.row}>
                  <span
                    style={{
                      fontWeight: "600"
                    }}
                  >
                    {item.name}
                  </span>

                  <span>
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#444"
                  }}
                >
                  {item.quantity} x $
                  {item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Financial Summary */}
          <div style={styles.section}>
            <div style={styles.row}>
              <span>Subtotal:</span>
              <span>
                ${financials.subtotal.toFixed(2)}
              </span>
            </div>

            <div style={styles.row}>
              <span>Discount:</span>
              <span>
                -${financials.discount.toFixed(2)}
              </span>
            </div>

            <div style={styles.row}>
              <span>Tax:</span>
              <span>
                +${financials.tax.toFixed(2)}
              </span>
            </div>

            <div
              style={{
                ...styles.row,
                fontWeight: "bold",
                fontSize: "1rem",
                marginTop: "8px"
              }}
            >
              <span>TOTAL:</span>
              <span>
                $
                {financials.finalPayable.toFixed(
                  2
                )}
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div
            style={{
              ...styles.section,
              backgroundColor: "#f9f9f9",
              padding: "8px",
              borderRadius: "4px"
            }}
          >
            <div style={styles.row}>
              <span>Method:</span>
              <span>{paymentMethod}</span>
            </div>

            <div style={styles.row}>
              <span>Amount Paid:</span>
              <span>
                ${financials.received.toFixed(2)}
              </span>
            </div>

            <div style={styles.row}>
              <span>Change:</span>
              <span>
                ${financials.change.toFixed(2)}
              </span>
            </div>

            <div style={styles.row}>
              <span>Status:</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <CheckCircle size={14} />
                Paid
              </span>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p
              style={{
                fontWeight: "bold",
                margin: "0 0 4px 0"
              }}
            >
              Thank you for shopping with us!
            </p>

            <p
              style={{
                margin: "0 0 8px 0"
              }}
            >
              Returns accepted within 7 days
              with original receipt.
            </p>

            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "1px"
              }}
            >
              POWERED BY SMART INVENTORY POS
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #printable-receipt,
          #printable-receipt * {
            visibility: visible;
          }

          #printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 80mm;
            font-family: Century Gothic, sans-serif;
          }

          .hide-on-print,
          .no-print-overlay {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceiptModal;