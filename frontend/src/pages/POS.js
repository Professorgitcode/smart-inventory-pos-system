import React, { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";


const POS = ({ theme }) => (


  <div style={{ display: "flex", gap: "24px", height: "100%" }}>
    {/* Left: Product Selection */}
    <div style={{ flex: 2 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ backgroundColor: theme.surface, padding: "16px", borderRadius: "12px", border: `1px solid ${theme.border}`, textAlign: "center" }}>
            <div style={{ height: "100px", backgroundColor: theme.bg, borderRadius: "8px", marginBottom: "12px" }} />
            <div style={{ fontWeight: "700", marginBottom: "4px" }}>Product {i}</div>
            <div style={{ color: theme.primary, fontWeight: "800", marginBottom: "12px" }}>$25.00</div>
            <button style={{ width: "100%", padding: "8px", borderRadius: "6px", border: `1px solid ${theme.primary}`, background: "none", color: theme.primary, fontWeight: "600", cursor: "pointer" }}>Add</button>
          </div>
        ))}
      </div>
    </div>


    {/* Right: Cart Panel */}
    <div style={{ flex: 1, backgroundColor: theme.surface, borderRadius: "16px", border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "24px", borderBottom: `1px solid ${theme.border}`, fontWeight: "700", display: "flex", gap: "10px" }}>
        <ShoppingCart size={20} /> Current Cart
      </div>
      <div style={{ flex: 1, padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <span>Smartphone</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Minus size={14} style={{ cursor: "pointer" }} /> <span>1</span> <Plus size={14} style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>
      <div style={{ padding: "24px", backgroundColor: theme.bg, borderRadius: "0 0 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.25rem", fontWeight: "800", marginBottom: "16px" }}>
          <span>Total</span> <span>$999.00</span>
        </div>
        <button style={{ width: "100%", backgroundColor: theme.primary, color: "white", padding: "14px", borderRadius: "8px", border: "none", fontWeight: "700", cursor: "pointer" }}>Checkout</button>
      </div>
    </div>
  </div>
);

export default POS;