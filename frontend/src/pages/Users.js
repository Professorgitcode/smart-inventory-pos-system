import React, { useState } from "react";
import {
  UserPlus,
  Activity,
  Search,
  CheckCircle,
  Clock,
  Filter,
  Info,
  Eye,
  Edit,
  RefreshCw,
  Trash2,
  LogOut,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ---------------- Action Button Component ----------------
const ActionButton = ({ icon: Icon, label, bgColor, color, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 8px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: bgColor,
      color: color,
      fontSize: "0.75rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "opacity 0.2s",
    }}
    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
  >
    <Icon size={12} /> {label}
  </button>
);

// ---------------- Main Users Component ----------------
const Users = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState(10);
  const [activeOnly, setActiveOnly] = useState(true);

  // Mock data reflecting comprehensive admin view
  const mockUsers = [
    {
      id: 1,
      login: "system",
      email: "system@localhost",
      status: "Activated",
      authorities: ["ROLE_USER", "ROLE_ADMIN"],
      createdDate: "06/09/26 14:51",
      lastModifiedBy: "system",
      lastModifiedDate: "",
      lastLoginDate: ""
    },
    {
      id: 3,
      login: "admin",
      email: "admin@localhost",
      status: "Activated",
      authorities: ["ROLE_RECEPTION", "ROLE_USER", "ROLE_DOCTOR", "ROLE_PHARMACIST", "ROLE_WAREHOUSE", "ROLE_ADMIN", "ROLE_PHARM_TECH", "ROLE_NURSE"],
      createdDate: "06/09/26 14:51",
      lastModifiedBy: "admin",
      lastModifiedDate: "06/09/26 17:13",
      lastLoginDate: "06/09/26 17:13"
    },
    {
      id: 4,
      login: "user",
      email: "user@localhost",
      status: "Activated",
      authorities: ["ROLE_USER"],
      createdDate: "06/09/26 14:51",
      lastModifiedBy: "system",
      lastModifiedDate: "",
      lastLoginDate: ""
    }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "32px", maxWidth: "1700px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Header & Top Admin Actions */}
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: "800", color: theme.colors.text, letterSpacing: "-0.5px" }}>
            User Management
          </h1>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", border: "none", backgroundColor: "#3b82f6", color: "#fff", fontWeight: "600", fontSize: "0.9rem", cursor: "pointer" }}>
            <UserPlus size={16} /> Create a new User
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", border: "none", backgroundColor: "#06b6d4", color: "#fff", fontWeight: "600", fontSize: "0.9rem", cursor: "pointer" }}>
            <Activity size={16} /> View Active Sessions
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", border: "none", backgroundColor: "#f59e0b", color: "#fff", fontWeight: "600", fontSize: "0.9rem", cursor: "pointer" }}>
            <Clock size={16} /> View All Temporal Authorities
          </button>

          <div style={{ width: "1px", backgroundColor: theme.colors.border, margin: "0 8px" }}></div>

          <button
            onClick={() => setActiveOnly(!activeOnly)}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", border: `1px solid ${activeOnly ? '#10b981' : theme.colors.border}`, backgroundColor: activeOnly ? '#10b981' : theme.colors.surface, color: activeOnly ? '#fff' : theme.colors.text, fontWeight: "600", fontSize: "0.9rem", cursor: "pointer" }}
          >
            <Filter size={16} /> Active Only (3)
          </button>
        </div>
      </div>

      {/* Authority Types Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", padding: "12px 16px", backgroundColor: theme.colors.surface, borderRadius: "12px", border: `1px solid ${theme.colors.border}` }}>
        <Info size={18} color={theme.colors.textMuted} />
        <span style={{ fontSize: "0.85rem", fontWeight: "700", color: theme.colors.text }}>Authority Types:</span>
        <span style={{ backgroundColor: "#eff6ff", color: "#3b82f6", padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" }}>Regular Authority</span>
        <span style={{ backgroundColor: "#fffbeb", color: "#f59e0b", padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" }}>Temporary Authority</span>
      </div>

      {/* Main Table Container */}
      <div style={{ backgroundColor: theme.colors.surface, borderRadius: "16px", border: `1px solid ${theme.colors.border}`, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", display: "flex", flexDirection: "column" }}>

        {/* Table Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${theme.colors.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: theme.colors.textMuted, fontSize: "0.9rem" }}>
            Show
            <select
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.background, color: theme.colors.text }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            entries
          </div>

          <div style={{ position: "relative", width: "300px" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: theme.colors.textMuted }} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "8px 14px 8px 38px", borderRadius: "8px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.background, color: theme.colors.text, fontSize: "0.9rem", outline: "none" }}
            />
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: theme.colors.background }}>
                <th style={{ padding: "12px 24px", color: theme.colors.textMuted, fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>ID</th>
                <th style={{ padding: "12px 24px", color: theme.colors.textMuted, fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>Login</th>
                <th style={{ padding: "12px 24px", color: theme.colors.textMuted, fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>Email</th>
                <th style={{ padding: "12px 24px", color: theme.colors.textMuted, fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "12px 24px", color: theme.colors.textMuted, fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>Authorities</th>
                <th style={{ padding: "12px 24px", color: theme.colors.textMuted, fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>Created Date</th>
                <th style={{ padding: "12px 24px", color: theme.colors.textMuted, fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>Last Modified</th>
                <th style={{ padding: "12px 24px", color: theme.colors.textMuted, fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} style={{ borderTop: `1px solid ${theme.colors.border}`, transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${theme.colors.primary}05`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                    <td style={{ padding: "16px 24px", fontSize: "0.85rem", color: theme.colors.text }}>{user.id}</td>
                    <td style={{ padding: "16px 24px", fontWeight: "700", color: theme.colors.text, fontSize: "0.9rem" }}>{user.login}</td>
                    <td style={{ padding: "16px 24px", color: theme.colors.textMuted, fontSize: "0.85rem" }}>{user.email}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 8px", borderRadius: "6px", backgroundColor: "#dcfce7", color: "#166534", fontSize: "0.75rem", fontWeight: "700" }}>
                        <CheckCircle size={12} /> {user.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px", maxWidth: "250px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {user.authorities.map((auth) => (
                          <span key={auth} style={{ backgroundColor: "#eff6ff", color: "#2563eb", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "600", border: "1px solid #bfdbfe" }}>
                            {auth}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px", color: theme.colors.textMuted, fontSize: "0.8rem" }}>{user.createdDate}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ fontSize: "0.8rem", color: theme.colors.text }}>{user.lastModifiedBy}</div>
                      <div style={{ fontSize: "0.75rem", color: theme.colors.textMuted }}>{user.lastModifiedDate}</div>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", width: "160px" }}>
                        <ActionButton icon={Eye} label="View" bgColor="#0ea5e9" color="#fff" />
                        <ActionButton icon={Edit} label="Edit" bgColor="#3b82f6" color="#fff" />
                        <ActionButton icon={RefreshCw} label="Reset" bgColor="#10b981" color="#fff" />
                        <ActionButton icon={Trash2} label="Delete" bgColor="#ef4444" color="#fff" />
                        <ActionButton icon={LogOut} label="Logout" bgColor="#f59e0b" color="#fff" />
                        <ActionButton icon={ShieldAlert} label="Assign Temporary Authority" bgColor="#06b6d4" color="#fff" style={{ width: "100%" }} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ padding: "32px", textAlign: "center", color: theme.colors.textMuted }}>
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderTop: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.background, borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
          <span style={{ fontSize: "0.85rem", color: theme.colors.textMuted }}>
            Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            <button style={{ padding: "6px 12px", display: "flex", alignItems: "center", gap: "4px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, color: theme.colors.textMuted, borderRadius: "6px", cursor: "not-allowed" }}>
              <ChevronLeft size={14} /> Previous
            </button>
            <button style={{ padding: "6px 12px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600" }}>
              1
            </button>
            <button style={{ padding: "6px 12px", display: "flex", alignItems: "center", gap: "4px", border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, color: theme.colors.textMuted, borderRadius: "6px", cursor: "not-allowed" }}>
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Users;