import React, { useEffect, useState } from "react";
import { DollarSign, Package, BrainCircuit, AlertTriangle, BarChart3 } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, theme }) => (
  <div style={{ 
    backgroundColor: theme.surface,
    padding: "24px",
    borderRadius: "16px",
    border: `1px solid ${theme.border}`,
    flex: 1,
    minWidth: "240px"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
      <span style={{ color: theme.muted }}>{title}</span>
      <Icon color={theme.primary} size={20} />
    </div>
    <div style={{ fontSize: "1.75rem", fontWeight: "800" }}>{value}</div>
  </div>
);

const Dashboard = ({ theme }) => {

 const [stats, setStats] = useState({
  totalSales: 0,
  totalProducts: 0,
  forecast: "",
  lowStock: 0,
  recentOrders: []
});

  useEffect(() => {
  fetch("http://localhost:5216/api/dashboard")
    .then(res => res.json())
    .then(data => setStats({
      totalSales: data.totalSales,
      totalProducts: data.totalProducts,
      forecast: data.forecast,
      lowStock: data.lowStockCount,
      recentOrders: data.recentOrders
    }));
}, []);

  return (
    <div>

      {/* ALERT */}
      {stats.lowStock > 0 && (
      <div style={{
        padding: "16px",
        backgroundColor: "#fff7ed",
        borderRadius: "12px",
        marginBottom: "32px"
      }}>
        <AlertTriangle size={22} />
        Low Stock Alert: {stats.lowStock} products are running low!
      </div>
)}
      {/* STATS */}
      <div style={{ display: "flex", gap: "24px" }}>
        <StatCard title="Total Sales" value={`$${stats.totalSales}`} icon={DollarSign} theme={theme} />
        <StatCard title="Active Products" value={stats.totalProducts} icon={Package} theme={theme} />
        <StatCard title="AI Forecast" value={stats.forecast} icon={BrainCircuit} theme={theme} />
      </div>


      {/* CHART */}

<div style={{ 
      backgroundColor: theme.surface,
      height: "400px",
      marginTop: "30px",
      borderRadius: "16px", 
      border: `1px solid ${theme.border}`, 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.muted
    }}>
      <div style={{ textAlign: "center" }}>
        <BarChart3 size={48} style={{ marginBottom: "16px", opacity: 0.2 }} />
        <p>Sales Analytics & Demand Forecasting Chart Placeholder</p>
      </div>
    </div>
</div>
  );
};

export default Dashboard;