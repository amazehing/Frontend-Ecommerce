import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = (selectedSize) => {
  return all_product.reduce((cart, product) => {
    cart[`${product.id}-${selectedSize[product.id] || "default"}`] = {
      quantity: 0,
      size: selectedSize[product.id] || "default",
    };
    return cart;
  }, {});
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart({}));

  const addToCart = (itemId, size, quantity = 1) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      const cartItemId = `${itemId}-${size}`;
      const existingItem = updatedCart[cartItemId];

      if (existingItem) {
        updatedCart[cartItemId] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };
      } else {
        updatedCart[cartItemId] = {
          quantity,
          size,
        };
      }

      return updatedCart;
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[cartItemId]?.quantity > 0) {
        updatedCart[cartItemId].quantity--;
      }
      return updatedCart;
    });
  };

  const updateSize = (cartItemId, newSize) => {
    setCartItems((prev) => ({
      ...prev,
      [cartItemId]: { ...prev[cartItemId], size: newSize },
    }));
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    setCartItems((prev) => ({
      ...prev,
      [cartItemId]: {
        ...prev[cartItemId],
        quantity: newQuantity < 1 ? 1 : newQuantity,
      },
    }));
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, cartItemId) => {
      const [itemId] = cartItemId.split("-");
      const product = all_product.find((p) => p.id === Number(itemId));
      if (product && cartItems[cartItemId].quantity > 0) {
        totalAmount += product.new_price * cartItems[cartItemId].quantity;
      }
      return totalAmount;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce(
      (totalItems, item) => totalItems + item.quantity,
      0
    );
  };

  const emptyCart = () => {
    setCartItems(getDefaultCart({}));
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateSize,
    handleQuantityChange,
    emptyCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
