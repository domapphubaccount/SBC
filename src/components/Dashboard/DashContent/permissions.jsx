"use client"

import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/User/Delete";
import { EditUser } from "../DashModules/User/Edit";
import { ViewUser } from "../DashModules/User/View";
import { WarnUser } from "../DashModules/User/Warn";
import { Button, Tooltip } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByIDAction,
  removeUser,
  roleModule,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import {
  getRoleByIDAction,
  getRolesAction,
} from "@/app/Redux/Features/Dashboard/RolesSlice";

import { EditRole } from "../DashModules/Roles/Edit";
import {
  addModule,
  closeView,
  deleteModule,
  editModule,
  getPermissionByIDAction,
  getPermissionsAction,
  getPermmisionsAction,
  viewModule,
} from "@/app/Redux/Features/Dashboard/PermmisionsSlice";
import { ViewPermission } from "../DashModules/permissions/View";
import { AddPermmision } from "../DashModules/permissions/AddPermmision";
import { DeletePermission } from "../DashModules/permissions/Delete";
import { EditPermission } from "../DashModules/permissions/Edit";

function Permmisions({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const permissionsData = useSelector(
    (state) => state.permissionsSlice.permissions
  );
  const updatePermisionsData = useSelector(
    (state) => state.permissionsSlice.updates
  );
  const [openWarn, setOpenWarn] = useState(false);

  const openView = useSelector((state) => state.permissionsSlice.viewModule);

  const openEdit = useSelector((state) => state.permissionsSlice.editModule);
  const openDelete = useSelector(
    (state) => state.permissionsSlice.deleteModule
  );
  const openRole = useSelector((state) => state.usersSlice.roleModule);

  const openAdd = useSelector((state) => state.permissionsSlice.addModule);

  const handleClose = () => {
    // dispatch(removeUser());
    dispatch(closeView());

    dispatch(viewModule(false));

    dispatch(editModule(false));
    dispatch(deleteModule(false));
    // dispatch(roleModule(false));
    dispatch(addModule(false));
  };

  // start open delete
  const handleOpenDelete = (id) => {
    dispatch(getPermissionByIDAction({ token, id }));
    dispatch(deleteModule(true));
  };
  // end open delete

  // start open edit
  const handleOpenEdit = (id) => {
    dispatch(getPermissionByIDAction({ token, id }));
    dispatch(editModule(true));
  };
  // end open edit

  //   start add role
  const handleOpenAdd = () => {
    dispatch(addModule(true));
  };
  //   end add role

  // start open view
  const handleOpenView = (id) => {
    dispatch(getPermissionByIDAction({ token, id }));
    dispatch(viewModule(true));
  };
  // end open view

  useEffect(() => {
    dispatch(getPermissionsAction({ token }));
  }, [
    /* updates */
    updatePermisionsData,
  ]);

  // Step 1: State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Step 2: Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Step 3: Filter the rows based on the search term
  const filteredData = permissionsData.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm);
    // item.email.toLowerCase().includes(searchTerm)
  });
  return (
    <>
      <section>
        <div>
          <div
            className="flex py-3 pt-8 text-white rounded-lg"
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
                    Permisions
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-4xl">PERMISIONS</h1>
            </div>
            {/* <div>
              <Button color="blue" onClick={handleOpenAdd}>
                Add PERMISSION
              </Button>
            </div> */}
          </div>
        </div>



        <div className="bg-white p-8 rounded-md w-full m-auto">
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
                  {/* <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
              {permissionsData.length > 0 ? (
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
                                d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-start">
                          {/* start view */}
                          <Tooltip content="View Permission">
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
                          {/* start edit */}
                          {/* <Tooltip content="Edit User">
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
                              onClick={() => handleOpenEdit(item.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          </Tooltip> */}
                          {/* end edit */}
                          {/* start delete */}
                          {/* <Tooltip content="Delete User">
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
                          </Tooltip> */}
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






      </section>

      {openDelete && (
        <DeletePermission handleClose={handleClose} openDelete={openDelete} />
      )}
      {openView && (
        <ViewPermission handleClose={handleClose} openView={openView} />
      )}
      {openAdd && <AddPermmision openAdd={openAdd} handleClose={handleClose} />}
      {openEdit && (
        <EditPermission handleClose={handleClose} openEdit={openEdit} />
      )}

      {openWarn && <WarnUser role={role} handleClose={handleClose} />}
      {openRole && <UserRole handleClose={handleClose} openRole={openRole} />}
    </>
  );
}

export default Permmisions;
