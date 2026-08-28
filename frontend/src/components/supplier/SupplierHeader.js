import React from "react";
import { FileText, Plus } from "lucide-react";

const glassStyle = {
  background: "rgba(255,255,255,0.65)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(52,114,156,0.15)"
};

const SupplierHeader = ({
  onAddSupplier
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "32px"
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            margin: 0,
            color: "#163042"
          }}
        >
          Supplier Intelligence
        </h1>

        <p
          style={{
            color: "#6b8798",
            marginTop: "8px"
          }}
        >
          Monitor supplier performance,
          delivery reliability and
          procurement efficiency.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px"
        }}
      >
        <button
          style={{
            ...glassStyle,
            padding: "12px 20px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <FileText size={18} />
          Export
        </button>

        <button
          onClick={onAddSupplier}
          style={{
            background: "#34729C",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "600"
          }}
        >
          <Plus size={18} />
          Add Supplier
        </button>
      </div>
    </div>
  );
};

export default SupplierHeader;