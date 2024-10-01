
"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export function PaginationPages({page , setPage}) {
  // const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={page} totalPages={100} onPageChange={onPageChange} showIcons />
    </div>
  );
}
