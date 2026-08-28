import React, { useEffect, useState } from "react";
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
import { useTheme } from "../context/ThemeContext";
import Toast from "../components/common/Toast";

const INVENTORY_API =
  "http://localhost:5216/api/inventory-insights";

const REORDER_API =
  "http://localhost:5216/api/inventory-insights/reorder";

const PRODUCT_FORECAST_API =
  "http://localhost:5216/api/productforecast"

const InventoryInsights = ({ theme }) => {
  const [insights, setInsights] = useState([]);
  const [reorders, setReorders] = useState([]);
  const [productforecasts, setProductForecasts] = useState([]);
    
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
  const criticalCount = insights.filter(
  i => i.urgency === "CRITICAL"
).length;

const lowCount = insights.filter(
  i => i.urgency === "LOW"
).length;

const stableCount = insights.filter(
  i => i.urgency === "STABLE"
).length;

const averageDaysRemaining =
  insights.length > 0
    ? (
        insights.reduce(
          (sum, item) =>
            sum + item.estimatedDaysRemaining,
          0
        ) / insights.length
      ).toFixed(1)
    : 0;
    const getUrgencyColor = urgency => {
  switch (urgency) {
    case "CRITICAL":
      return "#dc2626";

    case "LOW":
      return "#ea580c";

    default:
      return "#16a34a";
  }
};
  const fetchInventoryData = async () => {
    try {
      const insightsRes = await fetch(INVENTORY_API);
      const reorderRes = await fetch(REORDER_API);
      const productforecastRes = await fetch(PRODUCT_FORECAST_API);

      if (!insightsRes.ok || !reorderRes.ok || !productforecastRes.ok) {
        throw new Error("Failed to fetch inventory analytics");
      }

      const insightsData = await insightsRes.json();
      const reorderData = await reorderRes.json();
      const productforecastData = await productforecastRes.json();

      setInsights(insightsData);
      setReorders(reorderData);
      setProductForecasts(productforecastData);

    } catch (error) {
      console.error(error);

      triggerToast(
        "Inventory Analytics Error",
        "Failed to load inventory insights.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  return (
    <>
      <Toast
        header={toast.header}
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        theme={theme}
        onClose={() =>
          setToast(prev => ({
            ...prev,
            isVisible: false
          }))
        }
      />

      <div style={{ padding: "32px" }}>
        <h1 style={{ marginBottom: "24px" }}>
          Inventory Intelligence
        </h1>
        <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "32px"
  }}
>
  {/* CRITICAL */}
  <div
    style={{
      backgroundColor: theme.colors.surface,
      padding: "20px",
      borderRadius: "16px",
      border: `1px solid ${theme.colors.border}`
    }}
  >
    <p style={{ color: theme.colors.textMuted }}>
      Critical Products
    </p>

    <h2 style={{ color: "#dc2626" }}>
      {criticalCount}
    </h2>
  </div>

  {/* LOW */}
  <div
    style={{
      backgroundColor: theme.colors.surface,
      padding: "20px",
      borderRadius: "16px",
      border: `1px solid ${theme.colors.border}`
    }}
  >
    <p style={{ color: theme.colors.textMuted }}>
      Low Stock Products
    </p>

    <h2 style={{ color: "#ea580c" }}>
      {lowCount}
    </h2>
  </div>

  {/* STABLE */}
  <div
    style={{
      backgroundColor: theme.colors.surface,
      padding: "20px",
      borderRadius: "16px",
      border: `1px solid ${theme.colors.border}`
    }}
  >
    <p style={{ color: theme.colors.textMuted }}>
      Stable Products
    </p>

    <h2 style={{ color: "#16a34a" }}>
      {stableCount}
    </h2>
  </div>

  {/* AVERAGE DAYS */}
  <div
    style={{
      backgroundColor: theme.colors.surface,
      padding: "20px",
      borderRadius: "16px",
      border: `1px solid ${theme.colors.border}`
    }}
  >
    <p style={{ color: theme.colors.textMuted }}>
      Avg Inventory Days
    </p>

    <h2>
      {averageDaysRemaining}
    </h2>
  </div>
</div>

        {/* INVENTORY TABLE */}
        <div
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px"
          }}
        >
          <h2>Inventory Analytics</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr>
                <th align="left">Product</th>
                <th align="left">Stock</th>
                <th align="left">Sold</th>
                <th align="left">Avg Daily Sales</th>
                <th align="left">Days Remaining</th>
                <th align="left">Urgency</th>
              </tr>
            </thead>

            <tbody>
              {insights.map(item => (
                <tr
  key={item.productId}
  style={{
    borderBottom:
      `1px solid ${theme.colors.border}`
  }}
>
  <td
    style={{
      padding: "14px 8px",
      fontWeight: "600"
    }}
  >
    {item.productName}
  </td>

  <td>{item.stockQuantity}</td>

  <td>{item.totalSold}</td>

  <td>
    {item.averageDailySales}
  </td>

  <td>
    {item.estimatedDaysRemaining}
  </td>

  <td>
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "999px",
        backgroundColor:
          `${getUrgencyColor(item.urgency)}20`,
        color:
          getUrgencyColor(item.urgency),
        fontWeight: "700",
        fontSize: "0.8rem"
      }}
    >
      {item.urgency}
    </span>
  </td>
</tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* REORDER SECTION */}
        <div
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: "16px",
            padding: "24px"
          }}
        >
          <h2>Reorder Suggestions</h2>

          {reorders.length === 0 ? (<p>No reorder alerts.</p>) : (reorders.map(item => (
    <div
      key={item.productId}
      style={{
        padding: "18px",
        borderRadius: "14px",
        marginBottom: "16px",
        border:
          `1px solid ${theme.colors.border}`,
        backgroundColor:
          `${getUrgencyColor(item.urgency)}10`
      }}
    >
      <h3
        style={{
          marginBottom: "8px"
        }}
      >
        {item.productName}
      </h3>

      <p>
        Current Stock:
        {" "}
        <strong>
          {item.currentStock}
        </strong>
      </p>

      <p>
        Suggested Reorder:
        {" "}
        <strong>
          {item.suggestedReorderQuantity}
        </strong>
      </p>

      <span
        style={{
          color:
            getUrgencyColor(item.urgency),
          fontWeight: "700"
        }}
      >
        {item.urgency}
      </span>
    </div>
  ))
)}

        </div>
        {/* =========================
    AI PROCUREMENT ENGINE
========================= */}
<div
  style={{
    marginTop: "32px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px"
  }}
>

  {productforecasts.slice(0, 6) .map((item) => (

    <div
      key={item.productId}
      style={{
        backgroundColor:
          theme.colors.surface,

        border:
          `1px solid ${theme.colors.border}`,

        borderRadius: "18px",

        padding: "22px",

        boxShadow:
          theme.shadows.lg
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: "18px"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >

          <div
            style={{
              width: "42px",
              height: "42px",

              borderRadius: "12px",

              backgroundColor:
                `${theme.colors.primary}15`,

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center"
            }}
          >
            <BrainCircuit
              size={20}
              color={theme.colors.primary}
            />
          </div>

          <div>
            <div
              style={{
                fontWeight: "700",
                fontSize: "15px"
              }}
            >
              {item.productName}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: theme.colors.textMuted
              }}
            >
              AI Demand Prediction
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor:
              item.confidenceScore >= 85
              ? "#dcfce7"
              : "#fef3c7",

            color:
              item.confidenceScore >= 85
              ? "#166534"
              : "#92400e",

            padding: "6px 10px",

            borderRadius: "10px",

            fontSize: "12px",

            fontWeight: "700"
          }}
        >
          {item.confidenceScore}%
        </div>
      </div>

      {/* METRICS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",

          gap: "16px",

          marginBottom: "18px"
        }}
      >

        <div>
          <div
            style={{
              color: theme.colors.textMuted,
              fontSize: "12px"
            }}
          >
            Current Stock
          </div>

          <div
            style={{
              fontWeight: "800",
              fontSize: "22px"
            }}
          >
            {item.currentStock}
          </div>
        </div>

        <div>
          <div
            style={{
              color: theme.colors.textMuted,
              fontSize: "12px"
            }}
          >
            Predicted Demand
          </div>

          <div
            style={{
              fontWeight: "800",
              fontSize: "22px"
            }}
          >
            {item.predictedDemand}
          </div>
        </div>

      </div>

      {/* RECOMMENDATION */}
      <div
        style={{
          backgroundColor:
            item.recommendedRestock > 0
            ? "#eff6ff"
            : "#f0fdf4",

          border:
            item.recommendedRestock > 0
            ? "1px solid #bfdbfe"
            : "1px solid #bbf7d0",

          borderRadius: "14px",

          padding: "14px"
        }}
      >

        {item.recommendedRestock > 0 ? (

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <Warehouse
              size={22}
              color="#2563eb"
            />

            <div>

              <div
                style={{
                  fontWeight: "700"
                }}
              >
                Recommended Restock
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: theme.colors.textMuted
                }}
              >
                Procure
                {" "}
                <strong>
                  {item.recommendedRestock}
                </strong>
                {" "}
                additional units
              </div>

            </div>
          </div>

        ) : (

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <ShieldAlert
              size={22}
              color="#16a34a"
            />

            <div>

              <div
                style={{
                  fontWeight: "700"
                }}
              >
                Stock Level Healthy
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: theme.colors.textMuted
                }}
              >
                No procurement needed
              </div>

            </div>
          </div>

        )}

      </div>

    </div>
  ))}

</div>
      </div>
    </>
  );
};

export default InventoryInsights;