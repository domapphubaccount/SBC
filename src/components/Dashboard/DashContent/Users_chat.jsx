"use client";

import React, { useEffect, useState } from "react";
import { PaginationPages } from "../Pagination/Pagination";
import { getUsersChatAction } from "@/app/Redux/Features/Dashboard/MasterUsersChat";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import {
  choseChate,
  loading_main_chat,
} from "@/app/Redux/Features/Chat/ChatSlice";
import { loading_get_chat_history } from "@/app/Redux/Features/Chat_History/historySlice";
import PagePagination from "../Pagination/PagePagination";

function Users_chat() {
  const masterUsersChat = useSelector((state) => state.usersChatSlice.data);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [page, setPage] = useState(1);
  // Fetch users on component mount and page change
  useEffect(() => {
    dispatch(getUsersChatAction({ token, page }));
  }, [getUsersChatAction,page]);


  const handleOpenView = (id) => {
    dispatch(choseChate(id));
    dispatch(loading_main_chat(true));
    dispatch(loading_get_chat_history(true));
    localStorage.setItem("chat", id);
    localStorage.setItem("hints", false);
    navigate.push("/");
  };


  // filter and pagination
  const [searchTerms, setSearchTerms] = useState({});
  const [pagez, setPagez] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Update search term for a column
  const handleSearchChange = (column, value) => {
    setPagez(0);
    setSearchTerms((prev) => ({
      ...prev,
      [column]: value.toLowerCase(),
    }));
  };

  const filteredData = masterUsersChat?.filter((row) =>
    Object.entries(searchTerms).every(([column, term]) => {
      if (!term) return true; // Skip if no search term
      // Default case for other columns
      if (column === "user_name") {
        // Handle nested section.name filtering
        return row.user_name?.name?.toLowerCase().includes(term);
      }

      return row[column]?.toLowerCase().includes(term);
    })
  );

  const paginatedData = filteredData?.slice(
    pagez * rowsPerPage,
    pagez * rowsPerPage + rowsPerPage
  );
  const onPageChange = (event, pageNumber) => {
    setPagez(pageNumber - 1);
  };
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);

  return (
    <section>
      {/* Header Section */}
      <div>
        <div className="flex py-3 pt-4 text-white rounded-lg" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li>
              <a href="#" className="text-sm font-medium text-white hover:text-blue-600">
                Dashboard
              </a>
            </li>
            <li aria-current="page">
              <span className="ms-1 text-sm font-medium text-white md:ms-2">
                Chat
              </span>
            </li>
          </ol>
        </div>
        <div className="flex justify-between my-5">
          <h1 className="text-white text-3xl">USER'S CHAT</h1>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-8 rounded-md w-full m-auto dashed">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            {/* <div className="relative mt-1">
              <input
                type="text"
                id="global-search"
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Global Search"
                onChange={handleGlobalSearch}
              />
            </div> */}
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-5 py-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="filter w-full px-2 py-1 rounded filter-input"
                    onChange={(e) => handleSearchChange("name", e.target.value)}
                    />
                </th>
                <th className="px-5 py-3">
                  <input
                    type="text"
                    placeholder="User"
                    className="filter w-full px-2 py-1 rounded filter-input"
                    onChange={(e) => handleSearchChange("user_name", e.target.value)}
                    />
                </th>
                <th className="px-5 py-3">
                <input
                type="text"
                onChange={(e) => handleSearchChange("chatgpt_id", e.target.value)}
                placeholder="ChatGPT ID"
                className="filter w-full px-2 py-1 rounded filter-input"
              />
                </th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.user_name?.name}</td>
                    <td className="px-6 py-4">{item.chatgpt_id}</td>
                    <td className="px-6 py-4">
                      <Tooltip content="View Chat">
                        <button
                          className="bg-slate-700 p-1 px-2 text-white rounded"
                          onClick={() => handleOpenView(item.id)}
                        >
                          View
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Component */}

        <PagePagination
          totalPages={totalPages}
          pagez={pagez}
          onPageChange={onPageChange}
        />


        {/* <PaginationPages page={page} setPage={setPage} total_pages={total_pages} /> */}
      </div>
    </section>
  );
}

export default Users_chat;
