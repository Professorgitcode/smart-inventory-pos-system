import React, {
  useEffect,
  useState
} from "react";

import {
  BrainCircuit,
  Activity,
  TrendingUp,
  ShieldCheck,
  BarChart3
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import { useTheme } from "../context/ThemeContext";
const Forecasting = ({
  theme
}) => {

  const FORECAST_API =
    "http://localhost:5216/api/forecast";

  const PRODUCT_FORECAST_API =
    "http://localhost:5216/api/productforecast";

  const [
    forecastData,
    setForecastData
  ] = useState([]);

  const [
    productForecasts,
    setProductForecasts
  ] = useState([]);

  // =========================
  // FETCH FORECAST DATA
  // =========================
  const fetchForecastData =
    async () => {

      try {

        const res =
          await fetch(
            FORECAST_API
          );

        const data =
          await res.json();

        setForecastData(data);

      } catch (error) {

        console.error(error);
      }
  };

  // =========================
  // FETCH PRODUCT FORECASTS
  // =========================
  const fetchProductForecasts =
    async () => {

      try {

        const res =
          await fetch(
            PRODUCT_FORECAST_API
          );

        const data =
          await res.json();

        setProductForecasts(data);

      } catch (error) {

        console.error(error);
      }
  };

  useEffect(() => {

    fetchForecastData();

    fetchProductForecasts();

  }, []);

  // =========================
  // CHART DATA
  // =========================
  const revenueChartData =
    forecastData.map(item => ({

      date: item.date,

      actual:
        Number(item.actualRevenue),

      predicted:
        Number(item.predictedRevenue)

    }));

  return (

    <div
      style={{
        padding: "32px",
        backgroundColor:
          theme.colors.background,

        minHeight: "100vh",

        color: theme.colors.text
      }}
    >

      {/* HEADER */}
      <div
        style={{
          marginBottom: "32px"
        }}
      >

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "800"
          }}
        >
          AI Forecasting Center
        </h1>

        <p
          style={{
            color: theme.colors.textMuted,
            marginTop: "8px"
          }}
        >
          Predictive analytics and
          intelligent demand forecasting
        </p>

      </div>

      {/* KPI ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",

          gap: "24px",

          marginBottom: "32px"
        }}
      >

        <ForecastCard
          theme={theme}
          icon={BrainCircuit}
          title="Forecast Accuracy"
          value="91%"
          sub="AI prediction confidence"
        />

        <ForecastCard
          theme={theme}
          icon={TrendingUp}
          title="Projected Revenue"
          value="$48,200"
          sub="Next 30 days"
        />

        <ForecastCard
          theme={theme}
          icon={ShieldCheck}
          title="Prediction Reliability"
          value="High"
          sub="Stable market trend"
        />

        <ForecastCard
          theme={theme}
          icon={Activity}
          title="Demand Volatility"
          value="Low"
          sub="Consistent sales patterns"
        />

      </div>

      {/* REVENUE FORECAST */}
      <div style={cardStyle(theme)}>

        <div style={cardHeader}>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <Activity
              size={20}
              color={theme.colors.primary}
            />

            <div>
              <h3 style={cardTitle}>
                Revenue Forecast
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: theme.colors.textMuted
                }}
              >
                AI-powered revenue prediction
              </p>
            </div>
          </div>

        </div>

        <div
          style={{
            height: "350px",
            marginTop: "20px"
          }}
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={revenueChartData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={theme.colors.border}
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip
                  contentStyle={{
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "10px"
  }}
  formatter={(value, name) => [
    `$${value}`,
    name
  ]}
  labelFormatter={(label, payload) => {
    if (!payload?.length)
      return label;

    const confidence =
      payload[0]?.payload?.confidence;

    return `${label} • Confidence: ${confidence}%`;
  }}
/>

              <Line
                type="monotone"
                dataKey="actual"
                stroke={theme.colors.primary}
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="predicted"
                stroke={theme.colors.surface}
                strokeWidth={3}
                strokeDasharray="5 5"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* PRODUCT FORECASTS */}
      <div
        style={{
          marginTop: "32px"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px"
          }}
        >

          <BarChart3
            size={22}
            color={theme.colors.primary}
          />

          <h2
            style={{
              margin: 0
            }}
          >
            Product Demand Forecasts
          </h2>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px"
          }}
        >

          {productForecasts
            .slice(0, 6)
            .map(item => (

            <div
              key={item.productId}
              style={cardStyle(theme)}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  marginBottom: "18px"
                }}
              >

                <div>

                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "16px"
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
                    AI Demand Forecast
                  </div>

                </div>

                <div
                  style={{
                    backgroundColor:
                      theme.colors.successLight,

                    color: "#166534",

                    padding: "6px 10px",

                    borderRadius: "10px",

                    fontSize: "12px",

                    fontWeight: "700"
                  }}
                >
                  {item.confidenceScore}%
                </div>

              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",

                  gap: "16px"
                }}
              >

                <MetricBox
                  theme={theme}
                  label="Current Stock"
                  value={item.currentStock}
                />

                <MetricBox
                  theme={theme}
                  label="Predicted Demand"
                  value={item.predictedDemand}
                />

                <MetricBox
                  theme={theme}
                  label="Daily Sales"
                  value={item.averageDailySales}
                />

                <MetricBox
                  theme={theme}
                  label="Restock"
                  value={
                    item.recommendedRestock
                  }
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

// =========================
// KPI CARD
// =========================
const ForecastCard = ({
  theme,
  icon: Icon,
  title,
  value,
  sub
}) => (

  <div style={cardStyle(theme)}>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px"
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

          justifyContent: "center"
        }}
      >

        <Icon
          size={20}
          color={theme.colors.primary}
        />

      </div>

      <div>

        <div
          style={{
            fontSize: "13px",
            color: theme.colors.textMuted
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "800"
          }}
        >
          {value}
        </div>

      </div>

    </div>

    <div
      style={{
        fontSize: "12px",
        color: theme.colors.textMuted
      }}
    >
      {sub}
    </div>

  </div>
);

// =========================
// METRIC BOX
// =========================
const MetricBox = ({
  theme,
  label,
  value
}) => (

  <div
    style={{
      backgroundColor:
        theme.colors.background,

      borderRadius: "12px",

      padding: "14px"
    }}
  >

    <div
      style={{
        fontSize: "12px",
        color: theme.colors.textMuted
      }}
    >
      {label}
    </div>

    <div
      style={{
        fontSize: "20px",
        fontWeight: "800",
        marginTop: "6px"
      }}
    >
      {value}
    </div>

  </div>
);

// =========================
// STYLES
// =========================
const cardStyle = (theme) => ({
  backgroundColor:
    theme.colors.surface,

  borderRadius: "18px",

  padding: "24px",

  border:
    `1px solid ${theme.colors.border}`,

  boxShadow:
    theme.shadows.lg
});

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const cardTitle = {
  margin: 0,
  fontSize: "16px",
  fontWeight: "700"
};

export default Forecasting;