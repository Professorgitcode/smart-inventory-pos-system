import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import DashboardAnalytics from "./components/DashboardAnalytics";
import Inventory from "./components/Inventory";
import POS from "./components/POS";

function App() {
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);

  const renderPage = () => {
    if (page === "dashboard") return <DashboardAnalytics />;
    if (page === "inventory") return <Inventory />;
    if (page === "pos") return <POS />;
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />

<div style={{
  display: "flex",
  background: dark ? "#121212" : "#fff",
  color: dark ? "#fff" : "#000"
}}>

</div>
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "20px" }}>
          {renderPage()}
          <button onClick={() => setDark(!dark)}>Toggle Mode</button>
        </div>
      </div>
    </div>
  );
}

export default App;
