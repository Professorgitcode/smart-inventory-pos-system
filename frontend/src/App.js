import './App.css';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

 // DASHBOARD CALCULATIONS
const totalProducts = products.length;

const lowStock = products.filter(p => p.stock < 5).length;

const totalValue = products.reduce(
  (sum, p) => sum + (p.price * p.stock),
  0
);

const totalStock = products.reduce(
  (sum, p) => sum + p.stock,
  0
);
const lowStockItems = products.filter(p => p.stock < 5);

  const deleteProduct = async (id) => {
  try {
    await fetch(`http://localhost:5216/products/${id}`, {
      method: "DELETE"
    });

    toast.success("Product deleted!");
    // Refresh list
    fetchProducts();
  } catch (err) {
    toast.error("Failed to delete product");
  }
};
 

const updateProduct = async () => {
  const updated = {
    name: name,
    price: parseFloat(price),
    stock: parseInt(stock)
  };

  try {
    await fetch(`http://localhost:5216/products/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updated)
    });

    toast.success("Product updated!");
    fetchProducts();

    setEditingId(null);
    setName("");
    setPrice("");
    setStock("");
  } catch (err) {
    toast.error("Failed to update product");
  }
};

  // GET products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5216/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  useEffect(() => {
  if (lowStockItems.length > 0) {
    toast.warn("Some items are low in stock!");
  }
}, [products]);

  // POST product
  const addProduct = async () => {
    const product = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock)
    };

    try {
      await fetch("http://localhost:5216/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      toast.success("Product added successfully!");

      setName("");
      setPrice("");
      setStock("");

      fetchProducts(); // refresh list
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

return (
  <div style={styles.container}>
    <h1 style={styles.title}>Smart Inventory POS</h1>

<div style={styles.dashboard}>
  {lowStockItems.length > 0 && (
  <div style={styles.alertBox}>
    ⚠ Warning: {lowStockItems.length} item(s) are low in stock!
  </div>
)}
  <div style={styles.cardBox}>
    <h3>Total Products</h3>
    <p>{totalProducts}</p>
  </div>

  <div style={styles.cardBox}>
    <h3>Low Stock</h3>
    <p style={{ color: "red" }}>{lowStock}</p>
  </div>

  <div style={styles.cardBox}>
    <h3>Total Value</h3>
    <p>${totalValue.toFixed(2)}</p>
  </div>

  <div style={styles.cardBox}>
    <h3>Total Stock</h3>
    <p>{totalStock}</p>
  </div>
</div>

<div style={styles.chartBox}>
  <h3>Stock Levels</h3>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={products}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="stock" />
    </BarChart>
  </ResponsiveContainer>
</div>
    <div style={styles.card}>
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* FORM */}
      <div style={styles.form}>
  <input
    type="text"
    placeholder="Product name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    style={styles.input}
  />

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    style={styles.input}
  />

  <input
    type="number"
    placeholder="Stock"
    value={stock}
    onChange={(e) => setStock(e.target.value)}
    style={styles.input}
  />

  <button
    onClick={editingId ? updateProduct : addProduct}
    style={styles.button}
  >
    {editingId ? "Update Product" : "Add Product"}
  </button>
</div>

      {/* ITEM LIST */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products
  .filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((product) => (
          <li key={product.id} style={styles.product}>  
              <span>
  {product.name} | ${product.price} | Stock: {product.stock}
</span>

            <div>
              <button
               onClick={() => {
  setEditingId(product.id);
  setName(product.name);
  setPrice(product.price);
  setStock(product.stock);
}}
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* TOAST CONTAINER */}
    <ToastContainer position="top-right" autoClose={2000} />
  </div>
);
}
const styles = {
dashboard: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
  maxWidth: "800px",
  margin: "20px auto",
},

alertBox: {
  backgroundColor: "#fef3c7",
  color: "#92400e",
  padding: "10px",
  borderRadius: "8px",
  maxWidth: "800px",
  margin: "10px auto",
  textAlign: "center",
  fontWeight: "bold"
},

cardBox: {
  backgroundColor: "#ffffff",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
},

chartBox: {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  maxWidth: "800px",
  margin: "20px auto",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
},

  container: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
    color: "#1e293b",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "20px auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
  },
  editBtn: {
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "6px",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
  },
};
export default App;
