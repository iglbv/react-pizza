import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    filters: filtersReducer,
  },
});
