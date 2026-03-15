import { useCallback } from "react";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

export const usePizzaLoader = (
  currentValues,
  limit,
  dispatch,
  setIsNotFound,
  setPizzaError,
  updateURL,
) => {
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

      const resultAction = await dispatch(fetchPizzas({ params }));

      if (fetchPizzas.fulfilled.match(resultAction)) {
        setPizzaError(null);
        setIsNotFound(false);
        updateURL();
        window.scrollTo(0, 0);
      } else if (fetchPizzas.rejected.match(resultAction)) {
        const error = resultAction.error;

        if (error.code === "ERR_BAD_REQUEST" && error.message.includes("404")) {
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
  }, [currentValues, limit, dispatch, setIsNotFound, setPizzaError, updateURL]);

  return { loadPizzas };
};
