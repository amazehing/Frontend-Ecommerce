import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

const CartItems = () => {
  const {
    getTotalCartAmount,
    allProducts,
    cartItems,
    removeFromCart,
    updateSize,
    handleQuantityChange,
  } = useContext(ShopContext);

  const handleSizeChange = (cartItemId, newSize) => {
    updateSize(cartItemId, newSize);
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {Object.keys(cartItems).map((cartItemId) => {
        const [itemId, size] = cartItemId.split("-");
        const item = allProducts.find(
          (product) => product.id === Number(itemId)
        );
        const cartItem = cartItems[cartItemId];

        if (item && cartItem.quantity > 0) {
          return (
            <div key={cartItemId}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={`http://localhost:8080/images/${item.images[0].id}`}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{cartItem.title}</p>
                <select
                  className="cartitem-size-select"
                  value={size}
                  onChange={(event) =>
                    handleSizeChange(cartItemId, event.target.value)
                  }
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
                <p>€{cartItem.price}</p>
                <select
                  className="cartitems-quantity"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    handleQuantityChange(cartItemId, parseInt(e.target.value))
                  }
                >
                  {[...Array(10).keys()].map((index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <p>€{cartItem.total}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(cartItemId)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>€{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>€{getTotalCartAmount()}</h3>
            </div>
          </div>
          <Link to="/checkout">
            <button>PROCEED TO CHECK OUT</button>
          </Link>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
