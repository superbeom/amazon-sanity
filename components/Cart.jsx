import React, { useRef } from "react";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";

import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const {
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    onRemove,
    toggleCartItemQuantity,
  } = useStateContext();

  const onCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div ref={cartRef} className="cart-wrapper" onClick={onCloseCart}>
      <div
        className="cart-container"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button className="cart-heading" type="button" onClick={onCloseCart}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{totalQuantities} items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <button className="btn" type="button" onClick={onCloseCart}>
              Continue Shopping
            </button>
          </div>
        )}

        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <div key={item._id} className="product">
                <img
                  className="cart-product-image"
                  src={urlFor(item.image && item.image[0])}
                  alt={item.name}
                />

                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>

                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>

                        <span className="num">{item.quantity}</span>

                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>

                    <button
                      className="remove-item"
                      type="button"
                      onClick={() => onRemove(item._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>

            <div className="btn-container">
              <button className="btn" type="button" onClick={() => null}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
