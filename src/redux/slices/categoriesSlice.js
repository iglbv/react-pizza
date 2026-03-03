import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategoryIndex: 0,
  categories: [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategoryIndex = action.payload;
    },

    setCategories: (state, action) => {
      state.activeCategoryIndex = Number(action.payload.activeCategoryIndex);
    },

    resetCategories: (state) => {
      state.activeCategoryIndex = 0;
    },
  },
});

export const selectActiveCategoryIndex = (state) =>
  state.categories.activeCategoryIndex;
export const selectCategories = (state) => state.categories.categories;

export const { setActiveCategory, setCategories, resetCategories } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
