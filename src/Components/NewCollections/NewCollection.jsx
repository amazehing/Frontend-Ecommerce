import React, { useState, useEffect } from "react";
import Item from "../Item/Item";
import "./NewCollection.css";
import placeholderImg from "../../Components/Assets/placeholder.jpg";

const NewCollection = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((data) => {
        // Ensure only the last 8 products are kept in state
        const latestProducts = data.slice(-8);
        setNewCollection(latestProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW ADDED</h1>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="collections" id="newCollection">
          {newCollection.map((product) => (
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
