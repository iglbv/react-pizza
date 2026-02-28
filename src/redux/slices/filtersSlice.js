import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortType: "rating",
  sortOrder: "asc",
  searchValue: "",
  currentPage: 1,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.sortType = "rating";
      state.sortOrder = "asc";
      state.searchValue = "";
      state.currentPage = 1;
    },
  },
});

export const selectSortType = (state) => state.filters.sortType;
export const selectSortOrder = (state) => state.filters.sortOrder;
export const selectSearchValue = (state) => state.filters.searchValue;
export const selectCurrentPage = (state) => state.filters.currentPage;

export const {
  setSortType,
  setSortOrder,
  toggleSortOrder,
  setSearchValue,
  setCurrentPage,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
