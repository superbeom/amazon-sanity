import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const clearState = () => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      const newQty = prevQty - 1;
      if (newQty < 1) return 1;
      return newQty;
    });
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        else return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (id) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    const targetProduct = cartItems.find((item) => item._id === id);

    setCartItems(updatedCartItems);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - targetProduct.quantity * targetProduct.price
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - targetProduct.quantity
    );
  };

  const toggleCartItemQuantity = (id, value) => {
    const updatedCartItems = [];

    cartItems.forEach((item) => {
      if (item._id === id && value === "inc") {
        updatedCartItems.push({
          ...item,
          quantity: item.quantity + 1,
        });

        setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else if (item._id === id && value === "dec" && item.quantity > 1) {
        updatedCartItems.push({
          ...item,
          quantity: item.quantity - 1,
        });

        setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      } else {
        updatedCartItems.push(item);
      }
    });

    setCartItems(updatedCartItems);
  };

  return (
    <StateContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        clearState,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
