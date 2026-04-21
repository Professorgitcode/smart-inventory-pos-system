import React, { useState, useEffect } from "react";
import { X, Package, DollarSign, Layers } from "lucide-react";

const ProductModal = ({ isOpen, onClose, onSubmit, initialData, mode, theme }) => {
  const [formData, setFormData] = useState({
  name: "",
  price: "",
  stockQuantity: ""
});

  // Sync form with initialData when editing or resetting
  useEffect(() => {
  if (mode === "edit" && initialData) {
    setFormData({
      name: initialData.name,
      price: initialData.price,
      stockQuantity: initialData.stockQuantity
    });
  } else {
    setFormData({ name: "", price: "", stockQuantity: "" });
  }
}, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.2s ease-out",
  };

  const modalStyle = {
    backgroundColor: theme.surface,
    color: theme.text,
    width: "100%",
    maxWidth: "450px",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    padding: "32px",
    position: "relative",
    border: `1px solid ${theme.border}`,
    transform: "scale(1)",
    animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const inputGroupStyle = {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle = {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: theme.muted,
  };

  const inputStyle = {
    padding: "12px 10px",
    borderRadius: "10px",
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.bg,
    color: theme.text,
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: theme.muted }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Product Name</label>
            <input
              required
              name="name"
              placeholder="e.g. Wireless Mouse"
              style={inputStyle}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Price ($)</label>
              <input
                required
                type="number"
                name="price"
                placeholder="0.00"
                style={inputStyle}
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Stock Quantity</label>
              <input
 required
  type="number"
  name="stockQuantity"
   placeholder="0"
  style={inputStyle}
  value={formData.stockQuantity}
  onChange={handleChange}
/>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ flex: 1, padding: "12px", borderRadius: "10px", border: `1px solid ${theme.border}`, backgroundColor: "transparent", color: theme.text, fontWeight: "600", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", backgroundColor: theme.primary, color: "white", fontWeight: "600", cursor: "pointer" }}
            >
              {mode === "add" ? "Save Product" : "Update Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;