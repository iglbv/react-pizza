import React from "react";
import CartHeader from "../components/Cart/CartHeader";
import CartItemsList from "../components/Cart/CartItemsList";
import CartFooter from "../components/Cart/CartFooter";

const cartItems = [
  {
    id: 0,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    name: "Сырный цыпленок",
    description: "тонкое тесто, 26 см",
    price: 770,
    count: 2,
  },
  {
    id: 1,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    name: "Сырный цыпленок",
    description: "тонкое тесто, 26 см",
    price: 770,
    count: 2,
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    name: "Сырный цыпленок",
    description: "тонкое тесто, 26 см",
    price: 770,
    count: 2,
  },
  {
    id: 3,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    name: "Сырный цыпленок",
    description: "тонкое тесто, 26 см",
    price: 770,
    count: 2,
  },
];

const Cart = () => {
  return (
    <div className="container container--cart">
      <div className="cart">
        <CartHeader />
        <CartItemsList items={cartItems} />
        <CartFooter />
      </div>
    </div>
  );
};

export default Cart;
