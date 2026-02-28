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
  name: "categoires",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategoryIndex = action.payload;
    },
  },
});

export const selectActiveCategoryIndex = (state) =>
  state.categories.activeCategoryIndex;
export const selectCategories = (state) => state.categories.categories;

export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
