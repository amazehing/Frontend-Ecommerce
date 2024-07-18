import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Item from "../Item/Item";
import "./ProductsByCategory.css";
import { useParams } from "react-router-dom";
import placeholderImg from "../../Components/Assets/placeholder.jpg";

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8443/categories/${categoryId}/products?sortBy=createdAt&order=desc`
      );
      setProducts(response.data.slice(0, 8));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h1 className="products">Products</h1>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relatedproducts-item">
          {products.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={
                product.images.length
                  ? `http://localhost:8443/images/${product.images[0].id}`
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

export default ProductsByCategory;
