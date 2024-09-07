import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/UserComments/Delete";
import { WarnUser } from "../DashModules/User/Warn";
import { Button } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { getSectionsAction } from "@/app/Redux/Features/Dashboard/SectionsSlice";
import { AddSection } from "../DashModules/Sections/AddSection";


function Sections() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sections = useSelector((state) => state.sectionsSlice.sections);
  const state = useSelector(state => state)
  console.log(state)

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenDelete = () => setOpenDelete(!openDelete);
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const handleOpenView = () => setOpenView(!openView);
  const handleOpenWarn = () => setOpenWarn(!openWarn);
  const handleOpenAdd = () => setOpenAdd(!openAdd);

  useEffect(() => {
    dispatch(getSectionsAction({ token }));
  }, []);

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
                    Sections
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-4xl">Sections</h1>
            </div>
            <div>
              <Button color="blue" onClick={handleOpenAdd}>
                New Section
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
                      <th className="px-5 py-3 text-center border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.length > 0 ? (
                      sections.map((item, index) => (
                        <tr key={index} className="user_row">
                          <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                            <div
                              className="hover:font-bold cursor-pointer"
                              onClick={handleOpenWarn}
                            >
                              {item.name}
                            </div>
                          </td>
                          <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                            <div className="flex gap-2 justify-center">
                              {/* start delete */}
                              <button
                                type="button"
                                className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
                                onClick={()=>handleOpenDelete(item.id)}
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
                      ))
                    ) : (
                      <div className="flex justify-center">
                        <img
                          style={{ width: "100px" }}
                          src={loadingImg.src}
                          alt="loading"
                          className="loading_logo"
                        />
                      </div>
                    )}
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
      {openWarn && (
        <WarnUser
          handleOpenWarn={handleOpenWarn}
          openWarn={openWarn}
          setOpenWarn={setOpenWarn}
        />
      )}
      {openAdd && (
        <AddSection
          handleOpenAdd={handleOpenAdd}
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
        />
      )}
    </>
  );
}

export default Sections;
