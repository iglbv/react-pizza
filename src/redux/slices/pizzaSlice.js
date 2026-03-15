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
  status: "loading", // 'loading' | 'success' | 'error'
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setCatalog(state, action) {
      state.catalog = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.catalog = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = "error";
        state.catalog = [];
      });
  },
});

export const selectPizzaCatalog = (state) => state.pizza.catalog;
export const selectPizzaStatus = (state) => state.pizza.status;

export const { setCatalog } = pizzaSlice.actions;
export default pizzaSlice.reducer;
