import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Payment from "./Payment";

const Cart = () => {
  const [cartItem, SetCartItem] = useState(null);
  const fetchCart = async () => {
    const res = await axios.get("http://localhost:5050/api/v1/cart", {
      withCredentials: true,
    });
    // console.log(res);

    SetCartItem(res.data.cart);
  };
  console.log(cartItem);
  useEffect(() => {
    fetchCart();
  }, []);

  if (!cartItem || cartItem.totalPrice === 0) {
    return <h2>Your cart is empty</h2>;
  }
  return (
    <div>
      <h1>totatl price: {cartItem?.totalPrice}</h1>
      <Payment amount={cartItem.totalPrice} />
    </div>
  );
};

export default Cart;
