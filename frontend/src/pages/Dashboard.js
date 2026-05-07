import React, { useEffect, useState } from "react";
import {
  DollarSign,
  Package,
  BrainCircuit,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Warehouse,
  Boxes,
  PackageSearch,
  ShieldAlert,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";
import Toast from "../components/Toast";

const StatCard = ({
  title,
  value,
  icon: Icon,
  theme
}) => (
  <div
    style={{
      backgroundColor: theme.surface,
      padding: "24px",
      borderRadius: "16px",
      border: `1px solid ${theme.border}`,
      flex: 1,
      minWidth: "240px"
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px"
      }}
    >
      <span style={{ color: theme.muted }}>
        {title}
      </span>
      <Icon
        color={theme.primary}
        size={20}
      />
    </div>

    <div
      style={{
        fontSize: "1.75rem",
        fontWeight: "800"
      }}
    >
      {value}
    </div>
  </div>
);

const Dashboard = ({ theme }) => {
  const DASHBOARD_API =
    "http://localhost:5216/api/dashboard";

    const INVENTORY_INSIGHT_API =
  "http://localhost:5216/api/inventoryinsights";

  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    forecast: "",
    lowStock: 0,
    recentOrders: [],
    salesTrend: [] // ✅ ADD THIS
  });

  const [fastMovingProducts, setFastMovingProducts] =
  useState([]);

  const [deadStockProducts, setDeadStockProducts] =
  useState([]);

  const [reorderSuggestions, setReorderSuggestions] =
  useState([]);

  const [stockMovement, setStockMovement] =
  useState([]);

  // ================= TOAST STATE =================
  const [toast, setToast] = useState({
    isVisible: false,
    header: "",
    message: "",
    type: "info"
  });

  const triggerToast = (
    header,
    message,
    type = "info"
  ) => {
    setToast({
      isVisible: false,
      header,
      message,
      type
    });

    setTimeout(() => {
      setToast({
        isVisible: true,
        header,
        message,
        type
      });
    }, 10);
  };

  const chartData = stats.salesTrend?.map(item => ({
  date: item.date,
  revenue: item.totalRevenue,
  orders: item.orderCount,
  forecast: item.forecast ?? null // future-ready
})) || [];

const stockMovementChartData =
  stockMovement.map(item => ({
    name: item.productName,
    sold: item.totalSold,
    stock: item.currentStock
  }));

  const criticalStockCount =
  stockMovement.filter(
    item => item.currentStock <= 5
  ).length;

const fastMovingCount =
  fastMovingProducts.filter(
    item => item.velocityCategory === "FAST"
  ).length;

const deadStockCount =
  deadStockProducts.length;

// ================= FETCH FAST MOVERS =================
const fetchFastMovingProducts = async () => {
  try {
    const res = await fetch(
      `${INVENTORY_INSIGHT_API}/fast-moving`
    );

    const data = await res.json();

    setFastMovingProducts(data);

  } catch (error) {
    console.error(error);
  }
};

// ================= FETCH DEAD STOCK =================
const fetchDeadStock = async () => {
  try {
    const res = await fetch(
      `${INVENTORY_INSIGHT_API}/dead-stock`
    );

    const data = await res.json();

    setDeadStockProducts(data);

  } catch (error) {
    console.error(error);
  }
};

// ================= FETCH REORDER =================
const fetchReorderSuggestions = async () => {
  try {
    const res = await fetch(
      `${INVENTORY_INSIGHT_API}/reorder`
    );

    const data = await res.json();

    setReorderSuggestions(data);

  } catch (error) {
    console.error(error);
  }
};

// ================= FETCH STOCK MOVEMENT =================
const fetchStockMovement = async () => {
  try {
    const res = await fetch(
      `${INVENTORY_INSIGHT_API}/stock-movement`
    );

    const data = await res.json();

    setStockMovement(data);

  } catch (error) {
    console.error(error);
  }
};

  // ================= FETCH DASHBOARD =================
  const fetchDashboardData = async () => {
    try {
      const res = await fetch(
        DASHBOARD_API
      );

      if (!res.ok) {
        throw new Error(
          `Server Error: ${res.status}`
        );
      }

      const data = await res.json();

      setStats({
        totalSales: data.totalSales,
        totalProducts:
          data.totalProducts,
        forecast: data.forecast,
        lowStock:
          data.lowStockCount,
        recentOrders:
          data.recentOrders,
           salesTrend: data.salesTrend || [] // ✅ ADD THIS
      });
    } catch (error) {
      console.error(
        "Dashboard fetch error:",
        error
      );

      triggerToast(
        "Dashboard API Error",
        "Failed to connect to backend server. Please check if your ASP.NET API is running.",
        "error"
      );
    }
  };

 useEffect(() => {
  fetchDashboardData();

  fetchFastMovingProducts();

  fetchDeadStock();

  fetchReorderSuggestions();

  fetchStockMovement();

}, []);

  return (
    <div>
      {/* TOAST */}
      <Toast
        header={toast.header}
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        theme={theme}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            isVisible: false
          }))
        }
      />

      {/* LOW STOCK ALERT */}
      {stats.lowStock > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#c2410c",
            border:
              "1px solid #ffedd5",
            padding: "16px",
            backgroundColor:
              "#fff7ed",
            borderRadius: "12px",
            marginBottom: "32px"
          }}
        >
          <AlertTriangle size={22} />

          <span
            style={{
              fontWeight: "600"
            }}
          >
            Low Stock Alert:{" "}
            {stats.lowStock} products
            require immediate restock.
          </span>
        </div>
      )}

      {/* STATS */}
      <div
        style={{
          display: "flex",
          gap: "24px"
        }}
      >
        <StatCard
          title="Total Sales"
          value={`$${stats.totalSales}`}
          icon={DollarSign}
          theme={theme}
        />

        <StatCard
          title="Active Products"
          value={stats.totalProducts}
          icon={Package}
          theme={theme}
        />

        <StatCard
          title="AI Forecast"
          value={stats.forecast}
          icon={BrainCircuit}
          theme={theme}
        />
      </div>

      {/* CHART SECTION */}
      <div
        style={{
          backgroundColor:
            theme.surface,
          height: "440px",
          marginTop: "30px",
          borderRadius: "16px",
          border: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.muted
        }}
      >
        {stats.salesTrend.length === 0 ? (
  <div style={{ textAlign: "center" }}>
    <BarChart3
      size={48}
      style={{
        marginBottom: "16px",
        opacity: 0.2
      }}
    />
    <p>No sales data available</p>
  </div>
) : (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />

 <XAxis
  dataKey="date"
  tickFormatter={(d) => d.slice(5)}
/>

  {/* LEFT AXIS → Revenue */}
  <YAxis
    yAxisId="left"
    orientation="left"
  />

  {/* RIGHT AXIS → Orders */}
  <YAxis
    yAxisId="right"
    orientation="right"
  />

 <Tooltip
  formatter={(value, name) => {
    if (name === "revenue") return [`$${value}`, "Revenue"];
    if (name === "orders") return [value, "Orders"];
  }}
/>

  {/* Revenue Line */}
  <Line
    yAxisId="left"
    type="monotone"
    dataKey="revenue"
    stroke="#3b82f6"
    strokeWidth={2}
  />

  {/* Orders Line */}
  <Line
    yAxisId="right"
    type="monotone"
    dataKey="orders"
    stroke="#10b981"
    strokeWidth={2}
  />

{/* AI Forecast Line */}
  <Line
  yAxisId="left"
  type="monotone"
  dataKey="AI forecast"
  stroke="#f59e0b"
  strokeDasharray="5 5"
/>
</LineChart>
  </ResponsiveContainer>
)}
      </div>
      {/* INVENTORY HEALTH KPIs */}
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "30px"
  }}
>

  {/* CRITICAL STOCK */}
  <div
    style={{
      backgroundColor: theme.surface,
      padding: "20px",
      borderRadius: "16px",
      border: `1px solid ${theme.border}`
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span>Critical Inventory</span>

      <AlertTriangle color="#ef4444" />
    </div>

    <h2 style={{ marginTop: "20px" }}>
      {criticalStockCount}
    </h2>

    <p style={{ color: theme.muted }}>
      Products nearing depletion
    </p>
  </div>

  {/* FAST MOVERS */}
  <div
    style={{
      backgroundColor: theme.surface,
      padding: "20px",
      borderRadius: "16px",
      border: `1px solid ${theme.border}`
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span>Fast Movers</span>

      <TrendingUp color="#10b981" />
    </div>

    <h2 style={{ marginTop: "20px" }}>
      {fastMovingCount}
    </h2>

    <p style={{ color: theme.muted }}>
      High demand products
    </p>
  </div>

  {/* DEAD STOCK */}
  <div
    style={{
      backgroundColor: theme.surface,
      padding: "20px",
      borderRadius: "16px",
      border: `1px solid ${theme.border}`
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span>Dead Stock</span>

      <Warehouse color="#f59e0b" />
    </div>

    <h2 style={{ marginTop: "20px" }}>
      {deadStockCount}
    </h2>

    <p style={{ color: theme.muted }}>
      Stagnant inventory items
    </p>
  </div>

</div>
{/* STOCK MOVEMENT ANALYTICS */}
<div
  style={{
    backgroundColor: theme.surface,
    marginTop: "30px",
    borderRadius: "16px",
    border: `1px solid ${theme.border}`,
    padding: "24px"
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px"
    }}
  >
    <Boxes color="#3b82f6" />

    <h3 style={{ margin: 0 }}>
      Stock Movement Analytics
    </h3>
  </div>

  <div style={{ height: "350px" }}>
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={stockMovementChartData}
      >
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Legend />

        {/* SOLD */}
        <Bar
          dataKey="sold"
          fill="#3b82f6"
        />

        {/* CURRENT STOCK */}
        <Bar
          dataKey="stock"
          fill="#10b981"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

{/* SMART WAREHOUSE INTELLIGENCE */}
<div
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px"
  }}
>

  {/* FAST MOVERS */}
  <div
    style={{
      backgroundColor: theme.surface,
      borderRadius: "16px",
      padding: "20px",
      border: `1px solid ${theme.border}`
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px"
      }}
    >
      <TrendingUp color="#10b981" />
      <h3 style={{ margin: 0 }}>
        Fast Moving Products
      </h3>
    </div>

    {fastMovingProducts.slice(0, 5).map(product => (
      <div
        key={product.productId}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: `1px solid ${theme.border}`
        }}
      >
        <div>
          <strong>{product.productName}</strong>

          <div
            style={{
              fontSize: "0.8rem",
              color: theme.muted
            }}
          >
            {product.velocityCategory}
          </div>
        </div>

        <div
          style={{
            fontWeight: "700",
            color: "#10b981"
          }}
        >
          {product.totalSold} sold
        </div>
      </div>
    ))}
  </div>

  {/* DEAD STOCK */}
  <div
    style={{
      backgroundColor: theme.surface,
      borderRadius: "16px",
      padding: "20px",
      border: `1px solid ${theme.border}`
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px"
      }}
    >
      <ShieldAlert color="#ef4444" />
      <h3 style={{ margin: 0 }}>
        Dead Stock Alerts
      </h3>
    </div>

    {deadStockProducts.slice(0, 5).map(product => (
      <div
        key={product.productId}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: `1px solid ${theme.border}`
        }}
      >
        <div>
          <strong>{product.productName}</strong>

          <div
            style={{
              fontSize: "0.8rem",
              color: theme.muted
            }}
          >
            {product.daysInInventory} days idle
          </div>
        </div>

        <div
          style={{
            color: "#ef4444",
            fontWeight: "700"
          }}
        >
          {product.riskLevel}
        </div>
      </div>
    ))}
  </div>

</div>
    </div>
  );
};

export default Dashboard;