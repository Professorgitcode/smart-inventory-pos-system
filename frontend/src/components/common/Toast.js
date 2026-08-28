import React, { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

const Toast = ({ header, message, type, isVisible, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const duration = 4500;

  useEffect(() => {
    if (isVisible) {
      setIsExiting(false);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible && !isExiting) return null;

  // Inverted Color Configuration
  const typeConfig = {
    success: {
      bg: "#10b981", // Solid Green
      accent: "#ffffff",
      icon: <CheckCircle size={22} />,
    },
    error: {
      bg: "#ef4444", // Solid Red
      accent: "#ffffff",
      icon: <AlertTriangle size={22} />,
    },
    info: {
      bg: "#06b6d4", // Solid Cyan/Blue
      accent: "#ffffff",
      icon: <Info size={22} />,
    }
  };

  const config = typeConfig[type] || typeConfig.info;

  const containerStyle = {
    position: "fixed",
    top: "24px",
    right: "24px",
    width: "360px",
    backgroundColor: config.bg,
    color: config.accent,
    borderRadius: "12px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9999,
    animation: isExiting ? "slideOutRight 0.3s forwards" : "slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  };

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }
        @keyframes shrinkBar {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      <div style={containerStyle}>
        <div style={{ padding: "18px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
          {/* Icon Section */}
          <div style={{ color: config.accent, marginTop: "2px" }}>
            {config.icon}
          </div>
          
          {/* Content Section */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <span style={{ fontWeight: "800", fontSize: "1rem", letterSpacing: "0.3px" }}>
                {header}
              </span>
              <X 
                size={20} 
                onClick={handleClose} 
                style={{ cursor: "pointer", opacity: 0.8, transition: "0.2s" }} 
                onMouseEnter={(e) => e.target.style.opacity = "1"}
                onMouseLeave={(e) => e.target.style.opacity = "0.8"}
              />
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "500", opacity: 0.95, lineHeight: "1.4" }}>
              {message}
            </p>
          </div>
        </div>

        {/* Inverted Progress Bar */}
        <div style={{ height: "5px", backgroundColor: "rgba(0, 0, 0, 0.15)", width: "100%" }}>
          <div style={{ 
            height: "100%", 
            backgroundColor: config.accent, // Pure white bar
            animation: isVisible && !isExiting ? `shrinkBar ${duration}ms linear forwards` : "none" 
          }} />
        </div>
      </div>
    </>
  );
};

export default Toast;