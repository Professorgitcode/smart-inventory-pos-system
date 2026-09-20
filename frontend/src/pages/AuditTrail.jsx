import React, { useState } from "react";
import {
  FileText,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Download,
  Filter,
  Search
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ---------------- Stat Card Component ----------------
const StatCard = ({ title, value, icon: Icon, trend, color = "#3b82f6" }) => {
  const { theme } = useTheme();

  return (
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
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700", color: theme.colors.text }}>
          {value}
        </h3>
        {trend && (
          <span style={{ fontSize: "0.75rem", fontWeight: "600", color: trend.startsWith("-") ? "#ef4444" : "#10b981" }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

// ---------------- Main AuditTrail Component ----------------
const AuditTrail = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("All Modules");
  const [selectedSeverity, setSelectedSeverity] = useState("All");

  const mockData = [
    { id: 1, timestamp: "2026-08-28 20:45:12", user: "Albert Ryan", action: "Deleted PO-1024", module: "Procurement", severity: "High" },
    { id: 2, timestamp: "2026-08-28 19:30:00", user: "System", action: "Automated Backup Completed", module: "Database", severity: "Low" },
    { id: 3, timestamp: "2026-08-28 15:12:45", user: "Sarah Jenkins", action: "Updated Stock Thresholds", module: "Inventory", severity: "Medium" },
  ];

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = selectedModule === "All Modules" || item.module === selectedModule;
    const matchesSeverity = selectedSeverity === "All" || item.severity === selectedSeverity;
    return matchesSearch && matchesModule && matchesSeverity;
  });

  return (
    <div style={{ padding: "32px", maxWidth: "1700px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: "800", color: theme.colors.text, letterSpacing: "-0.5px" }}>
            Audit Trail
          </h1>
          <p style={{ color: theme.colors.textMuted, margin: "4px 0 0 0" }}>
            Immutable log of all system actions, security events, and data modifications.
          </p>
        </div>

        <div>
          <button
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, color: theme.colors.text, fontWeight: "600", fontSize: "0.9rem", cursor: "pointer" }}
          >
            <Download size={16} /> Export Logs
          </button>
        </div>
      </div>

      {/* Stat Grid */}
      <div style={{ display: "flex", gap: "24px", marginBottom: "32px", flexWrap: "wrap" }}>
        <StatCard title="Events Today" value="1,284" icon={FileText} trend="+5%" color="#3b82f6" />
        <StatCard title="Security Alerts" value="0" icon={ShieldAlert} color="#10b981" />
        <StatCard title="Critical Actions" value="12" icon={AlertTriangle} trend="-2" color="#ef4444" />
        <StatCard title="Avg Response Time" value="124ms" icon={Clock} color="#8b5cf6" />
      </div>

      {/* Content Card / Table Container */}
      <div style={{ backgroundColor: theme.colors.surface, borderRadius: "20px", border: `1px solid ${theme.colors.border}`, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Filters and Search Bar */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", width: "280px" }}>
            <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: theme.colors.textMuted }} />
            <input
              type="text"
              placeholder="Search event logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 42px",
                borderRadius: "10px",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                fontSize: "0.9rem",
                outline: "none"
              }}
            />
          </div>

          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: "10px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.background, color: theme.colors.text, fontSize: "0.9rem", outline: "none", cursor: "pointer" }}
          >
            <option>All Modules</option>
            <option>Inventory</option>
            <option>Procurement</option>
            <option>System</option>
            <option>Database</option>
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: "10px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.background, color: theme.colors.text, fontSize: "0.9rem", outline: "none", cursor: "pointer" }}
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.background, color: theme.colors.text, fontWeight: "600", fontSize: "0.9rem", cursor: "pointer" }}>
            <Filter size={16} /> Apply Filters
          </button>
        </div>

        {/* Custom Modern Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>Timestamp</th>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>User</th>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>Action</th>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>Module</th>
                <th style={{ padding: "12px 16px", color: theme.colors.textMuted, fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const severityBg = item.severity === "High" ? "#fee2e2" : item.severity === "Medium" ? "#fef3c7" : "#f1f5f9";
                  const severityText = item.severity === "High" ? "#991b1b" : item.severity === "Medium" ? "#92400e" : "#475569";

                  return (
                    <tr key={item.id} style={{ borderBottom: `1px solid ${theme.colors.border}`, transition: "background 0.2s" }}>
                      <td style={{ padding: "16px", color: theme.colors.textMuted, fontSize: "0.9rem" }}>{item.timestamp}</td>
                      <td style={{ padding: "16px", fontWeight: "600", color: theme.colors.text, fontSize: "0.95rem" }}>{item.user}</td>
                      <td style={{ padding: "16px", color: theme.colors.text, fontSize: "0.9rem" }}>{item.action}</td>
                      <td style={{ padding: "16px", color: theme.colors.textMuted, fontSize: "0.9rem" }}>{item.module}</td>
                      <td style={{ padding: "16px" }}>
                        <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600", backgroundColor: severityBg, color: severityText }}>
                          {item.severity}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: "32px", textAlign: "center", color: theme.colors.textMuted }}>
                    No audit logs matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AuditTrail;