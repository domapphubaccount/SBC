import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/User/Delete";
import { EditUser } from "../DashModules/User/Edit";
import { ViewUser } from "../DashModules/User/View";
import { WarnUser } from "../DashModules/User/Warn";
import { Button } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";
import { useDispatch, useSelector } from "react-redux";
import {
  addModule,
  deleteModule,
  editModule,
  getUserByIDAction,
  getUsersAction,
  removeUser,
  roleModule,
  viewModule,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";

function Users({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const usersData = useSelector((state) => state.usersSlice.users);
  const updateUsersData = useSelector((state) => state.usersSlice.updates);

  const [openWarn, setOpenWarn] = useState(false);

  const openAdd = useSelector((state) => state.usersSlice.addModule);
  const openEdit = useSelector((state) => state.usersSlice.editModule);
  const openDelete = useSelector((state) => state.usersSlice.deleteModule);
  const openView = useSelector((state) => state.usersSlice.viewModule);
  const openRole = useSelector((state) => state.usersSlice.roleModule);

  const handleClose = () => {
    dispatch(removeUser());
    dispatch(addModule(false));
    dispatch(editModule(false));
    dispatch(deleteModule(false));
    dispatch(viewModule(false));
    dispatch(roleModule(false));
  };

  // start open delete
  const handleOpenDelete = (id) => {
    dispatch(getUserByIDAction({ token, id }));
    dispatch(deleteModule(true));
  };
  // end open delete

  // start open edit
  const handleOpenEdit = (id) => {
    dispatch(getUserByIDAction({ token, id }));
    dispatch(editModule(true));
  };
  // end open edit

  // start open view
  const handleOpenView = (id) => {
    dispatch(getUserByIDAction({ token, id }));
    dispatch(viewModule(true));
  };
  // end open view

  // start open role
  const handleOpenRole = (id) => {
    dispatch(getUserByIDAction({ token, id }));
    dispatch(roleModule(true));
  };
  // end open role

  const handleOpenAdd = () => {
    dispatch(addModule(true));
  };

  useEffect(() => {
    dispatch(getUsersAction({ token }));
  }, [updateUsersData]);

  // Step 1: State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Step 2: Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Step 3: Filter the rows based on the search term
  const filteredData = usersData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <section>
        <div>
          <div
            class="flex py-3 pt-8 text-white rounded-lg"
            aria-label="Breadcrumb"
          >
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li>
                <div class="flex items-center">
                  <a
                    href="#"
                    class="text-sm font-medium text-white hover:text-blue-600"
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
                    Users
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-4xl">USERS</h1>
            </div>
            <div>
              <Button color="blue" onClick={handleOpenAdd}>
                Add User
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-md w-full m-auto">
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="SERACH"
                  onChange={handleSearchChange} // Handle search input change
                />
              </div>

              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal font-semibold">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.length > 0 &&
                      filteredData.map((item, index) => (
                        <tr
                          key={index}
                          className="user_row hover:bg-gray-200 each_user"
                        >
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
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
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
                          <td className="px-2 py-2  border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.email}
                            </p>
                          </td>
                          {/* start role */}
                          <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                            <div className="hover:font-bold cursor-pointer">
                              <Button
                                color="gray"
                                onClick={() => handleOpenRole(item.id)}
                              >
                                Admin
                              </Button>
                            </div>
                          </td>
                          {/* end role */}
                          <td className="px-2 py-2 text-center border-b border-gray-200 bg-white text-sm">
                            <div className="flex gap-2 justify-start">
                              {/* start view */}
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
                              {/* end view */}
                              {/* start edit */}
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
                              {/* end edit */}
                              {/* start delete */}
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
        <DeleteUser handleClose={handleClose} openDelete={openDelete} />
      )}
      {openEdit && <EditUser handleClose={handleClose} openEdit={openEdit} />}
      {openView && <ViewUser handleClose={handleClose} openView={openView} />}
      {openWarn && <WarnUser role={role} handleClose={handleClose} />}
      {openAdd && (
        <AddUser
          handleOpenAdd={handleOpenAdd}
          openAdd={openAdd}
          handleClose={handleClose}
          // setOpenAdd={setOpenAdd}
        />
      )}
      {openRole && <UserRole handleClose={handleClose} openRole={openRole} />}
    </>
  );
}

export default Users;
