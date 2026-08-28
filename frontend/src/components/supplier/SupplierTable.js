import React from "react";

import {
  Search,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

const glassStyle = {
  background: "rgba(255,255,255,0.65)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "20px",
  boxShadow:
    "0 8px 32px rgba(52,114,156,0.15)"
};

const SupplierTable = ({
  suppliers,
  search,
  setSearch,
  onDelete
}) => {
  return (
    <div
      style={{
        ...glassStyle,
        padding: "24px",
        marginBottom: "32px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}
      >
        <h3>
          Enterprise Supplier Dashboard
        </h3>
        <div style={{ position: "relative" }}>
          <Search size={18} style={{ position: "absolute", left: "12px", top: "10px" }} />
        <input
          type="text"
          value={search}
          placeholder="Search suppliers..."
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px 10px 10px 40px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            width: "300px",
            outline: "none"
          }}
        />
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr
            style={{
              textAlign: "left",
              color: "#6b8798"
            }}
          >
            <th>Supplier</th>
            <th>Contact</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Lead Time</th>
            <th>Score</th>
            <th>Risk</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map(
            (supplier) => (
              <tr
  key={supplier.supplierId}
  style={{
    borderBottom:
      "1px solid #E5E7EB",
    transition: "0.2s"
  }}
>
                <td
  style={{
    padding: "16px",
    fontWeight: "600"
  }}
>
  {supplier.supplierName}
</td>

                <td>
                  {
                    supplier.contactPerson
                  }
                </td>

                <td>
                  {supplier.phone}
                </td>

                <td>
                  {supplier.rating}
                </td>

                <td>
                  {
                    supplier.averageLeadTime
                  }{" "}
                  Days
                </td>

                <td>
                  {
                    supplier.intelligenceScore
                  }
                </td>

                <td>
                  {
                    supplier.riskLevel
                  }
                </td>

                <td>
  <span
    style={{
      padding: "6px 12px",
      borderRadius: "20px",
      background: "#DCFCE7",
      color: "#166534",
      fontSize: "12px",
      fontWeight: "600"
    }}
  >
    {supplier.status}
  </span>
</td>

                <td>
                 <div
  style={{
    display: "flex",
    gap: "14px",
    alignItems: "center"
  }}
>
                    <Eye
                      size={18}
                      style={{
                        cursor:
                          "pointer"
                      }}
                    />

                    <Edit
                      size={18}
                      style={{
                        cursor:
                          "pointer"
                      }}
                    />

                    <Trash2
                      size={18}
                      color="red"
                      style={{
                        cursor:
                          "pointer"
                      }}
                      onClick={() =>
                        onDelete(
                          supplier.supplierId
                        )
                      }
                    />
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;