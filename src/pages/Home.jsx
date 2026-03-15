import React from "react";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import { selectActiveCategoryIndex } from "../redux/slices/categoriesSlice";
import {
  selectSortType,
  selectSortOrder,
  selectSearchValue,
  selectCurrentPage,
} from "../redux/slices/filtersSlice";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { usePizzas } from "../hooks/usePizzas";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Home = () => {
  const activeCategory = useSelector(selectActiveCategoryIndex);
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);
  const searchValue = useSelector(selectSearchValue);
  const currentPage = useSelector(selectCurrentPage);

  const { pizzas, isPizzasLoading, pizzaError, isNotFound } = usePizzas(
    activeCategory,
    sortType,
    sortOrder,
    searchValue,
    currentPage,
  );

  return (
    <div className="container">
      <div className="content__top">
        <Search />
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {isPizzasLoading &&
        [...new Array(6)].map((_, index) => <Skeleton key={index} />)}

      {isNotFound && !isPizzasLoading && (
        <div className="content__error-info">
          <h2>Ничего не найдено 😕</h2>
          <p>К сожалению, по вашему запросу ничего не найдено.</p>
        </div>
      )}

      {pizzaError && (
        <div className="content__error-info">
          <h2>Произошла ошибка:</h2>
          <h2>{pizzaError}</h2>
        </div>
      )}

      <div className="content__items">
        {pizzas.map((pizza) => (
          <PizzaBlock key={pizza.id} {...pizza} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
