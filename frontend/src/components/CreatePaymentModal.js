import React, { useState, useEffect } from "react";
import { 
  User, 
  Wallet, 
  DollarSign, 
  CreditCard, 
  ClipboardList, 
  Receipt,
  X,
  AlertCircle
} from "lucide-react";

const CreatePaymentModal = ({ 
  isOpen, 
  onClose, 
  onConfirmPayment, 
  cartItems, 
  totalAmount, 
  theme 
}) => {
  // Form State
  const [customerName, setCustomerName] = useState("");
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(totalAmount);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  
  // Adjustment State
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  // Sync payment amount if totalAmount changes (e.g., cart updated)
  useEffect(() => {
    setPaymentAmount(totalAmount);
  }, [totalAmount]);

  if (!isOpen) return null;

  // Derived Calculations
  const finalPayable = Math.max(0, parseFloat(paymentAmount) - parseFloat(discount) + parseFloat(tax));
  const changeReturn = Math.max(0, parseFloat(receivedAmount) - finalPayable);
  const isInsufficient = receivedAmount < finalPayable;

  const handleConfirm = () => {
    if (cartItems.length === 0 || isInsufficient) return;

    const paymentData = {
      orderDate: new Date().toISOString(),
      customer: customerName || "Walk-in Customer",
      items: cartItems,
      financials: {
        subtotal: totalAmount,
        discount: parseFloat(discount),
        tax: parseFloat(tax),
        finalPayable: finalPayable,
        received: parseFloat(receivedAmount),
        change: changeReturn
      },
      paymentMethod,
      notes
    };

    onConfirmPayment(paymentData);
  };

  // Styles
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: theme.surface,
    color: theme.text,
    width: "90%",
    maxWidth: "900px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    animation: "modalFadeIn 0.3s ease-out"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.bg,
    color: theme.text,
    fontSize: "1rem",
    outline: "none",
    marginTop: "6px"
  };

  const labelStyle = {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: theme.muted,
    display: "flex",
    alignItems: "center",
    gap: "6px"
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "700" }}>Complete Transaction</h2>
          <X onClick={onClose} style={{ cursor: "pointer", color: theme.muted }} />
        </div>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", height: "500px" }}>
          
          {/* Left: Payment Form */}
          <div style={{ padding: "24px", overflowY: "auto", borderRight: `1px solid ${theme.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}><User size={14}/> Customer Name</label>
                <input 
                  style={inputStyle} 
                  placeholder="Walk-in Customer"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}><Wallet size={14}/> Payment Method</label>
                <select 
                  style={inputStyle}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Cash">Cash</option>
                  <option value="EcoCash">EcoCash</option>
                  <option value="Bank Card">Bank Card</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}><DollarSign size={14}/> Payment Amount</label>
                <input 
                  type="number"
                  style={inputStyle} 
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
              <div>
                <label style={{...labelStyle, color: isInsufficient ? "#ef4444" : theme.primary}}>
                  <CreditCard size={14}/> Received Amount
                </label>
                <input 
                  type="number"
                  style={{...inputStyle, borderColor: isInsufficient ? "#ef4444" : theme.border}}
                  placeholder="Enter Amount Received" 
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}><ClipboardList size={14}/> Transaction Notes</label>
              <textarea 
                style={{...inputStyle, height: "80px", resize: "none"}}
                placeholder="Optional: Serial numbers, warranty info, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: theme.bg, textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: "0.85rem", color: theme.muted }}>Change to Return</p>
              <h1 style={{ margin: "4px 0 0 0", color: theme.primary, fontSize: "2rem" }}>
                ${changeReturn.toFixed(2)}
              </h1>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div style={{ padding: "24px", backgroundColor: theme.bg }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Receipt size={18} /> Order Summary
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Items Count</span>
                <span style={{ fontWeight: "700" }}>{cartItems.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>${parseFloat(paymentAmount).toFixed(2)}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Discount ($)</span>
                <input 
                  type="number" 
                  style={{ width: "80px", textAlign: "right", border: "none", borderBottom: `1px solid ${theme.border}`, background: "none", color: theme.text, outline: "none" }}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Tax ($)</span>
                <input 
                  type="number" 
                  style={{ width: "80px", textAlign: "right", border: "none", borderBottom: `1px solid ${theme.border}`, background: "none", color: theme.text, outline: "none" }}
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                />
              </div>

              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: `2px dashed ${theme.border}`, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>Total Payable</span>
                <span style={{ fontWeight: "800", fontSize: "1.1rem", color: theme.primary }}>
                  ${finalPayable.toFixed(2)}
                </span>
              </div>
            </div>

            {isInsufficient && receivedAmount > 0 && (
              <div style={{ marginTop: "20px", display: "flex", gap: "8px", color: "#ef4444", fontSize: "0.8rem", alignItems: "center" }}>
                <AlertCircle size={14} />
                <span>Received amount is less than total payable.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "20px 24px", borderTop: `1px solid ${theme.border}`, display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button 
            onClick={onClose}
            style={{ padding: "12px 24px", borderRadius: "10px", border: `1px solid ${theme.border}`, backgroundColor: "transparent", color: theme.text, cursor: "pointer", fontWeight: "600" }}
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={isInsufficient || cartItems.length === 0}
            style={{ 
              padding: "12px 32px", 
              borderRadius: "10px", 
              border: "none", 
              backgroundColor: isInsufficient ? theme.muted : theme.primary, 
              color: "white", 
              cursor: isInsufficient ? "not-allowed" : "pointer", 
              fontWeight: "700",
              boxShadow: isInsufficient ? "none" : "0 4px 14px 0 rgba(37, 99, 235, 0.39)"
            }}
          >
            Confirm Payment
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default CreatePaymentModal;