import { useState, useEffect, useCallback, useRef } from "react";
import qs from "qs";
import { useNavigate, useSearchParams } from "react-router";
import { setFilters } from "../redux/slices/filtersSlice";
import { setCategories } from "../redux/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPizzaCatalog,
  selectPizzaStatus,
  fetchPizzas,
} from "../redux/slices/pizzaSlice";

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

  const [isNotFound, setIsNotFound] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [pizzaError, setPizzaError] = useState(null);

  const isFirstRender = useRef(true);
  const isUpdatingFromURL = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const getInitialValues = useCallback(() => {
    const currentPage = Number(searchParams.get("currentPage")) || initialPage;
    const sortBy = searchParams.get("sortBy") || initialSortType;
    const order = searchParams.get("order") || initialSortOrder;
    const categoryParam = searchParams.get("category");
    const category =
      categoryParam !== null ? Number(categoryParam) : initialCategory;
    const search = searchParams.get("search") || initialSearchValue;

    return {
      category,
      sortType: sortBy,
      sortOrder: order,
      page: currentPage,
      searchValue: search,
    };
  }, [
    searchParams,
    initialPage,
    initialSortType,
    initialSortOrder,
    initialCategory,
    initialSearchValue,
  ]);

  const [currentValues, setCurrentValues] = useState(getInitialValues);

  useEffect(() => {
    if (!isFirstRender.current) return;

    const currentPage = Number(searchParams.get("currentPage")) || initialPage;
    const sortBy = searchParams.get("sortBy") || initialSortType;
    const order = searchParams.get("order") || initialSortOrder;
    const categoryParam = searchParams.get("category");

    dispatch(
      setFilters({
        sortType: sortBy,
        sortOrder: order,
        currentPage,
      }),
    );

    if (categoryParam !== null) {
      dispatch(
        setCategories({
          activeCategoryIndex: Number(categoryParam) || 0,
        }),
      );
    }

    setCurrentValues(getInitialValues());
    setIsInitialized(true);
    isFirstRender.current = false;
  }, [
    dispatch,
    getInitialValues,
    initialPage,
    initialSortOrder,
    initialSortType,
    searchParams,
  ]);

  useEffect(() => {
    if (!isInitialized || isUpdatingFromURL.current) return;

    const newValues = {
      category: initialCategory,
      sortType: initialSortType,
      sortOrder: initialSortOrder,
      page: initialPage,
      searchValue: initialSearchValue,
    };

    const hasChanges = Object.keys(newValues).some(
      (key) => newValues[key] !== currentValues[key],
    );

    if (hasChanges) {
      setCurrentValues(newValues);
    }
  }, [
    initialCategory,
    initialSortType,
    initialSortOrder,
    initialSearchValue,
    initialPage,
    isInitialized,
    currentValues,
  ]);

  useEffect(() => {
    if (!isInitialized) return;

    const loadPizzas = async () => {
      try {
        const params = {
          page: currentValues.page,
          limit,
          ...(currentValues.category !== 0 && {
            category: currentValues.category,
          }),
          ...(currentValues.searchValue && {
            search: currentValues.searchValue,
          }),
          sortBy:
            currentValues.sortType === "price"
              ? "price"
              : currentValues.sortType === "name"
                ? "name"
                : "rating",
          order: currentValues.sortOrder,
        };

        const resultAction = await dispatch(fetchPizzas({ params }));

        if (fetchPizzas.fulfilled.match(resultAction)) {
          setPizzaError(null);
          setIsNotFound(false);

          updateURL();

          window.scrollTo(0, 0);
        } else if (fetchPizzas.rejected.match(resultAction)) {
          const error = resultAction.error;

          if (
            error.code === "ERR_BAD_REQUEST" &&
            error.message.includes("404")
          ) {
            setIsNotFound(true);
          } else {
            setPizzaError(error.message || "Произошла ошибка при загрузке");
          }
          console.error("Error fetching pizzas:", error);
        }
      } catch (error) {
        setPizzaError(error.message || "Произошла непредвиденная ошибка");
        console.error("Unexpected error:", error);
      }
    };

    const updateURL = () => {
      isUpdatingFromURL.current = true;

      const queryParams = {
        ...(currentValues.page !== 1 && { currentPage: currentValues.page }),
        ...(currentValues.category !== 0 && {
          category: currentValues.category,
        }),
        ...(currentValues.sortType !== "rating" && {
          sortBy: currentValues.sortType,
        }),
        ...(currentValues.sortOrder !== "asc" && {
          order: currentValues.sortOrder,
        }),
        ...(currentValues.searchValue && {
          search: currentValues.searchValue,
        }),
      };

      const queryString = qs.stringify(queryParams, {
        encode: false,
        skipNulls: true,
      });

      navigate(queryString ? `?${queryString}` : "", { replace: true });

      setTimeout(() => {
        isUpdatingFromURL.current = false;
      }, 0);
    };

    loadPizzas();
  }, [currentValues, limit, navigate, dispatch, isInitialized]);

  const isPizzasLoading = pizzaStatus === "loading";

  return {
    pizzas,
    isPizzasLoading,
    pizzaError,
    isNotFound,
  };
};
