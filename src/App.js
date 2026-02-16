import React from "react";
import "./App.css";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import { usePizzas } from "./hooks/usePizzas";
import "./scss/app.scss";

function App() {
  const { pizzas, isPizzasLoading, pizzaError } = usePizzas();

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {isPizzasLoading && <h1>Загрузка пицц...</h1>}
          {pizzaError && <h1>Произошла ошибка: {pizzaError}</h1>}
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
