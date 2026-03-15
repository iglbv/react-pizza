import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import filtersReducer from "./slices/filtersSlice";
import cartReducer from "./slices/cartSlice";
import pizzaReducer from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    filters: filtersReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
