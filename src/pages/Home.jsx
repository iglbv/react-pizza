import React, { useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { usePizzas } from "../hooks/usePizzas";
import Search from "../components/Search";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSortType, setActiveSortType] = useState("rating");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchValue, setSearchValue] = useState("");

  const { pizzas, isPizzasLoading, pizzaError, isNotFound } = usePizzas(
    activeCategory,
    activeSortType,
    sortOrder,
    searchValue,
  );

  const handleSortChange = (sortType) => {
    if (sortType === activeSortType) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setActiveSortType(sortType);
      setSortOrder("asc");
    }
  };

  const handleToggleOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Search value={searchValue} onChange={setSearchValue} />
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
        />
        <Sort
          activeSortType={activeSortType}
          sortOrder={sortOrder}
          onChangeSort={handleSortChange}
          onToggleOrder={handleToggleOrder}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {isPizzasLoading &&
        [...new Array(6)].map((_, index) => <Skeleton key={index} />)}

      {isNotFound && !isPizzasLoading && <h1>😕 Ничего не найдено</h1>}

      {pizzaError && <h1>Произошла ошибка: {pizzaError}</h1>}

      <div className="content__items">
        {pizzas.map((pizza) => (
          <PizzaBlock key={pizza.id} {...pizza} />
        ))}
      </div>
    </div>
  );
};

export default Home;
