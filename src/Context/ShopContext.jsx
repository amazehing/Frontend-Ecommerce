import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("https://localhost:8443/products");
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const addToCart = (itemId, size, quantity = 1) => {
    const product = allProducts.find((p) => p.id === itemId);
    if (!product) return;

    setCartItems((prev) => {
      const updatedCart = { ...prev };
      const cartItemId = `${itemId}-${size}`;
      const existingItem = updatedCart[cartItemId];

      if (existingItem) {
        updatedCart[cartItemId] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
          total: (existingItem.quantity + quantity) * product.new_price,
        };
      } else {
        updatedCart[cartItemId] = {
          id: itemId,
          title: product.name,
          size,
          price: product.new_price,
          quantity,
          total: quantity * product.new_price,
          image: `https://localhost:8443/images/${product.images[0].id}`,
        };
      }

      return updatedCart;
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[cartItemId]?.quantity > 1) {
        updatedCart[cartItemId].quantity--;
        updatedCart[cartItemId].total -= updatedCart[cartItemId].price;
      } else {
        delete updatedCart[cartItemId];
      }
      return updatedCart;
    });
  };

  const updateSize = (cartItemId, newSize) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      const cartItem = updatedCart[cartItemId];

      if (cartItem) {
        const [itemId] = cartItemId.split("-");
        const newCartItemId = `${itemId}-${newSize}`;
        updatedCart[newCartItemId] = { ...cartItem, size: newSize };
        delete updatedCart[cartItemId];
      }

      return updatedCart;
    });
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    setCartItems((prev) => ({
      ...prev,
      [cartItemId]: {
        ...prev[cartItemId],
        quantity: newQuantity,
        total: newQuantity * prev[cartItemId].price,
      },
    }));
  };

  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((totalAmount, item) => {
      return totalAmount + item.total;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce(
      (totalItems, item) => totalItems + item.quantity,
      0
    );
  };

  const emptyCart = () => {
    setCartItems({});
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    allProducts,
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
