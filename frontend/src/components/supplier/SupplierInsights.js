import React from "react";
import { BrainCircuit } from "lucide-react";

const SupplierInsights = ({ suppliers }) => {
  const highRiskSuppliers = suppliers.filter(
    (s) => s.riskLevel === "High"
  );

  const mediumRiskSuppliers = suppliers.filter(
    (s) => s.riskLevel === "Medium"
  );

  const bestSupplier =
    suppliers.length > 0
      ? suppliers.reduce((best, current) =>
          current.intelligenceScore >
          best.intelligenceScore
            ? current
            : best
        )
      : null;

  const averageScore =
    suppliers.length > 0
      ? (
          suppliers.reduce(
            (sum, s) =>
              sum + s.intelligenceScore,
            0
          ) / suppliers.length
        ).toFixed(1)
      : 0;

  const insightCards = [
    {
      title: "Top Performing Supplier",
      text: bestSupplier
        ? `${bestSupplier.supplierName} currently has the highest intelligence score of ${bestSupplier.intelligenceScore}.`
        : "No supplier data available.",
      confidence: "95%"
    },

    {
      title: "Risk Analysis",
      text:
        highRiskSuppliers.length > 0
          ? `${highRiskSuppliers.length} supplier(s) are classified as High Risk and should be monitored closely.`
          : "No high-risk suppliers detected.",
      confidence: "90%"
    },

    {
      title: "Portfolio Health",
      text: `Average supplier intelligence score is ${averageScore}. Medium-risk suppliers: ${mediumRiskSuppliers.length}.`,
      confidence: "88%"
    }
  ];

  return (
    <div
      style={{
        background: "#163042",
        color: "#ffffff",
        borderRadius: "24px",
        padding: "24px",
        marginBottom: "32px",
        boxShadow:
          "0 8px 32px rgba(22,48,66,0.25)"
      }}
    >
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px"
        }}
      >
        <BrainCircuit size={22} />
        AI Supplier Insights
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >
        {insightCards.map(
          (card, index) => (
            <div
              key={index}
              style={{
                padding: "18px",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.05)"
              }}
            >
              <h4
                style={{
                  marginTop: 0,
                  marginBottom: "12px",
                  color: "#6EC1D1"
                }}
              >
                {card.title}
              </h4>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.6"
                }}
              >
                {card.text}
              </p>

              <div
                style={{
                  marginTop: "15px",
                  fontSize: "12px",
                  opacity: 0.75
                }}
              >
                Confidence: {card.confidence}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SupplierInsights;