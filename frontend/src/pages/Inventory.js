import React, { useEffect, useState } from "react";
import { Search, Plus, Edit3, Trash2 } from "lucide-react";
import ProductModal from "../components/ProductModal";
import Toast from "../components/Toast";

const Inventory = ({ theme }) => {
  const API = "http://localhost:5216/api/products";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // MODAL STATE
  const [modal, setModal] = useState({
    isOpen: false,
    mode: "add",
    data: null
  });

  // TOAST STATE
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success"
  });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
    } catch {
      showToast("Failed to fetch products", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= ADD / UPDATE =================
  const handleModalSubmit = async (formData) => {
    try {
      if (modal.mode === "add") {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            price: parseFloat(formData.price),
            stockQuantity: parseInt(formData.stockQuantity)
          })
        });

        showToast("Product added successfully");
      } else {
        await fetch(`${API}/${modal.data.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: modal.data.id,
            name: formData.name,
            price: parseFloat(formData.price),
            stockQuantity: parseInt(formData.stockQuantity)
          })
        });

        showToast("Product updated successfully");
      }

      setModal({ isOpen: false, mode: "add", data: null });
      fetchProducts();

    } catch {
      showToast("Operation failed", "error");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      showToast("Product deleted");
      fetchProducts();

    } catch {
      showToast("Delete failed", "error");
    }
  };

  // ================= FILTER =================
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      backgroundColor: theme.surface,
      padding: "24px",
      borderRadius: "16px",
      border: `1px solid ${theme.border}`
    }}>

      {/* TOAST */}
      <Toast
        {...toast}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        
        {/* SEARCH */}
        <div style={{ position: "relative" }}>
          <Search size={18} style={{ position: "absolute", left: "12px", top: "10px", color: theme.muted }} />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 10px 10px 40px",
              borderRadius: "8px",
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.bg,
              color: theme.text,
              width: "300px",
              outline: "none"
            }}
          />
        </div>

        {/* ADD BUTTON (ONLY OPENS MODAL) */}
        <button
          onClick={() => setModal({ isOpen: true, mode: "add", data: null })}
          style={{
            backgroundColor: theme.primary,
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            gap: "8px"
          }}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: `1px solid ${theme.border}`, color: theme.muted }}>
            <th style={{ padding: "16px" }}>Product Name</th>
            <th style={{ padding: "16px" }}>Price</th>
            <th style={{ padding: "16px" }}>Stock</th>
            <th style={{ padding: "16px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map(p => (
            <tr key={p.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
              
              <td style={{ padding: "16px" }}>{p.name}</td>
              <td style={{ padding: "16px" }}>${p.price}</td>
              <td style={{ padding: "16px" }}>{p.stockQuantity} Units</td>

              <td style={{ padding: "16px", display: "flex", gap: "12px" }}>
                
                <Edit3
                  size={18}
                  color={theme.muted}
                  style={{ cursor: "pointer" }}
                  onClick={() => setModal({ isOpen: true, mode: "edit", data: p })}
                />

                <Trash2
                  size={18}
                  color="#ef4444"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(p.id)}
                />

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      <ProductModal
        isOpen={modal.isOpen}
        mode={modal.mode}
        initialData={modal.data}
        theme={theme}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Inventory;