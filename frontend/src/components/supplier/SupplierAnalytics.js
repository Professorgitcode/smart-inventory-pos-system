import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const glassStyle = {
  background: "rgba(255,255,255,0.65)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(52,114,156,0.15)"
};

const SupplierAnalytics = ({ analytics }) => {

  // Prevent crashes while loading
  if (!analytics) {
    return (
      <div
        style={{
          ...glassStyle,
          padding: "30px",
          marginBottom: "30px",
          textAlign: "center"
        }}
      >
        Loading analytics...
      </div>
    );
  }

  // Dynamic Health Score
  const healthScore = Math.round(
    (
      analytics.averageDelivery +
      analytics.averageRating * 10
    ) / 2
  );

  // Temporary trend data
  // Later this will come from the backend
  const performanceData = [
    {
      month: "Jan",
      rating:
        analytics.averageRating - 0.5,
      delivery:
        analytics.averageDelivery - 8
    },
    {
      month: "Feb",
      rating:
        analytics.averageRating - 0.3,
      delivery:
        analytics.averageDelivery - 5
    },
    {
      month: "Mar",
      rating:
        analytics.averageRating - 0.2,
      delivery:
        analytics.averageDelivery - 3
    },
    {
      month: "Apr",
      rating:
        analytics.averageRating,
      delivery:
        analytics.averageDelivery
    },
    {
      month: "May",
      rating:
        analytics.averageRating + 0.1,
      delivery:
        analytics.averageDelivery + 2
    },
    {
      month: "Jun",
      rating:
        analytics.averageRating + 0.2,
      delivery:
        analytics.averageDelivery + 4
    }
  ];

  const healthData = [
    {
      name: "Healthy",
      value: healthScore,
      color: "#34729C"
    },
    {
      name: "Remaining",
      value: 100 - healthScore,
      color: "#E5E7EB"
    }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "24px",
        marginBottom: "32px"
      }}
    >

      {/* Performance Chart */}

      <div
        style={{
          ...glassStyle,
          padding: "24px"
        }}
      >
        <h3
          style={{
            marginBottom: "20px",
            color: "#163042"
          }}
        >
          Supplier Performance Trend
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart
            data={performanceData}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="rating"
              stroke="#34729C"
              strokeWidth={3}
              name="Rating"
            />

            <Line
              type="monotone"
              dataKey="delivery"
              stroke="#6EC1D1"
              strokeWidth={3}
              name="Delivery %"
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Health Score */}

      <div
        style={{
          ...glassStyle,
          padding: "24px",
          position: "relative"
        }}
      >

        <h3
          style={{
            marginBottom: "20px",
            color: "#163042"
          }}
        >
          Supplier Health Score
        </h3>

        <ResponsiveContainer
          width="100%"
          height={260}
        >
          <PieChart>

            <Pie
              data={healthData}
              innerRadius={70}
              outerRadius={90}
              dataKey="value"
            >

              {
                healthData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                    />
                  )
                )
              }

            </Pie>

          </PieChart>

        </ResponsiveContainer>

        <div
          style={{
            position: "absolute",
            top: "53%",
            left: "50%",
            transform:
              "translate(-50%, -50%)",
            textAlign: "center"
          }}
        >

          <div
            style={{
              fontSize: "34px",
              fontWeight: "700",
              color: "#163042"
            }}
          >
            {healthScore}%
          </div>

          <div
            style={{
              color: "#6B7280",
              fontSize: "14px"
            }}
          >
            Overall Health
          </div>

        </div>

      </div>

    </div>
  );
};

export default SupplierAnalytics;