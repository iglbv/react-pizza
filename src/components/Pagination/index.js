import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
