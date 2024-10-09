"use client";

import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/UserComments/Delete";
import { WarnUser } from "../DashModules/User/Warn";
import { Button, Tooltip } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import {
  addModule,
  deleteModule,
  editModule,
  getSectionId,
  getSectionsAction,
  removeError,
} from "@/app/Redux/Features/Dashboard/SectionsSlice";
import { AddSection } from "../DashModules/Sections/AddSection";
import { DeleteSections } from "../DashModules/Sections/DeleteSections";
import { EditSections } from "../DashModules/Sections/EditSections";
import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import { PaginationPages } from "../Pagination/Pagination";
import { useSnackbar } from "notistack";

function Sections() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sections = useSelector((state) => state.sectionsSlice.sections);
  const updates = useSelector((state) => state.sectionsSlice.updates);
  const [openWarn, setOpenWarn] = useState(false);

  const openAdd = useSelector((state) => state.sectionsSlice.addModule);
  const openDelete = useSelector((state) => state.sectionsSlice.deleteModule);
  const openEdit = useSelector((state) => state.sectionsSlice.editModule);
  const loading = useSelector((state) => state.sectionsSlice.loading);
  const total_pages = useSelector((state) => state.sectionsSlice.total_pages);
  const { enqueueSnackbar } = useSnackbar();
  const action = useSelector((state) => state.sectionsSlice.action);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

  useEffect(() => {
    if (action) {
      enqueueSnackbar("This action has been done successfully", {
        variant: "success",
      });
    }
  }, [action]);

  const [page, setPage] = useState(1);

  const handleOpenDelete = (id) => {
    dispatch(getSectionId({ id }));
    dispatch(deleteModule(true));
  };
  const handleOpenEdit = (id, name) => {
    dispatch(getSectionId({ id, name }));
    dispatch(editModule(true));
  };
  // const handleOpenView = () => setOpenView(!openView);
  const handleOpenWarn = () => setOpenWarn(!openWarn);

  // start add module
  const handleOpenAdd = () => {
    dispatch(addModule(true));
  };
  // end add module

  const handleClose = () => {
    dispatch(addModule(false));
    dispatch(deleteModule(false));
    dispatch(editModule(false));
    dispatch(removeError());

    // dispatch(removeUser());

    // dispatch(deleteModule(false));
    // dispatch(viewModule(false));
  };

  useEffect(() => {
    dispatch(getSectionsAction({ token, page }));
  }, [updates, page]);

  // Step 1: State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Step 2: Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Step 3: Filter the rows based on the search term
  const filteredData = sections.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm);
    // item.email.toLowerCase().includes(searchTerm)
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
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
                    Sections
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-3xl">Sections</h1>
            </div>
            {permissionsData && permissionsData.includes(9) && (
              <div>
                <Button color="blue" onClick={handleOpenAdd}>
                  New Section
                </Button>
              </div>
            )}
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
                      stroke-width="2"
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
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.length > 0 ? (
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
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {formatDate(item.created_at)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          {/* start edit */}
                          {permissionsData && permissionsData.includes(10) && (
                            <Tooltip content="Edit Section">
                              <button
                                type="button"
                                className="flex items-center bg-slate-700 p-1 px-2 rounded text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-4"
                                  onClick={() =>
                                    handleOpenEdit(item.id, item.name)
                                  }
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                  />
                                </svg>
                              </button>
                            </Tooltip>
                          )}
                          {/* end edit */}
                          {/* start delete */}
                          {permissionsData && permissionsData.includes(11) && (
                            <Tooltip content="Delete Section">
                              <button
                                type="button"
                                className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
                                onClick={() => handleOpenDelete(item.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                            </Tooltip>
                          )}
                          {/* start delete */}
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
        <PaginationPages
          page={page}
          total_pages={total_pages}
          setPage={setPage}
        />
      </section>

      {openDelete && (
        <DeleteSections openDelete={openDelete} handleClose={handleClose} />
      )}
      {openEdit && (
        <EditSections handleClose={handleClose} openEdit={openEdit} />
      )}
      {openWarn && (
        <WarnUser
          handleOpenWarn={handleOpenWarn}
          openWarn={openWarn}
          setOpenWarn={setOpenWarn}
        />
      )}
      {openAdd && <AddSection handleClose={handleClose} openAdd={openAdd} />}

      {loading && <SnackbarTooltip />}
    </>
  );
}

export default Sections;
