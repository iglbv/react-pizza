import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../redux/slices/filtersSlice";
import { setCategories } from "../redux/slices/categoriesSlice";

export const usePizzaFilters = (
  initialCategory,
  initialSortType,
  initialSortOrder,
  initialSearchValue,
  initialPage,
  searchParams,
) => {
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const [isInitialized, setIsInitialized] = useState(false);

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
    if (!isInitialized) return;

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

  return {
    currentValues,
    setCurrentValues,
    isInitialized,
    getInitialValues,
  };
};
