import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "../Item/Item";
import "./NewCollection.css";
import placeholderImg from "../../Components/Assets/placeholder.jpg";

const NewCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const response = await axios.get(
          "http://localhost:8080/products?limit=2&sortBy=id"
        ); 
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new collection products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="collections" id="newCollection">
          {products.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={
                product.images.length
                  ? `http://localhost:8080/images/${product.images[0].id}`
                  : placeholderImg
              }
              new_price={product.new_price}
              old_price={product.old_price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewCollection;
