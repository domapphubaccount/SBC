"use client";

import { Pagination } from "flowbite-react";
import { useDispatch } from "react-redux";
// import { setPage } from "@/app/Redux/Features/Dashboard/Pagination/Pagination";

export function PaginationPages({ page, setPage, dynamic, total_pages }) {
  const dispatch = useDispatch();

  // Define the onPageChange handler
  const onPageChange = (pageNumber) => {
    if (dynamic) {
      dispatch(setPage(pageNumber)); // Dispatch Redux action if dynamic
    } else {
      setPage(pageNumber); // Call the provided setPage function
    }
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={page}
        totalPages={total_pages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
