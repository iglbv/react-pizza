import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  pizzas: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action) {
      const findItem = state.pizzas.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.pizzas.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.pizzas.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removePizza(state, action) {
      state.pizzas.filter((obj) => obj.id !== action.payload);
    },
    clearPizza(state, action) {
      state.pizzas = [];
    },
  },
});

export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectPizzaItems = (state) => state.cart.pizzas;

export const { addPizza, removePizza, clearPizza } = cartSlice.actions;
export default cartSlice.reducer;
