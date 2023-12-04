import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { setPage } from "../../Redux/slices/filterSlice.ts";
import { useDispatch, useSelector } from "react-redux";
export default function Pagination() {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e: { selected: number }) =>
        dispatch(setPage(e.selected + 1))
      }
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
