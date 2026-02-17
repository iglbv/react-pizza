import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { usePizzas } from "../hooks/usePizzas";

const Home = () => {
  const { pizzas, isPizzasLoading, pizzaError } = usePizzas();

  return (
    <>
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
    </>
  );
};

export default Home;
