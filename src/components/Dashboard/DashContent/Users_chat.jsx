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

function Users_chat() {
  const masterUsersChat = useSelector((state) => state.usersChatSlice.data);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [page, setPage] = useState(1);
  const total_pages = useSelector((state) => state.usersChatSlice.total_pages);
  // Fetch users on component mount and page change
  useEffect(() => {
    dispatch(getUsersChatAction({ token, page }));
  }, [getUsersChatAction,page]);

  // States for filters
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  // Handle individual filters
  const handleGlobalSearch = (e) => setGlobalSearchTerm(e.target.value.toLowerCase());
  const handleNameFilter = (e) => setNameFilter(e.target.value.toLowerCase());
  const handleUserFilter = (e) => setUserFilter(e.target.value.toLowerCase());

  // Filtered data
  const filteredData = masterUsersChat?.filter((item) => {
    const matchesGlobal = globalSearchTerm
      ? item.name.toLowerCase().includes(globalSearchTerm) ||
        item.user_name?.name.toLowerCase().includes(globalSearchTerm)
      : true;

    const matchesName = nameFilter
      ? item.name.toLowerCase().includes(nameFilter)
      : true;

    const matchesUser = userFilter
      ? item.user_name?.name.toLowerCase().includes(userFilter)
      : true;

    return matchesGlobal && matchesName && matchesUser;
  });

  const handleOpenView = (id) => {
    dispatch(choseChate(id));
    dispatch(loading_main_chat(true));
    dispatch(loading_get_chat_history(true));
    localStorage.setItem("chat", id);
    localStorage.setItem("hints", false);
    navigate.push("/");
  };

  // dispatch(handlePages(response.data?.data.total_pages))

  console.log(filteredData)
  // const total_pages = Math.ceil(masterUsersChat?.length / 10);


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
            <div className="relative mt-1">
              <input
                type="text"
                id="global-search"
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Global Search"
                onChange={handleGlobalSearch}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-5 py-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="filter w-full px-2 py-1 rounded filter-input"
                    onChange={handleNameFilter}
                  />
                </th>
                <th className="px-5 py-3">
                  <input
                    type="text"
                    placeholder="User"
                    className="filter w-full px-2 py-1 rounded filter-input"
                    onChange={handleUserFilter}
                  />
                </th>
                <th className="px-5 py-3">ChatGPT ID</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.length > 0 ? (
                filteredData.map((item, index) => (
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
        <PaginationPages page={page} setPage={setPage} total_pages={total_pages} />
      </div>
    </section>
  );
}

export default Users_chat;
