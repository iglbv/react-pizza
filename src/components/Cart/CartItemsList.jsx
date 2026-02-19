import React from "react";
import CartItem from "./CartItem";

const CartItemsList = ({ items }) => {
  return (
    <div className="content__items">
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default CartItemsList;
