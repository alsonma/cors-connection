import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => setProducts(data.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="app">
      <h1>Our Products</h1>

      <div className="product-container">
        {product.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price.toLocaleString("en-IN")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;