import React, { useEffect, useState, useRef } from "react";
import Toast from "../components/common/Toast";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  PackageCheck,
  Download,
  ChevronDown,
  ArrowUpRight,
  Clock
} from "lucide-react";
import {
  ComposedChart,
  Area,
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: theme.colors.textMuted, fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {title}
      </span>
      <div style={{ color: color, backgroundColor: `${color}15`, padding: "8px", borderRadius: "10px" }}>
        <Icon size={18} />
      </div>
    </div>
    <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700", color: theme.colors.text }}>
      {value}
    </h3>
  </div>
);

// ---------------- Modern SaaS Order Row ----------------
const OrderRow = ({ order, theme }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderRadius: "12px",
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        marginBottom: "10px",
        transition: "all 0.2s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#3b82f6";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.colors.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          color: "#3b82f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "0.85rem"
        }}>
          <ShoppingBag size={18} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "700", color: theme.colors.text, letterSpacing: "-0.2px" }}>
            Order #{order.orderId}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
            <Clock size={12} color={theme.colors.textMuted} />
            <span style={{ fontSize: "0.75rem", color: theme.colors.textMuted }}>
              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: "800", color: theme.colors.text }}>
          ${Number(order.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "20px", backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontSize: "0.7rem", fontWeight: "700", marginTop: "4px" }}>
          <CheckCircle2 size={12} />
          Completed
        </div>
      </div>
    </div>
  );
};

// ---------------- Premium Tooltip ----------------
const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, padding: '12px 16px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold', color: theme.colors.textMuted }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: '4px 0', fontSize: '14px', fontWeight: '600', color: entry.color }}>
            {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}: {entry.name === 'orders' ? '' : '$'}{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ---------------- Main Component ----------------
const SalesReports = ({ theme }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [toast, setToast] = useState({ isVisible: false, header: "", message: "", type: "info" });
  const dropdownRef = useRef(null);

  const triggerToast = (header, message, type = "info") => {
    setToast({ isVisible: false, header, message, type });
    setTimeout(() => { setToast({ isVisible: true, header, message, type }); }, 10);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSalesReport = async () => {
    try {
      setLoading(true);
      let url = REPORT_API;
      if (startDate && endDate) url += `?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch report");
      setReportData(await response.json());
    } catch (error) {
      triggerToast("Report Error", "Failed to fetch sales report data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSalesReport(); }, [startDate, endDate]);

  const handleExport = async (type) => {
    setShowExportMenu(false);
    try {
      const response = await fetch(`${REPORT_API}/export/${type}`);
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sales-report.${type === "excel" ? "xlsx" : type}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      triggerToast("Export Success", `${type.toUpperCase()} report exported successfully.`, "success");
    } catch (error) {
      triggerToast("Export Failed", `Failed to export ${type.toUpperCase()} report.`, "error");
    }
  };

  const chartData = [
    ...(reportData?.salesTrend?.map(item => ({ date: item.date, revenue: item.totalRevenue, orders: item.orderCount })) || []),
    ...(reportData?.forecast?.map(item => ({ date: item.date, forecast: item.predictedRevenue })) || [])
  ];

  if (loading) return <div style={{ padding: "32px", color: theme.colors.text }}>Loading Sales Reports...</div>;

  return (
    <>
      <Toast header={toast.header} message={toast.message} type={toast.type} isVisible={toast.isVisible} theme={theme} onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))} />

      <div style={{ padding: "32px", maxWidth: "1700px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: "800", color: theme.colors.text, letterSpacing: "-0.5px" }}>Sales Analytics</h1>
            <p style={{ color: theme.colors.textMuted }}>Detailed financial performance and forecasting.</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ padding: "10px 16px", borderRadius: "10px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, cursor: "pointer", color: theme.colors.text }} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: "10px 16px", borderRadius: "10px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, cursor: "pointer", color: theme.colors.text }} />
          </div>
        </div>

        {/* Top Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "32px" }}>

          {/* Premium Chart Card */}
          <div style={{ backgroundColor: theme.colors.surface, padding: "24px", borderRadius: "20px", border: `1px solid ${theme.colors.border}`, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: theme.colors.text }}>Revenue Forecast</h3>
              <div style={{ color: "#2563eb", fontSize: "0.8rem", fontWeight: "700", backgroundColor: "#eff6ff", padding: "4px 10px", borderRadius: "8px" }}>
                ML.NET Powered
              </div>
            </div>

            <div style={{ height: "420px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              {chartData.length === 0 ? (
                <div style={{ color: theme.colors.textMuted }}>No analytics data available</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={theme.colors.border} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: theme.colors.textMuted, fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.colors.textMuted, fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip theme={theme} />} />

                    {/* Area for historical revenue */}
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, strokeWidth: 0 }} />

                    {/* Lines for orders & forecast */}
                    <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="forecast" stroke="rgb(245, 158, 11)" strokeWidth={3} strokeDasharray="6 6" dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Modernized SaaS Recent Orders Section */}
          <div style={{ backgroundColor: theme.colors.surface, padding: "24px", borderRadius: "20px", border: `1px solid ${theme.colors.border}`, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: theme.colors.text, letterSpacing: "-0.3px" }}>Recent Orders</h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: theme.colors.textMuted }}>Live transaction feed</p>
              </div>

              {/* Dropdown Container */}
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#3b82f6", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", transition: "0.2s" }}
                >
                  <Download size={14} /> Export <ChevronDown size={14} />
                </button>

                {showExportMenu && (
                  <div style={{ position: "absolute", top: "110%", right: 0, width: "140px", backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: "8px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)", zIndex: 10, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    {["pdf", "csv", "excel", "docx"].map((format, index, formats) => (
                      <button
                        key={format}
                        onClick={() => handleExport(format)}
                        style={{ padding: "10px 16px", textAlign: "left", background: "none", border: "none", borderBottom: index !== formats.length - 1 ? `1px solid ${theme.colors.border}` : "none", color: theme.colors.text, fontSize: "0.85rem", fontWeight: "500", cursor: "pointer" }}
                        onMouseOver={(e) => e.target.style.backgroundColor = `${theme.colors.primary}15`}
                        onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                      >
                        Export as {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", maxHeight: "360px", paddingRight: "2px" }}>
              {reportData?.recentOrders?.length > 0 ? (
                reportData.recentOrders.map((order) => <OrderRow key={order.orderId} order={order} theme={theme} />)
              ) : (
                <div style={{ padding: "32px 0", textAlign: "center", color: theme.colors.textMuted, fontSize: "0.9rem" }}>
                  No recent orders found.
                </div>
              )}
            </div>

            <button
              style={{
                marginTop: "16px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.05)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.background}
            >
              Download Daily Log <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Cards */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <AnalyticsCard title="Today Revenue" value={`$${reportData?.todayRevenue || 0}`} icon={DollarSign} color="#10b981" theme={theme} />
          <AnalyticsCard title="Weekly Revenue" value={`$${reportData?.weeklyRevenue || 0}`} icon={TrendingUp} color="#3b82f6" theme={theme} />
          <AnalyticsCard title="Total Orders" value={reportData?.totalOrders || 0} icon={ShoppingBag} color="#8b5cf6" theme={theme} />
          <AnalyticsCard title="Best Seller" value={reportData?.bestSeller || "No sales yet"} icon={PackageCheck} color="#f59e0b" theme={theme} />
        </div>
      </div>
    </>
  );
};

export default SalesReports;
