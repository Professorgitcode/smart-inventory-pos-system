import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");


  const addProduct = async () => {
    const product = {
      name: name,
      price: parseFloat(price),
      stock: parseInt(stock)
    };

    try {
      const response = await fetch("http://localhost:5216/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      const data = await response.json();
      console.log("Created:", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <input
        placeholder="Stock "
        value={stock}
        onChange={e => setStock(e.target.value)}
      />

      <button onClick={addProduct}>Add</button>
    </div>
  );
}


export default App;
