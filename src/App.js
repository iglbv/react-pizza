import React from "react";
import "./App.css";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock/";
import Sort from "./components/Sort";
import { Skeleton } from "./components/PizzaBlock/Skeleton";
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
          {isPizzasLoading &&
            [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
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
