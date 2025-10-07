"use client";

import React, { useEffect, useRef, useState } from "react";
import { PaginationPages } from "../Pagination/Pagination";
import { getUsersChatAction } from "@/app/Redux/Features/Dashboard/MasterUsersChat";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import {
  choseChate,
  loading_main_chat,
} from "@/app/Redux/Features/Chat/ChatSlice";
import { loading_get_chat_history } from "@/app/Redux/Features/Chat_History/historySlice";
import PagePagination from "../Pagination/PagePagination";
import DatePicker from "react-datepicker";

function Users_chat() {
  const masterUsersChat = useSelector((state) => state.usersChatSlice.data);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [page, setPage] = useState(1);
  // Fetch users on component mount and page change
  useEffect(() => {
    dispatch(getUsersChatAction({ token, page }));
  }, [getUsersChatAction, page]);

  const handleOpenView = (id) => {
    dispatch(choseChate(id));
    dispatch(loading_main_chat(true));
    dispatch(loading_get_chat_history(true));
    sessionStorage.setItem("chat", id);
    sessionStorage.setItem("hints", false);
    navigate.push("/");
  };

  // filter and pagination
  const [searchTerms, setSearchTerms] = useState({});
  const [pagez, setPagez] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Update search term for a column
  const handleSearchChange = (column, value) => {
    setPagez(0);
    setSearchTerms((prev) => ({
      ...prev,
      [column]: value.toLowerCase(),
    }));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

  const convertToDate = (dateString) => {
    return new Date(dateString); // Ensure the string is in a format JavaScript can parse
  };

  // Handle date range change
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // Clear the date filter if no range is selected
    setSearchTerms((prev) => ({
      ...prev,
      created_at: start && end ? { start, end } : "",
    }));
  };

  const filteredData = masterUsersChat?.filter((row) =>
    Object.entries(searchTerms).every(([column, term]) => {
      if (!term) return true; // Skip if no search term
      if (column === "user_name") {
        return row.user_name?.name?.toLowerCase().includes(term);
      }
      if (column === "name") {
        return row.name?.toLowerCase().includes(term);
      }
      if (column === "chatgpt_id") {
        return row.chatgpt_id?.toLowerCase().includes(term);
      }

      if (startDate && endDate) {
        console.log(row);
        const rowDate = convertToDate(row[column]); // Assuming 'last_seen' is the key
        return rowDate >= startDate && rowDate <= endDate;
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

  const formRef = useRef(null);
  const handleReset = (formRef) => {
    formRef.current.reset();
    setSearchTerms({});
    setPagez(0);
    setRowsPerPage(10); // Optional: Keep the default rows per page
    setStartDate("");
    setEndDate("");
  };
  return (
    <section>
      {/* Header Section */}
      <div>
        <div
          className="flex py-3 pt-4 text-white rounded-lg"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="text-sm font-medium text-white hover:text-blue-600"
              >
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

            <div className="flex justify-between">
              <div className="m-2">
                <Button className="flex" onClick={() => handleReset(formRef)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
            className="w-full"
          >
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-5 py-3">
                    <input
                      type="text"
                      placeholder="Name"
                      className="filter w-full px-2 py-1 rounded filter-input"
                      onChange={(e) =>
                        handleSearchChange("name", e.target.value)
                      }
                    />
                  </th>
                  <th className="px-5 py-3">
                    <input
                      type="text"
                      placeholder="User"
                      className="filter w-full px-2 py-1 rounded filter-input"
                      onChange={(e) =>
                        handleSearchChange("user_name", e.target.value)
                      }
                    />
                  </th>
                  <th className="px-5 py-3">
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      placeholderText="Date"
                      className="w-full px-2 py-1 rounded filter-input"
                    />
                  </th>
                  <th className="px-5 py-3">
                    <input
                      type="text"
                      onChange={(e) =>
                        handleSearchChange("chatgpt_id", e.target.value)
                      }
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
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.user_name?.name}</td>
                      <td className="px-6 py-4">
                        {formatDate(item.created_at)}
                      </td>
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
                  <tr className="border-2">
                    <td colSpan={5} className="text-center p-4">
                      NO DATA YET !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </form>
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
