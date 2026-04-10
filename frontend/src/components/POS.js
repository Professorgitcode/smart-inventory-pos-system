import React, { useEffect, useState } from "react";

function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);

  // Fetch products
  useEffect(() => {
    fetch("https://localhost:5216/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
  fetchProducts();
}, []);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  // Checkout
  const checkout = async () => {
  const order = {
    items: cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }))
  };

  const res = await fetch("http://localhost:5216/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });

  if (res.ok) {
    setReceipt({
      items: cart,
      total: total,
      date: new Date().toLocaleString()
    });

    setCart([]);
    fetchProducts(); // 🔥 refresh stock
  } else {
    const err = await res.text();
    alert(err);
  }


/*alert(
  "Receipt:\n" +
    receipt.join("\n") +
    `\n\nTotal: $${total}`
);
    setCart([]);*/

  };

  return (
   <div style={{ display: "flex", gap: "40px" }}>
  
  {/* PRODUCTS */}
  <div style={{ flex: 1 }}>
    <h2>Products</h2>
    {products.map(p => (
      <div key={p.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
        <strong>{p.name}</strong><br />
        ${p.price} | Stock: {p.stock}
        <br />
        <button onClick={() => addToCart(p)}>Add</button>
      </div>
    ))}
  </div>

  {/* CART */}
  <div style={{ flex: 1 }}>
    <h2>Cart</h2>

    {receipt && (
  <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
    <h3>Receipt</h3>
    <p>{receipt.date}</p>

    {receipt.items.map(item => (
      <div key={item.id}>
        {item.name} x {item.quantity} = ${item.price * item.quantity}
      </div>
    ))}

    <h4>Total: ${receipt.total}</h4>
  </div>
)}

    {cart.map(item => (
      <div key={item.id}>
        {item.name} x {item.quantity}
      </div>
    ))}

    <h3>Total: ${total}</h3>

    <button onClick={checkout}>Checkout</button>
  </div>

</div>
  );
}

export default POS;