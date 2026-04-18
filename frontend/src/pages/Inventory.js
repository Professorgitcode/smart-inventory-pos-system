import React from "react";
import { Search, Plus, Edit3, Trash2 } from "lucide-react";

const Inventory = ({ theme }) => (
  <div style={{ backgroundColor: theme.surface, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
      <div style={{ position: "relative" }}>
        <Search size={18} style={{ position: "absolute", left: "12px", top: "10px", color: theme.muted }} />
        <input placeholder="Search products..." style={{ 
          padding: "10px 10px 10px 40px", borderRadius: "8px", border: `1px solid ${theme.border}`, 
          backgroundColor: theme.bg, color: theme.text, width: "300px", outline: "none" 
        }} />
      </div>
      <button style={{ 
        backgroundColor: theme.primary, color: "white", border: "none", 
        padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", display: "flex", gap: "8px"
      }}>
        <Plus size={18} /> Add Product
      </button>
    </div>

    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: `1px solid ${theme.border}`, color: theme.muted }}>
          <th style={{ padding: "16px" }}>Product Name</th>
          <th style={{ padding: "16px" }}>Price</th>
          <th style={{ padding: "16px" }}>Stock</th>
          <th style={{ padding: "16px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3].map(i => (
          <tr key={i} style={{ borderBottom: `1px solid ${theme.border}` }}>
            <td style={{ padding: "16px", fontWeight: "500" }}>Smartphone Pro Max</td>
            <td style={{ padding: "16px" }}>$999.00</td>
            <td style={{ padding: "16px" }}>45 Units</td>
            <td style={{ padding: "16px", display: "flex", gap: "12px" }}>
              <Edit3 size={18} color={theme.muted} style={{ cursor: "pointer" }} />
              <Trash2 size={18} color="#ef4444" style={{ cursor: "pointer" }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Inventory;