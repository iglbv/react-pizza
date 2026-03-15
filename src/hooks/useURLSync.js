import { useCallback } from "react";
import qs from "qs";

export const useURLSync = (currentValues, navigate, isUpdatingFromURL) => {
  const updateURL = useCallback(() => {
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
  }, [currentValues, navigate, isUpdatingFromURL]);

  return { updateURL };
};
