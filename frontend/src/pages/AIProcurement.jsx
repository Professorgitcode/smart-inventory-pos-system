import React, { useState } from "react";
import {
  BrainCircuit,
  ShoppingCart,
  TrendingDown,
  Clock,
  Zap,
  Search
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ---------------- Stat Card Component ----------------
const StatCard = ({ title, value, icon: Icon, trend, color = "#3b82f6" }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        padding: "24px",
        borderRadius: "16px",
        border: `1px solid ${theme.colors.border}`,
        borderBottom: `4px solid ${color}`, // Added bottom color line
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        overflow: "hidden" // Ensures the bottom border respects the border-radius
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: theme.colors.textMuted, fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {title}
        </span>
        <div style={{ color: color, backgroundColor: `${color}15`, padding: "8px", borderRadius: "10px" }}>
          <Icon size={18} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700", color: theme.colors.text }}>
          {value}
        </h3>
        {trend && (
          <span style={{ fontSize: "0.75rem", fontWeight: "600", color: trend.startsWith("-") ? "#ef4444" : "#10b981" }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

// ---------------- Main AIProcurement Component ----------------
const AIProcurement = () => {
  const { theme, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const mockData = [
    { id: 1, item: "RTX-3080 Processors", depletion: "3 Days", suggestedQty: "250 Units", supplier: "GlobalTech Components", confidence: "94%" },
    { id: 2, item: "Aluminum Enclosures", depletion: "5 Days", suggestedQty: "1,000 Units", supplier: "MetalWorks Inc", confidence: "88%" },
  ];

  const filteredData = mockData.filter((row) =>
    row.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "32px", maxWidth: "1700px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: "800", color: theme.colors.text, letterSpacing: "-0.5px" }}>
            AI Procurement Intelligence
          </h1>
          <p style={{ color: theme.colors.textMuted, margin: "4px 0 0 0" }}>
            Machine learning predictions for predictive ordering, cost optimization, and supply chain continuity.
          </p>
        </div>

        <div>
          <button
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", border: "none", backgroundColor: "#3b82f6", color: "#fff", fontWeight: "600", fontSize: "0.9rem", cursor: "pointer" }}
          >
            <BrainCircuit size={16} /> Run Analysis
          </button>
        </div>
      </div>

      {/* Stat Grid */}
      <div style={{ display: "flex", gap: "24px", marginBottom: "32px", flexWrap: "wrap" }}>
        <StatCard title="Pending Approvals" value="4" icon={ShoppingCart} trend="Requires Action" color="#3b82f6" />
        <StatCard title="Predicted Shortages" value="2" icon={Clock} trend="-1 yesterday" color="#f59e0b" />
        <StatCard title="Est. Cost Savings" value="$4,280" icon={TrendingDown} trend="+12.4%" color="#10b981" />
        <StatCard title="Auto-POs Generated" value="18" icon={Zap} trend="+3" color="#8b5cf6" />
      </div>

      {/* Content Card / Table Container */}
      <div style={{ backgroundColor: theme.colors.surface, borderRadius: "20px", border: `1px solid ${theme.colors.border}`, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", padding: "24px", display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>

        {/* Search Bar */}
        <div style={{ position: "relative", width: "320px" }}>
          <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: theme.colors.textMuted }} />
          <input
            type="text"
            placeholder="Search predictive recommendations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 42px",
              borderRadius: "10px",
              border: `1px solid ${theme.colors.border}`,
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              fontSize: "0.9rem",
              outline: "none"
            }}
          />
        </div>

        {/* Custom Modern Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>SKU / Item</th>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>Est. Depletion</th>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>Recommended Qty</th>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>Optimal Supplier</th>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>AI Confidence</th>
                <th style={{ padding: "12px 16px", textAlign: "right", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} style={{ borderBottom: `1px solid ${theme.colors.border}`, transition: "background 0.2s" }}>
                    <td style={{ padding: "16px", fontWeight: "600", color: theme.colors.text, fontSize: "0.95rem" }}>{row.item}</td>
                    <td style={{ padding: "16px", color: theme.colors.textMuted, fontSize: "0.9rem" }}>{row.depletion}</td>
                    <td style={{ padding: "16px", color: theme.colors.text, fontSize: "0.9rem" }}>{row.suggestedQty}</td>
                    <td style={{ padding: "16px", color: theme.colors.textMuted, fontSize: "0.9rem" }}>{row.supplier}</td>
                    <td style={{ padding: "16px", fontWeight: "700", color: "#3b82f6", fontSize: "0.9rem" }}>{row.confidence}</td>
                    <td style={{ padding: "16px", textAlign: "right" }}>
                      <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#3b82f6", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer" }}>
                        <Zap size={14} /> Auto-Order
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: theme.colors.textMuted }}>
                    No predictive recommendations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights Section */}
      <div style={{ padding: "24px", borderRadius: "20px", background: isDark ? theme.colors.surface : "#1E293B", color: "#F8FAFC", border: `1px solid ${theme.colors.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <BrainCircuit color="#3b82f6" size={20} />
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>Procurement AI Insights</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "12px" }}>
            <h4 style={{ color: "#60a5fa", margin: "0 0 8px 0", fontSize: "14px" }}>Cost Optimization</h4>
            <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0, lineHeight: "1.4" }}>
              Switching bulk purchases of "Aluminum Enclosures" to Q3 shipments will save an estimated 14% based on historical seasonal pricing.
            </p>
            <p style={{ fontSize: "11px", color: "#64748B", marginTop: "12px", margin: 0 }}>Confidence: 91%</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "12px" }}>
            <h4 style={{ color: "#60a5fa", margin: "0 0 8px 0", fontSize: "14px" }}>Lead Time Alert</h4>
            <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0, lineHeight: "1.4" }}>
              Supplier 'GlobalTech' has shown a 2-day delay trend over the last month. Adjusting safety stock buffers is recommended.
            </p>
            <p style={{ fontSize: "11px", color: "#64748B", marginTop: "12px", margin: 0 }}>Confidence: 85%</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "12px" }}>
            <h4 style={{ color: "#60a5fa", margin: "0 0 8px 0", fontSize: "14px" }}>Portfolio Health</h4>
            <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0, lineHeight: "1.4" }}>
              Procurement efficiency score is currently optimal. No high-risk dependency clusters detected in current supply chain map.
            </p>
            <p style={{ fontSize: "11px", color: "#64748B", marginTop: "12px", margin: 0 }}>Confidence: 98%</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AIProcurement;