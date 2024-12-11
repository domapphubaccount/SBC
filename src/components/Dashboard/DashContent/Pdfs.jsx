"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WarnUser } from "../DashModules/User/Warn";
import { Button, Tooltip } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { roleModule } from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import { editModule } from "@/app/Redux/Features/Dashboard/RolesSlice";
import {
  addModule,
  assignModule,
  closePdfError,
  deleteModule,
  forceDeleteModule,
  getDeletedPdfsAction,
  getPdfsAction,
  restoreModule,
  setDisplayedData,
  viewModule,
} from "@/app/Redux/Features/Dashboard/PdfsSlice";
import { Addpdfs } from "../DashModules/Pdfs/AddPdfs";
import { DeletePdfs } from "../DashModules/Pdfs/Delete";
import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import { Assign } from "../DashModules/Pdfs/Assign";
import { ViewPdf } from "../DashModules/Pdfs/View";
import { PaginationPages } from "../Pagination/Pagination";
import { useSnackbar } from "notistack";
import { setPage } from "@/app/Redux/Features/Dashboard/PdfsSlice";
import { RestorePdf } from "./RestorePdf";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Pagination } from "@mui/material";
import PagePagination from "../Pagination/PagePagination";
import DatePicker from "react-datepicker";

function Pdfs({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const pdfsData = useSelector((state) => state.pdfsSlice.pdfs);
  const updatePdfsData = useSelector((state) => state.pdfsSlice.updates);
  const [openWarn, setOpenWarn] = useState(false);
  const [fileId, setFileID] = useState("");
  const openDelete = useSelector((state) => state.pdfsSlice.deleteModule);
  const openForceDelete = useSelector(
    (state) => state.pdfsSlice.forceDeleteModule
  );
  const openRestoreDeletedFile = useSelector(
    (state) => state.pdfsSlice.restoreModule
  );
  const openRole = useSelector((state) => state.usersSlice.roleModule);
  const openAdd = useSelector((state) => state.pdfsSlice.addModule);
  const openView = useSelector((state) => state.pdfsSlice.viewModule);
  const openAssign = useSelector((state) => state.pdfsSlice.assignModule);
  const loading = useSelector((state) => state.pdfsSlice.loading);
  const [page, setPagec] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const action = useSelector((state) => state.pdfsSlice.action);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );
  const loadingUsers = useSelector((state) => state.usersSlice.loading);
  const [fileType, setFileType] = useState(0);
  const { allData, displayedData, currentPage } = useSelector(
    (state) => state.pdfsSlice
  );
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (action) {
      enqueueSnackbar("This action has been done successfully", {
        variant: "success",
      });
    }
  }, [action]);

  const handleClose = () => {
    dispatch(editModule(false));
    dispatch(assignModule(false));
    dispatch(deleteModule(false));
    dispatch(viewModule(false));
    dispatch(roleModule(false));
    dispatch(addModule(false));
    dispatch(closePdfError());
    dispatch(restoreModule(false));
    dispatch(forceDeleteModule(false));
  };

  // start open delete
  const handleOpenDelete = (id) => {
    setFileID(id);
    dispatch(deleteModule(true));
  };
  // end open delete

  // start open delete
  const handleOpenForceDelete = (id) => {
    setFileID(id);
    dispatch(forceDeleteModule(true));
  };
  // end open delete

  // start open edit
  const handleOpenRestoreDeletedFile = (id) => {
    setFileID(id);
    dispatch(restoreModule(true));
  };
  // end open edit

  // start open assigned
  const handleOpenAssigned = (item) => {
    setFileID(item);
    dispatch(assignModule(true));
  };
  // end open assigned

  // start add role             ####DONE
  const handleOpenAdd = () => {
    dispatch(addModule(true));
  };
  // end add role

  // start open view
  const handleOpenView = (id) => {
    setFileID(id);
    dispatch(viewModule(true));
  };
  // end open view

  useEffect(() => {
    if (deleted) {
      dispatch(getDeletedPdfsAction({ token, page, fileType }));
    } else {
      dispatch(getPdfsAction({ token, page, fileType }));
    }
  }, [updatePdfsData, page, fileType, deleted]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

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

  const convertToDate = (dateString) => {
    return new Date(dateString); // Ensure the string is in a format JavaScript can parse
  };

  // Handle date range change
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Set the date range in search terms
    setSearchTerms((prev) => ({
      ...prev,
      created_at: start && end ? { start, end } : "", // Only set if both dates are present
    }));
  };

  const filteredData = allData
    .filter((item) => item.type === fileType)
    .filter((row) =>
      Object.entries(searchTerms).every(([column, term]) => {
        console.log(column);
        if (!term) return true; // Skip if no search term

        if (column === "section") {
          // Handle nested section.name filtering
          return row.section?.name?.toLowerCase().includes(term);
        }

        if (column === "who_assigneds") {
          // Check if any of the names in who_assigneds matches the search term
          return row.who_assigneds?.some((assignee) =>
            assignee.name?.toLowerCase().includes(term)
          );
        }

        if (startDate && endDate) {
          // Convert the last_seen string to Date
          const rowDate = convertToDate(row[column]);

          // Check if the date falls within the selected range
          return rowDate >= startDate && rowDate <= endDate;
        }

        // Default case for other columns
        return row[column]?.toLowerCase().includes(term);
      })
    );
  const paginatedData = filteredData.slice(
    pagez * rowsPerPage,
    pagez * rowsPerPage + rowsPerPage
  );
  const onPageChange = (event, pageNumber) => {
    setPagez(pageNumber - 1);
  };
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const tableData = useCallback(() => {
    return (
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              className={`px-5 py-3 border-b-2 border-gray-200 ${
                deleted ? "bg-red-200 " : "bg-gray-100 "
              } text-left text-xs font-semibold text-gray-600 uppercase tracking-wider`}
            >
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => handleSearchChange("name", e.target.value)}
                className="filter w-full px-2 py-1 rounded filter-input"
              />
            </th>
            <th
              className={`px-5 py-3 border-b-2 border-gray-200 ${
                deleted ? "bg-red-200 " : "bg-gray-100 "
              } text-left text-xs font-semibold text-gray-600 uppercase tracking-wider`}
            >
              <input
                type="text"
                placeholder="Who Assigned"
                onChange={(e) =>
                  handleSearchChange("who_assigneds", e.target.value)
                }
                className="filter w-full px-2 py-1 rounded filter-input"
              />
            </th>
            <th
              className={`px-5 py-3 border-b-2 border-gray-200 ${
                deleted ? "bg-red-200 " : "bg-gray-100 "
              } text-left text-xs font-semibold text-gray-600 uppercase tracking-wider`}
            >
              <input
                type="text"
                placeholder="File"
                onChange={(e) => handleSearchChange("file", e.target.value)}
                className="filter w-full px-2 py-1 rounded filter-input"
              />
            </th>
            <th
              className={`px-5 py-3 border-b-2 border-gray-200 ${
                deleted ? "bg-red-200 " : "bg-gray-100 "
              } text-left text-xs font-semibold text-gray-600 uppercase tracking-wider`}
            >
              <input
                type="text"
                placeholder="Section"
                onChange={(e) => handleSearchChange("section", e.target.value)}
                className="filter w-full px-2 py-1 rounded filter-input"
              />
            </th>
            <th
              className={`px-5 py-3 border-b-2 border-gray-200 ${
                deleted ? "bg-red-200 " : "bg-gray-100 "
              } text-left text-xs font-semibold text-gray-600 uppercase tracking-wider`}
            >
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                placeholderText="Select a date range"
                className="w-full px-2 py-1 rounded filter-input"
              />
            </th>
            <th
              className={`px-5 py-3 border-b-2 border-gray-200 ${
                deleted ? "bg-red-200 " : "bg-gray-100 "
              } text-left text-xs font-semibold text-gray-600 uppercase tracking-wider`}
            >
              <input
                type="text"
                placeholder="Created By"
                onChange={(e) =>
                  handleSearchChange("uploaded_by", e.target.value)
                }
                className="filter w-full px-2 py-1 rounded filter-input"
              />
            </th>
            <th
              className={`px-5 py-3 border-b-2 border-gray-200 ${
                deleted ? "bg-red-200 " : "bg-gray-100 "
              } text-left text-xs font-semibold text-gray-600 uppercase tracking-wider`}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} className="user_row hover:bg-gray-200">
                <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm ">
                  <div className="flex justify-center">
                    <Tooltip
                      className="w-60 bg-gray-50 border-2 border-gray-300 rounded-md shadow-lg p-2 text-center max-h-72 overflow-auto"
                      style={{
                        padding: "10px",
                        backgroundColor: "#f9fafb",
                        color: "#374151",
                      }}
                      content={
                        <ul className="text-gray-700">
                          {item?.who_assigneds?.length > 0 ? (
                            item?.who_assigneds?.map((item2, i) => (
                              <li
                                key={i}
                                className="flex justify-start text-xs text-gray-800 mb-1"
                              >
                                {i + 1}: {item2.name}
                              </li>
                            ))
                          ) : (
                            <div className="text-sm text-red-500 font-medium">
                              "NO ONE ASSIGNED"
                            </div>
                          )}
                        </ul>
                      }
                    >
                      <div className="ms-5">
                        <AdminPanelSettingsIcon className="text-gray-700 hover:text-blue-500" />
                      </div>
                    </Tooltip>
                  </div>
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <Tooltip
                        content={item.file.replace("public/uploads/", "")}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.file.replace("public/uploads/", "").length > 25
                            ? item.file
                                .replace("public/uploads/", "")
                                .slice(0, 25) + "..."
                            : item.file.replace("public/uploads/", "")}
                        </p>
                      </Tooltip>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item?.section?.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.uploaded_by}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                  <div className="flex gap-2 justify-start">
                    {/* start view */}
                    <Tooltip content="View File">
                      <button
                        type="button"
                        className="flex items-center bg-slate-700 p-1 py-1 px-2 rounded text-white"
                        onClick={() => handleOpenView(item)}
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

                    {deleted ? (
                      <>
                        <Tooltip content="RESTORE">
                          <button
                            type="button"
                            className="flex items-center bg-slate-700 p-1 px-2 rounded text-white"
                            onClick={() =>
                              handleOpenRestoreDeletedFile(item.id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                              />
                            </svg>
                          </button>
                        </Tooltip>
                        {/* start delete */}
                        {permissionsData &&
                          permissionsData.includes("files.forceDelete") && (
                            <Tooltip content="Delete">
                              <button
                                type="button"
                                className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
                                onClick={() =>
                                  handleOpenForceDelete(item.chatgpt_file_id)
                                }
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
                      </>
                    ) : (
                      <>
                        {/* start Assigned */}
                        <Tooltip content="Assigned">
                          <button
                            type="button"
                            className="flex items-center bg-slate-700 p-1 px-2 rounded text-white"
                            onClick={() => handleOpenAssigned(item)}
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
                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                              />
                            </svg>
                          </button>
                        </Tooltip>
                        {/* end Assigned */}

                        {/* start delete */}
                        {permissionsData &&
                          permissionsData.includes("files.softDelete") && (
                            <Tooltip content="Delete">
                              <button
                                type="button"
                                className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
                                onClick={() =>
                                  handleOpenDelete(item.chatgpt_file_id)
                                }
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
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-2"><td colSpan={5} className="text-center p-4">NO DATA YET !</td></tr>
          )}
        </tbody>
      </table>
    );
  }, [filteredData, displayedData]);

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
                  <a className="text-sm font-medium text-white hover:text-blue-600">
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
                    Building Code
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-3xl">BUILDING CODE</h1>
            </div>
            {permissionsData && permissionsData.includes("files.upload") && (
              <div className="flex">
                <div className="checkbox-wrapper-16 mr-3">
                  <label className="checkbox-wrapper">
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      onChange={(e) =>
                        e.target.checked ? setFileType(1) : setFileType(0)
                      }
                    />
                    <span className="checkbox-tile">
                      <span className="checkbox-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </span>
                      <span className="checkbox-label">Assistant</span>
                    </span>
                  </label>
                </div>

                <Button color="blue" onClick={handleOpenAdd}>
                  Add Pdfs
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-md w-full m-auto dashed overflow-auto">
          <div className="h-full">
            <div className="flex justify-between">
              <div className="pb-4 bg-white dark:bg-gray-900"></div>
              <div>
                <div>
                  {deleted ? (
                    <button
                      type="button"
                      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2"
                      onClick={() => setDeleted(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                      SHOW BDFS
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2"
                      onClick={() => setDeleted(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                      SHOW DELETED
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                {tableData()}
              </div>
            </div>
          </div>
        </div>

        <PagePagination
          totalPages={totalPages}
          pagez={pagez}
          onPageChange={onPageChange}
        />
      </section>

      {openDelete && (
        <DeletePdfs
          fileId={fileId}
          handleClose={handleClose}
          openDelete={openDelete}
        />
      )}
      {openForceDelete && (
        <DeletePdfs
          fileId={fileId}
          handleClose={handleClose}
          openDelete={openForceDelete}
          force={true}
        />
      )}
      {openRestoreDeletedFile && (
        <RestorePdf
          fileId={fileId}
          handleClose={handleClose}
          openDelete={openRestoreDeletedFile}
        />
      )}
      {openAdd && <Addpdfs openAdd={openAdd} handleClose={handleClose} />}
      {openAssign && (
        <Assign
          fileId={fileId}
          handleClose={handleClose}
          openAssign={openAssign}
        />
      )}
      {openView && (
        <ViewPdf
          handleClose={handleClose}
          openView={openView}
          fileId={fileId}
        />
      )}
      {openWarn && <WarnUser role={role} handleClose={handleClose} />}
      {openRole && <UserRole handleClose={handleClose} openRole={openRole} />}

      {(loading || loadingUsers) && <SnackbarTooltip />}
    </>
  );
}

export default Pdfs;
