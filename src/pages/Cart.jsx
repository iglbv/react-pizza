import React from "react";
import CartHeader from "../components/Cart/CartHeader";
import CartItemsList from "../components/Cart/CartItemsList";
import CartFooter from "../components/Cart/CartFooter";
import { useSelector } from "react-redux";
import { selectPizzaItems } from "../redux/slices/cartSlice";
import CartEmpty from "../components/Cart/CartEmpty";

const Cart = () => {
  const pizzaItems = useSelector(selectPizzaItems);

  if (!pizzaItems.length) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <CartHeader />
        <CartItemsList items={pizzaItems} />
        <CartFooter />
      </div>
    </div>
  );
};

export default Cart;
