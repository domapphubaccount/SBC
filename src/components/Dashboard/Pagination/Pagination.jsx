
"use client";

import { Pagination } from "@mui/material"; // Import MUI Pagination
import { useDispatch } from "react-redux";
// import { setPage } from "@/app/Redux/Features/Dashboard/Pagination/Pagination";

export function PaginationPages({ page, setPage, dynamic, total_pages }) {
  const dispatch = useDispatch();

  // Define the onPageChange handler
  const onPageChange = (event, pageNumber) => {
    if (dynamic) {
      dispatch(setPage(pageNumber)); // Dispatch Redux action if dynamic
    } else {
      setPage(pageNumber); // Call the provided setPage function
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 ">
      <div className="bg-slate-200 rounded-full p-1 mt-3">
      {/* MUI Pagination Component */}
      <Pagination
        className="p-0"
        count={total_pages}        // Total number of pages
        page={page}                // Current page
        onChange={onPageChange}    // Page change handler
        showFirstButton            // Show first button
        showLastButton             // Show last button
        siblingCount={2}           // Adjust number of siblings
        boundaryCount={1}          // Adjust boundary pages
      />
      </div>
    </div>
  );
}
