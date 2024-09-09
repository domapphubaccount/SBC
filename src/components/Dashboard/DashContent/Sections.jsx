import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/UserComments/Delete";
import { WarnUser } from "../DashModules/User/Warn";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import {
  addModule,
  deleteModule,
  editModule,
  getSectionId,
  getSectionsAction,
} from "@/app/Redux/Features/Dashboard/SectionsSlice";
import { AddSection } from "../DashModules/Sections/AddSection";
import { DeleteSections } from "../DashModules/Sections/DeleteSections";
import { EditSections } from "../DashModules/Sections/EditSections";

function Sections() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sections = useSelector((state) => state.sectionsSlice.sections);
  const updates = useSelector((state) => state.sectionsSlice.updates);

  console.log(sections);

  // const [openDelete, setOpenDelete] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [openView, setOpenView] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  // const [openAdd, setOpenAdd] = useState(false);

  const openAdd = useSelector((state) => state.sectionsSlice.addModule);
  const openDelete = useSelector((state) => state.sectionsSlice.deleteModule);
  const openEdit = useSelector((state) => state.sectionsSlice.editModule);

  const handleOpenDelete = (id) => {
    dispatch(getSectionId({id}));
    dispatch(deleteModule(true));
  };
  const handleOpenEdit = (id,name) => {
    dispatch(getSectionId({id,name}))
    dispatch(editModule(true))
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

    // dispatch(removeUser());

    // dispatch(deleteModule(false));
    // dispatch(viewModule(false));
  };

  useEffect(() => {
    dispatch(getSectionsAction({ token }));
  }, [updates]);

  return (
    <>
      <section>
        <div>
          <div class="flex py-3 pt-8 text-white rounded-lg" aria-label="Breadcrumb">
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
                                  onClick={() => handleOpenEdit(item.id , item.name)}
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
                      ))
                    ) : (
                      <div className="flex justify-center w-full p-3">
                        <div>
                          <h4>NO DATA YET ..</h4>
                        </div>
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
    </>
  );
}

export default Sections;
