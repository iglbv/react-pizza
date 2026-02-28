import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSortType,
  selectSortOrder,
  setSortType,
  toggleSortOrder,
} from "../redux/slices/filtersSlice";

const sortCategories = [
  { name: "популярности", type: "rating" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "title" },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);

  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef(null);

  const activeSortName =
    sortCategories.find((obj) => obj.type === sortType)?.name || "популярности";

  const handleOrderClick = (e) => {
    e.stopPropagation();
    dispatch(toggleSortOrder());
  };

  const handleSortChange = (type) => {
    dispatch(setSortType(type));
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className="sort__label-main" onClick={() => setIsOpen(!isOpen)}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span>{activeSortName}</span>
        </div>

        <button
          className={`sort__order-btn ${sortOrder === "asc" ? "asc" : "desc"}`}
          onClick={handleOrderClick}
          aria-label={sortOrder === "asc" ? "По возрастанию" : "По убыванию"}
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortCategories.map((obj) => (
              <li
                key={obj.type}
                className={obj.type === sortType ? "active" : ""}
                onClick={() => handleSortChange(obj.type)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
