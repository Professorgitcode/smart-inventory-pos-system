import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  Calendar,
  Sun,
  Bell,
  Info,
  Activity,
  BrainCircuit,
  ShieldAlert,
  Warehouse
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import MiniStat from "../components/dashboard/MiniStat";
import TableCard from "../components/dashboard/TableCard";
import StatCard from "../components/dashboard/StatCard";
import InventoryHealthChart from "../components/dashboard/InventoryHealthChart";
import RevenueForecastChart from "../components/dashboard/RevenueForecastChart";
import AIRecommendationWidget from "../components/dashboard/AIRecommendationWidget";
import QuickActionsPanel from "../components/dashboard/QuickActionsPanel";
import EnterpriseDashboardHeader from "../components/dashboard/EnterpriseDashboardHeader";
import { Card } from "../components/ui/cards/Card";
import { useTheme } from "../context/ThemeContext";
import Toast from "../components/common/Toast";

const Dashboard = ({ theme }) => {
  // ================= API URLs =================
  const DASHBOARD_API = "http://localhost:5216/api/dashboard";
  const INVENTORY_INSIGHT_API = "http://localhost:5216/api/inventoryinsights";
  const FORECAST_API = "http://localhost:5216/api/forecast";
  const PRODUCT_FORECAST_API = "http://localhost:5216/api/productforecast";

  // ================= STATE =================
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    forecast: "",
    lowStock: 0,
    recentOrders: [],
    salesTrend: [],
    forecastData: []
  });

  const [fastMovingProducts, setFastMovingProducts] = useState([]);
  const [deadStockProducts, setDeadStockProducts] = useState([]);
  const [reorderSuggestions, setReorderSuggestions] = useState([]);
  const [stockMovement, setStockMovement] = useState([]);
  const [productForecasts, setProductForecasts] = useState([]);

  // ================= TOAST =================
  const [toast, setToast] = useState({
    isVisible: false,
    header: "",
    message: "",
    type: "info"
  });

  const triggerToast = (header, message, type = "info") => {
    setToast({ isVisible: false, header, message, type });
    setTimeout(() => {
      setToast({ isVisible: true, header, message, type });
    }, 10);
  };

  // ================= FETCH DASHBOARD =================
  const fetchDashboardData = async () => {
    try {
      const res = await fetch(DASHBOARD_API);
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);

      const data = await res.json();
      const forecastRes = await fetch(FORECAST_API);
      const forecastData = await forecastRes.json();

      setStats({
        totalSales: data.totalSales,
        totalProducts: data.totalProducts,
        forecast: data.forecast,
        lowStock: data.lowStockCount,
        recentOrders: data.recentOrders,
        salesTrend: data.salesTrend || [],
        forecastData: forecastData || []
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      triggerToast(
        "Dashboard API Error",
        "Failed to connect to backend server.",
        "error"
      );
    }
  };

  // ================= FETCH FAST MOVERS =================
  const fetchFastMovingProducts = async () => {
    try {
      const res = await fetch(`${INVENTORY_INSIGHT_API}/fast-moving`);
      const data = await res.json();
      setFastMovingProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= FETCH DEAD STOCK =================
  const fetchDeadStock = async () => {
    try {
      const res = await fetch(`${INVENTORY_INSIGHT_API}/dead-stock`);
      const data = await res.json();
      setDeadStockProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= FETCH REORDER =================
  const fetchReorderSuggestions = async () => {
    try {
      const res = await fetch(`${INVENTORY_INSIGHT_API}/reorder`);
      const data = await res.json();
      setReorderSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= FETCH STOCK MOVEMENT =================
  const fetchStockMovement = async () => {
    try {
      const res = await fetch(`${INVENTORY_INSIGHT_API}/stock-movement`);
      const data = await res.json();
      setStockMovement(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= FETCH PRODUCT FORECASTS =================
  const fetchProductForecasts = async () => {
    try {
      const res = await fetch(PRODUCT_FORECAST_API);
      const data = await res.json();
      setProductForecasts(data);
    } catch (error) {
      console.error("Forecast Error:", error);
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchDashboardData();
    fetchFastMovingProducts();
    fetchDeadStock();
    fetchReorderSuggestions();
    fetchStockMovement();
    fetchProductForecasts();
  }, []);

  // ================= REAL DATA MAPPING =================
  const revenueData =
    stats.forecastData?.map(item => ({
      date: item.date,
      actual: item.actualRevenue,
      predicted: item.predictedRevenue,
      confidence: item.confidenceScore
    })) || [];

  const movementData = stockMovement.map(item => ({
    name: item.productName,
    sold: item.totalSold,
    stock: item.currentStock
  }));

  const criticalStockCount = stockMovement.filter(
    item => item.currentStock <= 5
  ).length;

  const fastMovingCount = fastMovingProducts.filter(
    item => item.velocityCategory === "FAST"
  ).length;

  const deadStockCount = deadStockProducts.length;

  const healthyPercentage = Math.max(
    0,
    100 - (stats.lowStock / Math.max(stats.totalProducts, 1)) * 100
  );

  const healthData = [
    { name: "Healthy", value: Math.round(healthyPercentage), color: "#06b6d4" },
    {
      name: "At Risk",
      value: Math.round((stats.lowStock / Math.max(stats.totalProducts, 1)) * 70),
      color: "#f59e0b"
    },
    {
      name: "Critical",
      value: Math.round((stats.lowStock / Math.max(stats.totalProducts, 1)) * 30),
      color: "#ef4444"
    }
  ];

  return (
    <div
      style={{
        padding: "32px",
        backgroundColor: theme.colors.background,
        minHeight: "100vh",
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.primary,
        boxSizing: "border-box"
      }}
    >
      {/* TOAST */}
      <Toast
        header={toast.header}
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        theme={theme}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      {/* HEADER */}
      <EnterpriseDashboardHeader theme={theme} user="Albert" />

      {/* QUICK ACTIONS */}
      <QuickActionsPanel theme={theme} />

      {/* AI RECOMMENDATIONS */}
      <AIRecommendationWidget theme={theme} />

      {/* TOP STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px"
        }}
      >
        <StatCard
          theme={theme}
          icon={<DollarSign size={20} color="#3b82f6" />}
          label="Total Revenue"
          value={`$${stats.totalSales.toLocaleString()}`}
          trend="+12.4%"
          positive
        />
        <StatCard
          theme={theme}
          icon={<ShoppingCart size={20} color="#3b82f6" />}
          label="Orders"
          value={stats.salesTrend.length}
          trend="+8.7%"
          positive
        />
        <StatCard
          theme={theme}
          icon={<Package size={20} color="#3b82f6" />}
          label="Products"
          value={stats.totalProducts}
          trend="+5.2%"
          positive
        />
        <StatCard
          theme={theme}
          icon={<AlertTriangle size={20} color="#ef4444" />}
          label="Low Stock"
          value={stats.lowStock}
          trend="-4.3%"
        />
      </div>

      {/* MAIN CHARTS ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "32px"
        }}
      >
        <RevenueForecastChart theme={theme} revenueData={revenueData} />
        <InventoryHealthChart
          theme={theme}
          healthData={healthData}
          healthyPercentage={healthyPercentage}
        />
      </div>

      {/* BOTTOM SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.5fr",
          gap: "24px",
          marginBottom: "32px"
        }}
      >
        {/* FAST MOVERS */}
        <TableCard
          theme={theme}
          title="Fast Moving Products"
          items={fastMovingProducts.slice(0, 5).map(product => ({
            name: product.productName,
            stat: `${product.totalSold}`,
            badge: product.velocityCategory,
            bColor: "#06b6d4"
          }))}
        />

        {/* DEAD STOCK */}
        <TableCard
          theme={theme}
          title="Dead Stock Alerts"
          items={deadStockProducts.slice(0, 5).map(product => ({
            name: product.productName,
            stat: `${product.daysInInventory} Days`,
            badge: product.riskLevel,
            bColor: "#ef4444"
          }))}
        />

        {/* STOCK MOVEMENT */}
        <div style={cardStyle(theme)}>
          <div style={cardHeader}>
            <h3 style={cardTitle(theme)}>Stock Movement Overview</h3>
          </div>

          <div style={{ height: "260px", marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={movementData}>
                <XAxis dataKey="name" hide />
                <Tooltip
  cursor={{ fill: theme.mode === 'dark' ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)" }}
  contentStyle={{
    backgroundColor: theme.colors.surface, 
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius?.md || "12px",
    color: theme.colors.text,
    boxShadow: theme.shadows?.md || "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    fontFamily: theme.typography.fontFamily.primary
  }}
  itemStyle={{
    fontWeight: 600
  }}
  formatter={(value, name) => [`${value} units`, name === "sold" ? "Sold" : "Stock"]}
  labelFormatter={(label, payload) => {
    if (!payload?.length) return label;
    return `${label}`;
  }}
/>
                <Bar
                  dataKey="sold"
                  fill={theme.colors.primary || "#3b82f6"}
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="stock"
                  fill="rgba(255, 255, 255, 0.15)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FOOTER STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px"
        }}
      >
        <MiniStat theme={theme} label="Critical Inventory" val={criticalStockCount} sub="Products" />
        <MiniStat theme={theme} label="Fast Movers" val={fastMovingCount} sub="Products" />
        <MiniStat theme={theme} label="Total Stock Value" val={`$${stats.totalSales.toLocaleString()}`} sub="Inventory worth" />
        <MiniStat theme={theme} label="Reorder Suggestions" val={reorderSuggestions.length} sub="Items" />
        <MiniStat theme={theme} label="Dead Stock" val={deadStockCount} sub="Potential loss" />
      </div>
    </div>
  );
};

// ================= STYLES =================

const cardStyle = (theme) => ({
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius?.xl || "24px",
  padding: "28px",
  boxShadow: theme.shadows?.sm || "none"
});

const iconButtonStyle = (theme) => ({
  padding: "8px",
  borderRadius: theme.radius?.md || "12px",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  cursor: "pointer",
  color: theme.colors.text,
  transition: "all 0.2s ease"
});

const badgeStyle = {
  position: "absolute",
  top: "-4px",
  right: "-4px",
  backgroundColor: "#3b82f6",
  color: "white",
  fontSize: "10px",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800"
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const cardTitle = (theme) => ({
  margin: 0,
  fontSize: theme.typography?.fontSize?.lg || "16px",
  fontWeight: theme.typography?.fontWeight?.bold || "700",
  color: theme.colors.text,
  letterSpacing: "0.2px"
});

const pillStyle = {
  backgroundColor: "rgba(16, 185, 129, 0.15)",
  color: "#10b981",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.5px",
  textTransform: "uppercase"
};

const selectStyle = (theme) => ({
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: `1px solid rgba(255, 255, 255, 0.1)`,
  borderRadius: theme.radius?.sm || "8px",
  padding: "6px 12px",
  fontSize: "13px",
  color: "#ffffff",
  outline: "none",
  cursor: "pointer"
});

const centerLabel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center"
};

const legendRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0"
};

export default Dashboard;