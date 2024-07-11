import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import placeholderImg from "../../Components/Assets/placeholder.jpg";

const ProductDisplay = ({ item }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.images.length === 0) {
      alert(
        "This product cannot be added to the cart because it is not an existing product."
      );
      return;
    }
    if (selectedSize !== "") {
      addToCart(item.id, selectedSize);
    } else {
      alert("Please select a size");
    }
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={
              item.images.length
                ? `http://localhost:8080/images/${item.images[0].id}`
                : placeholderImg
            }
            alt=""
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{item.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            €{item.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            €{item.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and a
          round neckline short sleeves, worn as an undershirt or outer garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <select
              className="sizes"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="" disabled hidden>
                Choose size
              </option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
        </div>
        <button type="button" onClick={handleAddToCart}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductDisplay;
