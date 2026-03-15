import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPizzaCatalog,
  selectPizzaStatus,
} from "../redux/slices/pizzaSlice";
import { usePizzaFilters } from "./usePizzaFilters";
import { usePizzaLoader } from "./usePizzaLoader";
import { useURLSync } from "./useURLSync";

export const usePizzas = (
  initialCategory,
  initialSortType,
  initialSortOrder,
  initialSearchValue,
  initialPage = 1,
  limit = 5,
) => {
  const pizzas = useSelector(selectPizzaCatalog);
  const pizzaStatus = useSelector(selectPizzaStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isNotFound, setIsNotFound] = useState(false);
  const [pizzaError, setPizzaError] = useState(null);
  const isUpdatingFromURL = useRef(false);

  const { currentValues, isInitialized } = usePizzaFilters(
    initialCategory,
    initialSortType,
    initialSortOrder,
    initialSearchValue,
    initialPage,
    searchParams,
  );

  const { updateURL } = useURLSync(currentValues, navigate, isUpdatingFromURL);

  const { loadPizzas } = usePizzaLoader(
    currentValues,
    limit,
    dispatch,
    setIsNotFound,
    setPizzaError,
    updateURL,
  );

  useEffect(() => {
    if (!isUpdatingFromURL.current) {
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      loadPizzas();
    }
  }, [currentValues, isInitialized, loadPizzas]);

  const isPizzasLoading = pizzaStatus === "loading";

  return {
    pizzas,
    isPizzasLoading,
    pizzaError,
    isNotFound,
  };
};
