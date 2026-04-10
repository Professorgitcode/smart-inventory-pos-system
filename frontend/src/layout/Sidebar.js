import React from "react";

function Sidebar({ setPage }) {
  return (
    <div style={{ width: "200px", background: "#222", color: "#fff", height: "100vh", padding: "20px" }}>
      <h2>POS System</h2>

      <p onClick={() => setPage("dashboard")}>Dashboard</p>
      <p onClick={() => setPage("inventory")}>Inventory</p>
      <p onClick={() => setPage("pos")}>POS</p>
    </div>
  );
}

export default Sidebar;