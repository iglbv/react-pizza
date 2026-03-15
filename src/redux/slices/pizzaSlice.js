import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async ({ params }) => {
    const response = await axios.get(
      "https://69932cb78f29113acd403e62.mockapi.io/items",
      { params },
    );
    return response.data;
  },
);

const initialState = {
  catalog: [],
  status: "loading",
  isNotFound: false,
  error: null,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setCatalog(state, action) {
      state.catalog = action.payload.items;
    },
    resetPizzaError(state) {
      state.error = null;
      state.isNotFound = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.catalog = [];
        state.isNotFound = false;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.status = "success";
        state.isNotFound = false;
        state.error = null;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = "error";
        state.catalog = [];

        const error = action.error;
        if (error.code === "ERR_BAD_REQUEST" && error.message.includes("404")) {
          state.isNotFound = true;
          state.error = null;
        } else {
          state.isNotFound = false;
          state.error = error.message || "Произошла ошибка при загрузке";
        }
      });
  },
});

export const selectPizzaCatalog = (state) => state.pizza.catalog;
export const selectPizzaStatus = (state) => state.pizza.status;
export const selectPizzaIsNotFound = (state) => state.pizza.isNotFound;
export const selectPizzaError = (state) => state.pizza.error;

export const { setCatalog, resetPizzaError } = pizzaSlice.actions;
export default pizzaSlice.reducer;
