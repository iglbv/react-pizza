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
      const findItem = state.pizzas.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

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
      state.pizzas = state.pizzas.filter(
        (obj) =>
          !(
            obj.id === action.payload.id &&
            obj.type === action.payload.type &&
            obj.size === action.payload.size
          ),
      );

      state.totalPrice = state.pizzas.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusPizza(state, action) {
      const findItem = state.pizzas.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.pizzas = state.pizzas.filter(
            (obj) => obj.id !== action.payload,
          );
        }
      }

      state.totalPrice = state.pizzas.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    clearPizza(state, action) {
      state.pizzas = [];
      state.totalPrice = 0;
    },
  },
});

export const selectPizzaItems = (state) => state.cart.pizzas;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectTotalCount = (state) =>
  state.cart.pizzas.reduce((sum, item) => sum + item.count, 0);

export const { addPizza, removePizza, minusPizza, clearPizza } =
  cartSlice.actions;
export default cartSlice.reducer;
