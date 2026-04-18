import React from "react";
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ShoppingBag, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Timer,
  ChevronRight,
  PackageCheck
} from "lucide-react";

// --- Sub-components for Clean Structure ---

const AnalyticsCard = ({ title, value, icon: Icon, color, theme }) => (
  <div style={{
    backgroundColor: theme.surface,
    padding: "24px",
    borderRadius: "16px",
    border: `1px solid ${theme.border}`,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: theme.textMuted, fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>{title}</span>
      <div style={{ color: color, backgroundColor: `${color}15`, padding: "8px", borderRadius: "10px" }}>
        <Icon size={18} />
      </div>
    </div>
    <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700", color: theme.text }}>{value}</h3>
  </div>
);

const OrderRow = ({ id, time, amount, status, theme }) => {
  const getStatusStyle = (s) => {
    switch (s) {
      case "Completed": return { bg: "#f0fdf4", text: "#166534", icon: <CheckCircle2 size={14} /> };
      case "Processing": return { bg: "#eff6ff", text: "#1e40af", icon: <Timer size={14} /> };
      default: return { bg: "#f1f5f9", text: "#475569", icon: <Clock size={14} /> };
    }
  };

  const statusStyle = getStatusStyle(status);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: `1px solid ${theme.border}`,
      gap: "12px"
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "600", color: theme.text }}>Order #{id}</p>
        <p style={{ margin: 0, fontSize: "0.75rem", color: theme.textMuted }}>{time}</p>
      </div>
      <div style={{ textAlign: "right", marginRight: "12px" }}>
        <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "700", color: theme.text }}>${amount}</p>
        <div style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "4px", 
          padding: "2px 8px", 
          borderRadius: "12px", 
          backgroundColor: statusStyle.bg, 
          color: statusStyle.text,
          fontSize: "0.7rem",
          fontWeight: "600",
          marginTop: "4px"
        }}>
          {statusStyle.icon} {status}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const SalesReports = ({ theme = { 
  bg: "#f8fafc", 
  surface: "#ffffff", 
  text: "#0f172a", 
  textMuted: "#64748b", 
  border: "#e2e8f0", 
  primary: "#2563eb" 
} }) => {
  
  const orders = [
    { id: "8421", time: "2 mins ago", amount: "125.00", status: "Completed" },
    { id: "8420", time: "15 mins ago", amount: "42.50", status: "Completed" },
    { id: "8419", time: "1 hour ago", amount: "210.00", status: "Processing" },
    { id: "8418", time: "3 hours ago", amount: "89.99", status: "Completed" },
  ];

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "800", color: theme.text, margin: 0, letterSpacing: "-0.5px" }}>Sales Analytics</h1>
          <p style={{ color: theme.textMuted, margin: "4px 0 0 0" }}>Detailed financial performance and forecasting.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ 
            padding: "10px 16px", borderRadius: "10px", border: `1px solid ${theme.border}`, 
            backgroundColor: theme.surface, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
            fontSize: "0.9rem", fontWeight: "600", color: theme.text
          }}>
            <Calendar size={16} /> Last 30 Days
          </button>
        </div>
      </div>

      {/* Top Section: Grid 2:1 */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "32px" }}>
        
        {/* Revenue Forecast Card */}
        <div style={{
          backgroundColor: theme.surface,
          padding: "24px",
          borderRadius: "20px",
          border: `1px solid ${theme.border}`,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: theme.text }}>Revenue Forecast</h3>
            <div style={{ color: "#2563eb", fontSize: "0.8rem", fontWeight: "700", backgroundColor: "#eff6ff", padding: "4px 10px", borderRadius: "8px" }}>
              ML.NET Powered
            </div>
          </div>
          
          <div style={{ 
            height: "300px", 
            backgroundColor: "#f8fafc", 
            borderRadius: "12px", 
            border: `2px dashed ${theme.border}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: theme.textMuted
          }}>
            <BarChart3 size={40} style={{ marginBottom: "12px", opacity: 0.4 }} />
            <p style={{ fontSize: "0.9rem", fontWeight: "500" }}>Predictive Analytics Visualization Engine</p>
          </div>
        </div>

        {/* Recent Orders Card */}
        <div style={{
          backgroundColor: theme.surface,
          padding: "24px",
          borderRadius: "20px",
          border: `1px solid ${theme.border}`,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: theme.text }}>Recent Orders</h3>
            <button style={{ background: "none", border: "none", color: theme.primary, fontWeight: "600", fontSize: "0.85rem", cursor: "pointer" }}>
              View All
            </button>
          </div>
          
          <div style={{ flex: 1 }}>
            {orders.map((order, idx) => (
              <OrderRow key={idx} {...order} theme={theme} />
            ))}
          </div>

          <button style={{
            marginTop: "16px",
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#f1f5f9",
            color: "#475569",
            fontWeight: "600",
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>
            Download Daily Log <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Section: Analytics Summary */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <AnalyticsCard 
          title="Today Revenue" 
          value="$1,420.50" 
          icon={DollarSign} 
          color="#10b981" 
          theme={theme} 
        />
        <AnalyticsCard 
          title="Weekly Revenue" 
          value="$8,942.00" 
          icon={TrendingUp} 
          color="#3b82f6" 
          theme={theme} 
        />
        <AnalyticsCard 
          title="Total Orders" 
          value="1,240" 
          icon={ShoppingBag} 
          color="#8b5cf6" 
          theme={theme} 
        />
        <AnalyticsCard 
          title="Best Seller" 
          value="Smartphone X" 
          icon={PackageCheck} 
          color="#f59e0b" 
          theme={theme} 
        />
      </div>

    </div>
  );
};

export default SalesReports;