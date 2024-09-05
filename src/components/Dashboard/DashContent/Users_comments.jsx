import React, { useState } from "react";
import { DeleteUser } from "../DashModules/User/Delete";
import { EditUser } from "../DashModules/User/Edit";
import { ViewUser } from "../DashModules/User/View";
import { WarnUser } from "../DashModules/User/Warn";
import { Button } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";

function Users_comments() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);

  const handleOpenDelete = () => setOpenDelete(!openDelete);
  const handleOpenView = () => setOpenView(!openView);
  const handleOpenWarn = () => setOpenWarn(!openWarn);
  return (
    <>
      <section>
        <div>
          <div class="flex py-3 text-white rounded-lg" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li>
                <div class="flex items-center">
                  <a
                    href="#"
                    class="ms-1 text-sm font-medium text-white hover:text-blue-600 md:ms-2 "
                  >
                    Dashboard
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span class="ms-1 text-sm font-medium text-white md:ms-2">
                    comments
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-4xl">USER'S COMMENTS</h1>
            </div>
            <div>
              {/* <Button color="blue" onClick={handleOpenAdd}>Add User</Button> */}
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-md w-full m-auto">
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal font-semibold">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Comment
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Chat
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {new Array(5).fill(null).map((_, i) => (
                      <tr key={i} className="user_row">
                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
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
                                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Vera Carpenter
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            ahmed@gmail.com
                          </p>
                        </td>
                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                          <div className="flex gap-2 justify-center">
                            {/* start view */}
                            <button
                              type="button"
                              className="flex items-center bg-slate-700 p-1 py-1 px-2 rounded text-white"
                              onClick={handleOpenView}
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
                            {/* end view */}

                            {/* start delete */}
                            <button
                              type="button"
                              className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
                              onClick={handleOpenDelete}
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
                            {/* start delete */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {openDelete && (
        <DeleteUser
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          handleOpenDelete={handleOpenDelete}
        />
      )}
      {openView && (
        <ViewUser
          handleOpenView={handleOpenView}
          openView={openView}
          setOpenView={setOpenView}
        />
      )}
      {openWarn && (
        <WarnUser
          handleOpenWarn={handleOpenWarn}
          openWarn={openWarn}
          setOpenWarn={setOpenWarn}
        />
      )}
    </>
  );
}

export default Users_comments;
