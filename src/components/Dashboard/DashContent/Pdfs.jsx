"use client";

import React, { useEffect, useState } from "react";
import { WarnUser } from "../DashModules/User/Warn";
import { Button, Tooltip } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { roleModule } from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import {
  editModule,
  getRoleByIDAction,
} from "@/app/Redux/Features/Dashboard/RolesSlice";
import {
  addModule,
  assignModule,
  closePdfError,
  deleteModule,
  getPdfsAction,
  viewModule,
} from "@/app/Redux/Features/Dashboard/PdfsSlice";
import { Addpdfs } from "../DashModules/Pdfs/AddPdfs";
import { DeletePdfs } from "../DashModules/Pdfs/Delete";
import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import { Assign } from "../DashModules/Pdfs/Assign";
import { ViewPdf } from "../DashModules/Pdfs/View";
import { PaginationPages } from "../Pagination/Pagination";
import { useSnackbar } from "notistack";

function Pdfs({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const pdfsData = useSelector((state) => state.pdfsSlice.pdfs);
  const updatePdfsData = useSelector((state) => state.pdfsSlice.updates);
  const [openWarn, setOpenWarn] = useState(false);
  const [fileId, setFileID] = useState("");
  const openDelete = useSelector((state) => state.pdfsSlice.deleteModule);
  const openRole = useSelector((state) => state.usersSlice.roleModule);
  const openAdd = useSelector((state) => state.pdfsSlice.addModule);
  const openView = useSelector((state) => state.pdfsSlice.viewModule);
  const openAssign = useSelector((state) => state.pdfsSlice.assignModule);
  const loading = useSelector((state) => state.pdfsSlice.loading);
  const [page, setPage] = useState(1);
  const total_pages = useSelector((state) => state.pdfsSlice.total_pages);
  const { enqueueSnackbar } = useSnackbar();
  const action = useSelector((state) => state.pdfsSlice.action);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );
  const loadingUsers = useSelector((state) => state.usersSlice.loading);
  const [fileType,setFileType] = useState(0);
  

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
  };

  // start open delete
  const handleOpenDelete = (id) => {
    // dispatch(getRoleByIDAction({ token, id }));
    setFileID(id);
    dispatch(deleteModule(true));
  };
  // end open delete

  // start open edit
  const handleOpenEdit = (id) => {
    dispatch(getRoleByIDAction({ token, id }));
    dispatch(editModule(true));
  };
  // end open edit

  //   // start open assigned
  const handleOpenAssigned = (id) => {
    setFileID(id);
    dispatch(assignModule(true));
  };
  //   // end open assigned

  //   start add role             ####DONE
  const handleOpenAdd = () => {
    dispatch(addModule(true));
  };
  //   end add role

  // start open view
  const handleOpenView = (id) => {
    setFileID(id);
    dispatch(viewModule(true));
  };
  // end open view

  useEffect(() => {
    dispatch(getPdfsAction({ token, page }));
  }, [
    /* updates */
    updatePdfsData,
    page,
    fileType
  ]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

  const filteredData = pdfsData.filter((item) => item.type === fileType);


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
            {permissionsData && permissionsData.includes(15) && (
              <div className="flex">
                <div className="checkbox-wrapper-16 mr-3">
                  <label className="checkbox-wrapper">
                    <input className="checkbox-input" type="checkbox" onChange={(e)=>e.target.checked ? setFileType(1) : setFileType(0)} />
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
        <div className="bg-white p-8 rounded-md w-full m-auto dashed">
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        File
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created By
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdfsData.length > 0 ? (
                      filteredData.map((item, index) => (
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
                          <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <Tooltip
                                  content={item.file.replace(
                                    "public/uploads/",
                                    ""
                                  )}
                                >
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item.file.replace("public/uploads/", "")
                                      .length > 25
                                      ? item.file
                                          .replace("public/uploads/", "")
                                          .slice(0, 25) + "..."
                                      : item.file.replace(
                                          "public/uploads/",
                                          ""
                                        )}
                                  </p>
                                </Tooltip>
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

                              {/* start Assigned */}
                              <Tooltip content="Assigned">
                                <button
                                  type="button"
                                  className="flex items-center bg-slate-700 p-1 px-2 rounded text-white"
                                  onClick={() => handleOpenAssigned(item.id)}
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
                                permissionsData.includes(17) && (
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
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div className="p-4">
                        <p>NO DATA YET.</p>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <PaginationPages
          page={page}
          total_pages={total_pages}
          setPage={setPage}
        />
      </section>

      {openDelete && (
        <DeletePdfs
          fileId={fileId}
          handleClose={handleClose}
          openDelete={openDelete}
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
