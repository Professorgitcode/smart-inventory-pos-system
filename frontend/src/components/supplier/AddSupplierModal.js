import React, { useState } from "react";
import { X, Building2, User, Mail, Phone } from "lucide-react";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.35)",
  backdropFilter: "blur(6px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const modalStyle = {
  width: "520px",
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "24px",
  boxShadow: "0 8px 32px rgba(52,114,156,0.15)",
  overflow: "hidden"
};

const headerStyle = {
  padding: "24px",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const inputWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "12px",
  padding: "12px"
};

const inputStyle = {
  border: "none",
  outline: "none",
  background: "transparent",
  width: "100%",
  fontSize: "14px"
};

const buttonPrimary = {
  background: "#34729C",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: 600
};

const buttonSecondary = {
  background: "#F1F5F9",
  color: "#163042",
  border: "none",
  padding: "12px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: 600
};

const AddSupplierModal = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [form, setForm] = useState({
    supplierName: "",
    contactPerson: "",
    email: "",
    phone: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(form);

    setForm({
      supplierName: "",
      contactPerson: "",
      email: "",
      phone: ""
    });
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        
        <div style={headerStyle}>
          <div>
            <h2
              style={{
                margin: 0,
                color: "#163042"
              }}
            >
              Add Supplier
            </h2>

            <p
              style={{
                marginTop: "5px",
                color: "#64748B",
                fontSize: "14px"
              }}
            >
              Register a new supplier in the system
            </p>
          </div>

          <X
            size={20}
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}
        >
          
          <div style={inputWrapper}>
            <Building2 size={18} color="#34729C" />
            <input
              style={inputStyle}
              placeholder="Supplier Name"
              value={form.supplierName}
              onChange={(e) =>
                setForm({
                  ...form,
                  supplierName: e.target.value
                })
              }
            />
          </div>

          <div style={inputWrapper}>
            <User size={18} color="#34729C" />
            <input
              style={inputStyle}
              placeholder="Contact Person"
              value={form.contactPerson}
              onChange={(e) =>
                setForm({
                  ...form,
                  contactPerson: e.target.value
                })
              }
            />
          </div>

          <div style={inputWrapper}>
            <Mail size={18} color="#34729C" />
            <input
              style={inputStyle}
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />
          </div>

          <div style={inputWrapper}>
            <Phone size={18} color="#34729C" />
            <input
              style={inputStyle}
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "10px"
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={buttonSecondary}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={buttonPrimary}
            >
              Save Supplier
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;