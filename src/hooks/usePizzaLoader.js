import { useCallback } from "react";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

export const usePizzaLoader = (currentValues, limit, dispatch, updateURL) => {
  const loadPizzas = useCallback(async () => {
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

      await dispatch(fetchPizzas({ params }));
      updateURL();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }, [currentValues, limit, dispatch, updateURL]);

  return { loadPizzas };
};
