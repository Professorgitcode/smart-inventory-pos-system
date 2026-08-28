import React from "react";

import {
  Truck,
  Star,
  Clock3,
  CheckCircle,
  PackageCheck,
  AlertTriangle
} from "lucide-react";

const glassStyle = {
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "24px",
  boxShadow:
    "0 8px 32px rgba(52,114,156,0.12)"
};

const KPICard = ({
  title,
  value,
  trend,
  icon: Icon,
  positive = true
}) => (
  <div
    style={{
      ...glassStyle,
      padding: "22px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      minHeight: "140px"
    }}
  >
    <Icon
      size={26}
      color={
        positive
          ? "#34729C"
          : "#EF4444"
      }
    />

    <span
      style={{
        fontSize: "14px",
        color: "#6b8798"
      }}
    >
      {title}
    </span>

    <h2
      style={{
        margin: 0,
        color: "#163042"
      }}
    >
      {value}
    </h2>

    <span
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: positive
          ? "#10B981"
          : "#EF4444"
      }}
    >
      {trend}
    </span>
  </div>
);

const SupplierKPIs = ({
  analytics
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(6, 1fr)",
        gap: "16px",
        marginBottom: "32px"
      }}
    >
      <KPICard
        title="Active Suppliers"
        value={
          analytics
            ? analytics.activeSuppliers
            : 0
        }
        trend="+8.4%"
        icon={Truck}
      />

      <KPICard
        title="Average Rating"
        value={
          analytics
            ? analytics.averageRating.toFixed(
                1
              )
            : "0.0"
        }
        trend="+2.1%"
        icon={Star}
      />

      <KPICard
        title="Avg Lead Time"
        value={
          analytics
            ? `${analytics.averageLeadTime.toFixed(
                0
              )} Days`
            : "0 Days"
        }
        trend="-12%"
        icon={Clock3}
      />

      <KPICard
        title="On-Time Delivery"
        value={
          analytics
            ? `${analytics.averageDelivery.toFixed(
                0
              )}%`
            : "0%"
        }
        trend="+4.3%"
        icon={CheckCircle}
      />

      <KPICard
        title="Completed Orders"
        value="1,284"
        trend="+10.5%"
        icon={PackageCheck}
      />

      <KPICard
        title="Risk Suppliers"
        value="3"
        trend="+1"
        icon={AlertTriangle}
        positive={false}
      />
    </div>
  );
};

export default SupplierKPIs;