import { Pagination } from "@mui/material";
import React from "react";

function PagePagination({totalPages,pagez,onPageChange}) {
  return (
    <div className="flex items-center justify-center space-x-4 ">
      <div className="bg-slate-200 rounded-full p-1 mt-3">
        <Pagination
          className="p-0"
          count={totalPages} // Total number of pages
          page={pagez + 1} // Current page
          onChange={onPageChange} // Page change handler
          showFirstButton // Show first button
          showLastButton // Show last button
          siblingCount={2} // Adjust number of siblings
          boundaryCount={1} // Adjust boundary pages
        />
      </div>
    </div>
  );
}

export default PagePagination;
