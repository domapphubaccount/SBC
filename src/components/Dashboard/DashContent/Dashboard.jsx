"use client";

import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/User/Delete";
import { EditUser } from "../DashModules/User/Edit";
import { ViewUser } from "../DashModules/User/View";
import { WarnUser } from "../DashModules/User/Warn";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUser,
  roleModule,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import {
  addModule,
  closeView,
  deleteModule,
  editModule,
  getRolesAction,
  viewModule,
} from "@/app/Redux/Features/Dashboard/RolesSlice";
import { AddRole } from "../DashModules/Roles/AddRole";
import { ViewRole } from "../DashModules/Roles/View";
import { DeleteRole } from "../DashModules/Roles/Delete";
import { EditRole } from "../DashModules/Roles/Edit";
import { getDashboardDataAction } from "@/app/Redux/Features/Dashboard/DashboardSlice";

function DashboardData({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dashboardData = useSelector((state) => state.dashboardSlice.data);
  const updateRolesData = useSelector((state) => state.rolesSlice.updates);
  const [openWarn, setOpenWarn] = useState(false);

  console.log(dashboardData);

  const openEdit = useSelector((state) => state.rolesSlice.editModule);
  const openDelete = useSelector((state) => state.rolesSlice.deleteModule);
  const openRole = useSelector((state) => state.usersSlice.roleModule);

  const openAdd = useSelector((state) => state.rolesSlice.addModule);
  const openView = useSelector((state) => state.rolesSlice.viewModule);

  const handleClose = () => {
    dispatch(removeUser());
    dispatch(closeView());

    dispatch(editModule(false));
    dispatch(deleteModule(false));
    dispatch(viewModule(false));
    dispatch(roleModule(false));
    dispatch(addModule(false));
  };

  useEffect(() => {
    dispatch(getDashboardDataAction({ token }));
  }, [
    /* updates */
    updateRolesData,
  ]);

  // // Step 3: Filter the rows based on the search term
  // const filteredData = rolesData.filter((item) => {
  //   return item.name.toLowerCase().includes(searchTerm);
  //   // item.email.toLowerCase().includes(searchTerm)
  // });

  return (
    <>
      <section>
        <div>
          <div
            className="flex py-3 pt-4 text-white rounded-lg"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"></ol>
          </div>
          <div className="flex justify-between my-5">
            <div className="px-3">
              <h1 className="text-white text-4xl">DASHBOARD</h1>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div>
            <div className="p-4">
              <div className="mt-5">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
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
                          d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                        />
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total Building Files
                      </p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {dashboardData?.Pdfs_count}
                      </h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                      {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">+55%</strong>
                        &nbsp;than last week
                      </p> */}
                    </div>
                  </div>
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total Users
                      </p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {dashboardData?.users_count}
                      </h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                      {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">+3%</strong>
                        &nbsp;than last month
                      </p> */}
                    </div>
                  </div>
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
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
                          d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                        />
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total Deslikes
                      </p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {dashboardData?.ChatUserDislikes_count}
                      </h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                      {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-red-500">-2%</strong>&nbsp;than
                        yesterday
                      </p> */}
                    </div>
                  </div>
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
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
                          d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                        />
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total Reviews
                      </p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {dashboardData?.reviews_count}
                      </h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                      {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">+5%</strong>
                        &nbsp;than yesterday
                      </p> */}
                    </div>
                  </div>
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-cyan-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
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
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total Chats
                      </p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {dashboardData?.total_chats}
                      </h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                      {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">+5%</strong>
                        &nbsp;than yesterday
                      </p> */}
                    </div>
                  </div>
                </div>

                {/* <div className="mb-4">
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                    <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                      <div>
                        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                          Projects
                        </h6>
                        <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="3"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4 text-blue-500"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                          </svg>
                          <strong>30 done</strong> this month
                        </p>
                      </div>
                      <button
                        aria-expanded="false"
                        aria-haspopup="menu"
                        id=":r5:"
                        className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                        type="button"
                      >
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currenColor"
                            viewBox="0 0 24 24"
                            stroke-width="3"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                    <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                      <table className="w-full min-w-[640px] table-auto">
                        <thead>
                          <tr>
                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                              <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                                companies
                              </p>
                            </th>
                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                              <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                                budget
                              </p>
                            </th>
                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                              <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                                completion
                              </p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="flex items-center gap-4">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                                  Material XD Version
                                </p>
                              </div>
                            </td>

                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                $14,000
                              </p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="w-10/12">
                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                                  60%
                                </p>
                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                  <div
                                    className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                                    style={{ width: "60%" }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="flex items-center gap-4">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                                  Add Progress Track
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                $3,000
                              </p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="w-10/12">
                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                                  10%
                                </p>
                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                  <div
                                    className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                                    style={{ width: "10%" }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="flex items-center gap-4">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                                  Fix Platform Errors
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                Not set
                              </p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="w-10/12">
                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                                  100%
                                </p>
                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                  <div
                                    className="flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-400 text-white"
                                    style={{ width: "100%" }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="flex items-center gap-4">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                                  Launch our Mobile App
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                $20,500
                              </p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="w-10/12">
                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                                  100%
                                </p>
                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                  <div
                                    className="flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-400 text-white"
                                    style={{ width: "100%" }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="flex items-center gap-4">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                                  Add the New Pricing Page
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                $500
                              </p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="w-10/12">
                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                                  25%
                                </p>
                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                  <div
                                    className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                                    style={{ width: "25%" }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {openDelete && (
        <DeleteRole handleClose={handleClose} openDelete={openDelete} />
      )}

      {openEdit && <EditRole handleClose={handleClose} openEdit={openEdit} />}

      {openView && <ViewRole handleClose={handleClose} openView={openView} />}
      {openWarn && <WarnUser role={role} handleClose={handleClose} />}
      {openAdd && <AddRole openAdd={openAdd} handleClose={handleClose} />}
      {openRole && <UserRole handleClose={handleClose} openRole={openRole} />}
    </>
  );
}

export default DashboardData;
