import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [giftCardDiscount, setGiftCardDiscount] = useState(0);
  const [estimatedTax, setEstimatedTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  const calculateTotals = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
    setEstimatedTax(total * 0.05); // Assume 5% tax
    setShipping(total > 100 ? 0 : 10); // Free shipping for orders > $100
  };

  const calculateTotal = () => {
    return (
      subtotal - couponDiscount - giftCardDiscount + estimatedTax + shipping
    );
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    calculateTotals();
  };

  const updateCartItem = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    calculateTotals();
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    calculateTotals();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        couponDiscount,
        giftCardDiscount,
        estimatedTax,
        shipping,
        calculateTotal,
        addToCart,
        updateCartItem,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
