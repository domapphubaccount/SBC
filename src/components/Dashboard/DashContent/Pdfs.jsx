import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/User/Delete";
import { EditUser } from "../DashModules/User/Edit";
import { ViewUser } from "../DashModules/User/View";
import { WarnUser } from "../DashModules/User/Warn";
import { Button } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByIDAction,
  removeUser,
  roleModule,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import {
  addModule,
  closeView,
  deleteModule,
  editModule,
  getRoleByIDAction,
  getRolesAction,
  viewModule,
} from "@/app/Redux/Features/Dashboard/RolesSlice";
import { AddRole } from "../DashModules/Roles/AddRole";
import { ViewRole } from "../DashModules/Roles/View";
import { DeleteRole } from "../DashModules/Roles/Delete";
import { EditRole } from "../DashModules/Roles/Edit";
import { getPdfsAction } from "@/app/Redux/Features/Dashboard/PdfsSlice";
import { Addpdfs } from "../DashModules/Pdfs/AddPdfs";
import { DeletePdfs } from "../DashModules/Pdfs/Delete";

function Pdfs({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const pdfsData = useSelector((state) => state.pdfsSlice.pdfs);
  const updateRolesData = useSelector((state) => state.rolesSlice.updates);
  const [openWarn, setOpenWarn] = useState(false);

  const [fileId,setFileID] = useState('')

  const openEdit = useSelector((state) => state.rolesSlice.editModule);
  const openDelete = useSelector((state) => state.rolesSlice.deleteModule);
  const openRole = useSelector((state) => state.usersSlice.roleModule);

  const openAdd = useSelector((state) => state.rolesSlice.addModule);
  const openView = useSelector((state) => state.rolesSlice.viewModule);

  const handleClose = () => {
    dispatch(closeView());

    dispatch(editModule(false));
    dispatch(deleteModule(false));
    dispatch(viewModule(false));
    dispatch(roleModule(false));
    dispatch(addModule(false));
  };

  // start open delete
  const handleOpenDelete = (id) => {
    // dispatch(getRoleByIDAction({ token, id }));
    setFileID(id)
    dispatch(deleteModule(true));
  };
  // end open delete

  // start open edit
  const handleOpenEdit = (id) => {
    dispatch(getRoleByIDAction({ token, id }));
    dispatch(editModule(true));
  };
  // end open edit

  //   // start open role
  //   const handleOpenRole = (id) => {
  //     dispatch(getUserByIDAction({ token, id }));
  //     dispatch(roleModule(true));
  //   };
  //   // end open role

  //   start add role             ####DONE
  const handleOpenAdd = () => {
    dispatch(addModule(true));
  };
  //   end add role

  // start open view
  const handleOpenView = (id) => {
    dispatch(getRoleByIDAction({ token, id }));
    dispatch(viewModule(true));
  };
  // end open view

  useEffect(() => {
    dispatch(getPdfsAction({ token }));
  }, [
    /* updates */
    updateRolesData,
  ]);

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
                    Pdfs
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-4xl">PDFS</h1>
            </div>
            <div>
              <Button color="blue" onClick={handleOpenAdd}>
                Add Pdfs
              </Button>
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
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdfsData.length > 0 &&
                      pdfsData.map((item, index) => (
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
        <DeletePdfs fileId={fileId} handleClose={handleClose} openDelete={openDelete} />
      )}

      {openEdit && <EditRole handleClose={handleClose} openEdit={openEdit} />}

      {openView && <ViewRole handleClose={handleClose} openView={openView} />}
      {openWarn && <WarnUser role={role} handleClose={handleClose} />}
      {openAdd && <Addpdfs openAdd={openAdd} handleClose={handleClose} />}
      {openRole && <UserRole handleClose={handleClose} openRole={openRole} />}
    </>
  );
}

export default Pdfs;
