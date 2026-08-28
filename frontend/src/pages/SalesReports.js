import React, { useEffect, useState } from "react";
import Toast from "../components/common/Toast";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  PackageCheck
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useTheme } from "../context/ThemeContext";
const REPORT_API = "http://localhost:5216/api/reports";

// ---------------- Analytics Card ----------------
const AnalyticsCard = ({ title, value, icon: Icon, color, theme }) => (
  <div
    style={{
      backgroundColor: theme.colors.surface,
      padding: "24px",
      borderRadius: "16px",
      border: `1px solid ${theme.colors.border}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span
        style={{
          color: theme.colors.textMuted,
          fontSize: "0.85rem",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}
      >
        {title}
      </span>

      <div
        style={{
          color: color,
          backgroundColor: `${color}15`,
          padding: "8px",
          borderRadius: "10px"
        }}
      >
        <Icon size={18} />
      </div>
    </div>

    <h3
      style={{
        margin: 0,
        fontSize: "1.5rem",
        fontWeight: "700",
        color: theme.colors.text
      }}
    >
      {value}
    </h3>
  </div>
);

// ---------------- Order Row ----------------
const OrderRow = ({ order, theme }) => {
  const completedStyle = {
    bg: "#dcfce7",
    text: "#166534"
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: `1px solid ${theme.colors.border}`,
        gap: "12px"
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: "0.9rem",
            fontWeight: "600",
            color: theme.colors.text
          }}
        >
          Order #{order.orderId}
        </p>

        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            color: theme.colors.textMuted
          }}
        >
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <div style={{ textAlign: "right", marginRight: "12px" }}>
        <p
          style={{
            margin: 0,
            fontSize: "0.9rem",
            fontWeight: "700",
            color: theme.colors.text
          }}
        >
          ${order.amount}
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 8px",
            borderRadius: "12px",
            backgroundColor: completedStyle.bg,
            color: completedStyle.text,
            fontSize: "0.7rem",
            fontWeight: "600",
            marginTop: "4px"
          }}
        >
          <CheckCircle2 size={14} />
          Completed
        </div>
      </div>
    </div>
  );
};

// ---------------- Main Component ----------------
const SalesReports = ({ theme }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Date Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Toast State
  const [toast, setToast] = useState({
    isVisible: false,
    header: "",
    message: "",
    type: "info"
  });

  const triggerToast = (header, message, type = "info") => {
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

  // ---------------- Fetch Report ----------------
  const fetchSalesReport = async () => {
    try {
      setLoading(true);

      let url = REPORT_API;

      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }

      const data = await response.json();

      setReportData(data);
    } catch (error) {
      console.error(error);

      triggerToast(
        "Report Error",
        "Failed to fetch sales report data.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesReport();
  }, [startDate, endDate]);

  // ---------------- Export ----------------
  const handleExport = async (type) => {
    try {
      const response = await fetch(
        `${REPORT_API}/export/${type}`
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      a.download = `sales-report.${
        type === "excel" ? "xlsx" : type
      }`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      triggerToast(
        "Export Success",
        `${type.toUpperCase()} report exported successfully.`,
        "success"
      );
    } catch (error) {
      console.error(error);

      triggerToast(
        "Export Failed",
        `Failed to export ${type.toUpperCase()} report.`,
        "error"
      );
    }
  };

  const historicalData =
  reportData?.salesTrend?.map(item => ({
    date: item.date,
    revenue: item.totalRevenue,
    orders: item.orderCount
  })) || [];

const futureData =
  reportData?.forecast?.map(item => ({
    date: item.date,
    forecast: item.predictedRevenue
  })) || [];

const chartData = [
  ...historicalData,
  ...futureData
];

  const forecastData =
  reportData?.forecast?.map(item => ({
    date: item.date,
    forecast: item.predictedRevenue
  })) || [];

  if (loading) {
    return (
      <div style={{ padding: "32px", color: theme.colors.text }}>
        Loading Sales Reports...
      </div>
    );
  }

  return (
    <>
      {/* Toast */}
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

      <div
        style={{
          padding: "32px",
          maxWidth: "1700px",
          margin: "0 auto",
          fontFamily: "Inter, system-ui, sans-serif"
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.9rem",
                fontWeight: "800",
                color: theme.colors.text,
                letterSpacing: "-0.5px"
              }}
            >
              Sales Analytics
            </h1>

            <p style={{ color: theme.colors.textMuted }}>
              Detailed financial performance and forecasting.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.surface,
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                fontSize: "0.9rem", 
                fontWeight: "600", 
                color: theme.colors.text
              }}
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.surface,
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                fontSize: "0.9rem", 
                fontWeight: "600", 
                color: theme.colors.text
              }}
            />
          </div>
        </div>

        {/* Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginBottom: "32px"
          }}
        >
          {/* Forecast Card */}
          <div
            style={{
              backgroundColor: theme.colors.surface,
              padding: "24px",
              borderRadius: "20px",
              border: `1px solid ${theme.colors.border}`,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
                alignItems: "center"
              }}
            >
              <h3 style={{ margin: 0,fontSize: "1.1rem", fontWeight: "700", color: theme.colors.text }}>
                Revenue Forecast
              </h3>

              <div
                style={{
                 color: "#2563eb", 
                 fontSize: "0.8rem", 
                 fontWeight: "700", 
                 backgroundColor: "#eff6ff", 
                 padding: "4px 10px", 
                 borderRadius: "8px"
                }}
              >
                ML.NET Powered
              </div>
            </div>

            <div
  style={{
    height: "420px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: `2px dashed ${theme.colors.border}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: theme.colors.textMuted
  }}
>
  {chartData.length === 0 ? (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        color: theme.colors.textMuted
      }}
    >
      No analytics data available
    </div>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        {/* Revenue */}
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          strokeWidth={2}
        />

        {/* Orders */}
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#10b981"
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="forecast"
          stroke="rgb(245, 158, 11)"
          strokeWidth={2}
          strokeDasharray="5 5"
/>
      </LineChart>
    </ResponsiveContainer>
  )}
</div>
          </div>

          {/* Recent Orders */}
          <div
            style={{
              backgroundColor: theme.colors.surface,
              padding: "24px",
              borderRadius: "20px",
              border: `1px solid ${theme.colors.border}`,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <h3 style={{ margin: 0,fontSize: "1.1rem", fontWeight: "700", color: theme.colors.text }}>
                Recent Orders
              </h3>

              <div style={{ backgroundColor: "none", border: "none", color: theme.colors.primary, fontWeight: "600", fontSize: "0.85rem", cursor: "pointer", display: "flex", gap: "12px" }}>
                <button onClick={() => handleExport("pdf")}>
                  Export PDF
                </button>

                <button onClick={() => handleExport("csv")}>
                  Export CSV
                </button>

                <button onClick={() => handleExport("excel")}>
                  Export Excel
                </button>
              </div>
            </div>

            <div style={{ flex: 1, marginTop: "20px" }}>
              {reportData?.recentOrders?.length > 0 ? (
                reportData.recentOrders.map((order) => (
                  <OrderRow
                    key={order.orderId}
                    order={order}
                    theme={theme}
                  />
                ))
              ) : (
                <p style={{ color: theme.colors.textMuted }}>
                  No recent orders found.
                </p>
              )}
            </div>

            <button
              style={{
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
              }}
            >
              Download Daily Log
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Cards */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap"
          }}
        >
          <AnalyticsCard
            title="Today Revenue"
            value={`$${reportData?.todayRevenue || 0}`}
            icon={DollarSign}
            color="#10b981"
            theme={theme}
          />

          <AnalyticsCard
            title="Weekly Revenue"
            value={`$${reportData?.weeklyRevenue || 0}`}
            icon={TrendingUp}
            color="#3b82f6"
            theme={theme}
          />

          <AnalyticsCard
            title="Total Orders"
            value={reportData?.totalOrders || 0}
            icon={ShoppingBag}
            color="#8b5cf6"
            theme={theme}
          />

          <AnalyticsCard
            title="Best Seller"
            value={reportData?.bestSeller || "No sales yet"}
            icon={PackageCheck}
            color="#f59e0b"
            theme={theme}
          />
        </div>
      </div>
    </>
  );
};

export default SalesReports;