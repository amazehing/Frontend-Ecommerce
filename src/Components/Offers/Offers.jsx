import React, { useState, useEffect } from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8443/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCheckNow = () => {
    const womenCategory = categories.find(
      (category) => category.name.toLowerCase() === "women"
    );
    if (womenCategory) {
      window.location.href = `/categories/${womenCategory.id}/products`;
    } else {
      alert("Women category not found");
    }
  };

  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For Women</h1>
        <p>ONLY ON BEST SELLER PRODUCTS</p>

        {categories.length > 0 && (
          <button type="button" onClick={handleCheckNow}>Check Now</button>
        )}
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
