import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCategory,
  selectCategories,
  selectActiveCategoryIndex,
} from "../redux/slices/categoriesSlice";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const activeCategoryIndex = useSelector(selectActiveCategoryIndex);

  const handleCategoryChange = (index) => {
    dispatch(setActiveCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={index === activeCategoryIndex ? "active" : ""}
            onClick={() => handleCategoryChange(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
