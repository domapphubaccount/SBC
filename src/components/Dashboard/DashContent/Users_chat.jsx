"use client";

import React, { useEffect, useState } from "react";
import { ViewUser } from "../DashModules/User/View";
import { PaginationPages } from "../Pagination/Pagination";
import { getUsersChatAction } from "@/app/Redux/Features/Dashboard/MasterUsersChat";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import { choseChate, loading_main_chat } from "@/app/Redux/Features/Chat/ChatSlice";
import { loading_get_chat_history } from "@/app/Redux/Features/Chat_History/historySlice";

function Users_chat() {
  const masterUsersChat = useSelector((state) => state.usersChatSlice.data);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [page , setPage] = useState(1);
  const total_pages = useSelector((state) => state.usersChatSlice.total_pages);
  
  useEffect(() => {
    dispatch(getUsersChatAction({ token , page }));
  }, [getUsersChatAction , page]);

  // Step 1: State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Step 2: Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Step 3: Filter the rows based on the search term
  const filteredData = masterUsersChat?.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm);
  });

  const handleOpenView = (id) => {
    dispatch(choseChate(id));
    dispatch(loading_main_chat(true));
    dispatch(loading_get_chat_history(true));
    localStorage.setItem("chat", id);
    navigate.push('/')

  }

  return (
    <>
      <section>
        <div>
          <div
            className="flex py-3 pt-4 text-white rounded-lg"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-blue-600"
                  >
                    Dashboard
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-white md:ms-2">
                    chat
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-3xl">USER'S CHAT</h1>
            </div>
            <div></div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-md w-full m-auto dashed">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-900">
              <label for="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for User"
                  onChange={handleSearchChange} // Handle search input change
                />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Chatgpt ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {masterUsersChat?.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <div className="hover:font-bold">
                          {item.user_name.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="hover:font-bold">{item.chatgpt_id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-start">
                          {/* start view */}
                          <Tooltip content="View Chat">
                            <button
                              type="button"
                              className="flex items-center bg-slate-700 p-1 py-1 px-2 rounded text-white"
                              onClick={() => handleOpenView(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </button>
                          </Tooltip>
                          {/* end view */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4">NO DATA YET</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationPages page={page} total_pages={total_pages} setPage={setPage} />
      </section>
    </>
  );
}

export default Users_chat;
