import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = (selectedSize) => {
  return all_product.reduce((cart, product) => {
    cart[product.id] = {
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

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]?.quantity > 0) {
        updatedCart[itemId].quantity--;
      }
      return updatedCart;
    });
  };

  const updateSize = (itemId, newSize) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], size: newSize },
    }));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity: newQuantity < 1 ? 1 : newQuantity,
      },
    }));
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, cartItemId) => {
      const [itemId] = cartItemId.split("-"); // Extract itemId from cartItemId
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

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateSize,
    handleQuantityChange,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
