import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const config = {
    success: { color: "#f0fdf4", icon: <CheckCircle2 size={20} />, bg: "#10b981" },
    error: { color: "#f0fdf4", icon: <AlertCircle size={20} />, bg: "#ef4444" },
    info: { color: "#f0fdf4", icon: <Info size={20} />, bg: "#3b82f6" },
  };

  const { color, icon, bg } = config[type] || config.info;

  const toastStyle = {
    position: "fixed",
    top: "24px",
    right: "24px",
    minWidth: "300px",
    backgroundColor: bg,
    color: color,
    padding: "16px 20px",
    borderRadius: "12px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${color}20`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    zIndex: 2000,
    animation: "slideInRight 0.3s ease-out",
  };

  return (
    <div style={toastStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {icon}
        <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>{message}</span>
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", color: color, cursor: "pointer", display: "flex" }}>
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;