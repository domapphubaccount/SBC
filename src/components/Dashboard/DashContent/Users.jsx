"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DeleteUser } from "../DashModules/User/Delete";
import { EditUser } from "../DashModules/User/Edit";
import { ViewUser } from "../DashModules/User/View";
import { WarnUser } from "../DashModules/User/Warn";
import { Button, Dropdown, ToggleSwitch, Tooltip } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";
import { useDispatch, useSelector } from "react-redux";
import {
  addModule,
  deleteModule,
  editModule,
  getUserByIDAction,
  getUsersAction,
  removeUser,
  resetPasswordLinkModule,
  resetPasswordModule,
  roleModule,
  viewModule,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import { getRolesAction } from "@/app/Redux/Features/Dashboard/RolesSlice";
import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import { useSnackbar } from "notistack";

function Users({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const updateUsersData = useSelector((state) => state.usersSlice.updates);
  const loading = useSelector((state) => state.usersSlice.loading);
  const [openWarn, setOpenWarn] = useState(false);
  const openAdd = useSelector((state) => state.usersSlice.addModule);
  const openEdit = useSelector((state) => state.usersSlice.editModule);
  const openDelete = useSelector((state) => state.usersSlice.deleteModule);
  const openReset = useSelector(
    (state) => state.usersSlice.resetPasswordModule
  );
  const openResetByLink = useSelector(
    (state) => state.usersSlice.resetPasswordLinkModule
  );
  const openView = useSelector((state) => state.usersSlice.viewModule);
  const openRole = useSelector((state) => state.usersSlice.roleModule);
  const [switch1, setSwitch1] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const action = useSelector((state) => state.usersSlice.action);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );
  const roles = useSelector((state) => state.rolesSlice.roles);
  const { allData, displayedData } = useSelector((state) => state.usersSlice);
  useEffect(() => {
    if (action) {
      enqueueSnackbar("This action has been done successfully", {
        variant: "success",
      });
    }
  }, [action]);
  const handleClose = () => {
    dispatch(removeUser());
    dispatch(addModule(false));
    dispatch(editModule(false));
    dispatch(deleteModule(false));
    dispatch(viewModule(false));
    dispatch(roleModule(false));
    dispatch(resetPasswordModule(false));
    dispatch(resetPasswordLinkModule(false));
  };
  // start open delete
  const handleOpenDelete = (id) => {
    if (id) {
      dispatch(getUserByIDAction({ token, id }));
      dispatch(deleteModule(true));
      console.log(id);
    }
  };
  const handleOpenResetPassword = (id) => {
    if (id) {
      dispatch(getUserByIDAction({ token, id }));
      dispatch(resetPasswordModule(true));
    }
  };
  const handleOpenResetPasswordByLink = (id) => {
    if (id) {
      dispatch(getUserByIDAction({ token, id }));
      dispatch(resetPasswordLinkModule(true));
    }
  };
  // end open delete
  // start open edit
  const handleOpenEdit = (id) => {
    if (id) {
      dispatch(getUserByIDAction({ token, id }));
      dispatch(getRolesAction({ token }));
      dispatch(editModule(true));
    }
  };
  // end open edit
  // start open view
  const handleOpenView = (id) => {
    if (id) {
      dispatch(getUserByIDAction({ token, id }));
      dispatch(viewModule(true));
    }
  };
  // end open view
  // start open role
  const handleOpenRole = (id) => {
    if (id) {
      dispatch(getUserByIDAction({ token, id }));
      dispatch(roleModule(true));
    }
  };
  // end open role
  const handleOpenAdd = () => {
    dispatch(getRolesAction({ token }));
    dispatch(addModule(true));
  };
  useEffect(() => {
    dispatch(
      getUsersAction({ token, page: 1, pathPage: true, isTest: switch1 })
    );
  }, [updateUsersData, switch1]);
  useEffect(() => {
    dispatch(getRolesAction({ token }));
  }, []);
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
      last_seen: start && end ? { start, end } : "", // Only set if both dates are present
    }));
  };
  const filteredData = allData.filter((row) =>
    Object.entries(searchTerms).every(([column, term]) => {
      if (!term) return true; // Skip if no search term

      if (column === "status") {
        switch (term) {
          case "active":
            return row.status === "active";
          case "deactive":
            return row.status === "deactive";
          case "suspend":
            return row.status === "suspend";
          default:
            return true;
        }
      }

      if (column === "roles") {
        // Check if any of the names in roles matches the search term
        return row.roles?.some((role) =>
          role.name?.toLowerCase().includes(term.toLowerCase())
        );
      }

      if (column === "account_type" && row.account_type === "test") {
        return row.account_type === "test";
      }

      if (startDate && endDate) {
        const rowDate = convertToDate(row[column]);
        return rowDate >= startDate && rowDate <= endDate;
      }

      // Default case for other columns
      return row[column]?.toString().toLowerCase().includes(term.toLowerCase());
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
  const status = ["active", "deactive", "suspend"];
  const formRef = useRef(null);
  const handleReset = (formRef) => {
    formRef.current.reset();
    setSearchTerms({});
    setPagez(0);
    setRowsPerPage(10); // Optional: Keep the default rows per page
    setStartDate("");
    setEndDate("");
  };
  const TableData = useCallback(() => {
    return (
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className="w-full"
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => handleSearchChange("name", e.target.value)}
                  className="filter w-full px-2 py-1 rounded filter-input"
                />
              </th>
              <th scope="col" className="px-6 py-3">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => handleSearchChange("email", e.target.value)}
                  className="filter w-full px-2 py-1 rounded filter-input"
                />
              </th>
              <th scope="col" className="px-6 py-3">
                <select
                  type="select"
                  placeholder="Status"
                  onChange={(e) => handleSearchChange("status", e.target.value)}
                  className="filter w-full px-2 py-1 rounded filter-input"
                >
                  <option>Status</option>
                  {status.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </th>
              <th scope="col" className="px-6 py-3">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  placeholderText="Last Seen"
                  className="w-full px-2 py-1 rounded filter-input"
                />
              </th>
              <th scope="col" className="px-6 py-3">
                <select
                  type="select"
                  placeholder="Role"
                  onChange={(e) => handleSearchChange("roles", e.target.value)}
                  className="filter w-full px-2 py-1 rounded filter-input"
                >
                  <option value={""}>Role</option>
                  {roles.length > 0 &&
                    roles.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </th>
              {permissionsData &&
                (permissionsData.includes("users.show") ||
                  permissionsData.includes("users.update") ||
                  permissionsData.includes("users.destroy")) && (
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                )}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    item.suspension_date ? "bg-red-100	" : "bg-white"
                  } border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
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
                  </th>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === "active" ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {item.status}
                      </span>
                    ) : item.status === "suspend" ? (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                        {item.status}
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="hover:font-bold">{item.last_seen}</div>
                  </td>
                  <td className="px-6 py-4">
                    {permissionsData &&
                    permissionsData.includes("roles.index") ? (
                      <div className="hover:font-bold cursor-pointer">
                        <Button
                          color="gray"
                          onClick={() => handleOpenRole(item.id)}
                          disabled={
                            permissionsData &&
                            !permissionsData.includes("users.attach_role")
                          }
                        >
                          {Array.isArray(item.roles) && item.roles[0]?.name
                            ? item.roles[0]?.name
                            : "NAN"}
                        </Button>
                      </div>
                    ) : (
                      <small className="text-center">
                        You don't have permission
                      </small>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-start">
                      {/* start view */}
                      {permissionsData &&
                        permissionsData.includes("users.show") && (
                          <Tooltip content="View User">
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
                        )}
                      {/* end view */}
                      {/* start edit */}
                      {permissionsData &&
                        permissionsData.includes("users.update") && (
                          <Tooltip content="Edit User">
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
                          </Tooltip>
                        )}
                      {/* end edit */}
                      {/* start delete */}
                      {permissionsData &&
                        permissionsData.includes("users.destroy") && (
                          <Tooltip content="Delete User">
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
                      {/* start reset */}
                      {permissionsData &&
                        permissionsData.includes("users.update") && (
                          <Tooltip content="Reset Password">
                            <BasicMenu
                              handleOpenResetPassword={() =>
                                handleOpenResetPassword(item.id)
                              }
                              handleOpenResetPasswordByLink={() =>
                                handleOpenResetPasswordByLink(item.id)
                              }
                            />
                          </Tooltip>
                        )}
                      {/* start reset */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-2">
                <td colSpan={5} className="text-center p-4">
                  NO DATA YET !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    );
  }, [displayedData, filteredData]);

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
                    Users
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-3xl">USERS</h1>
            </div>
            {permissionsData && permissionsData.includes("users.store") && (
              <div className="flex">
                <div className="checkbox-wrapper-16 mr-3">
                  <label className="checkbox-wrapper">
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      onChange={(e) => {
                        console.log(e.target.checked);
                        handleSearchChange(
                          "account_type",
                          e.target.checked ? "test" : "user"
                        );
                      }}
                    />
                    <span className="checkbox-tile">
                      <span className="checkbox-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </span>
                      <span className="checkbox-label">Test Accounts</span>
                    </span>
                  </label>
                </div>
                <Button color="blue" onClick={handleOpenAdd}>
                  Add User
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-md w-full m-auto dashed ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg dashboard_table">
            <div className="pb-4 bg-white dark:bg-gray-900">
              <label for="table-search" className="sr-only">
                Search
              </label>
              <div className="flex justify-between">
                <div className="m-2">
                  <Button className="flex" onClick={()=>handleReset(formRef)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            <Suspense fallback={<div>NO DATA YET!</div>}>
              {TableData()}
            </Suspense>
          </div>
        </div>

        <PagePagination
          totalPages={totalPages}
          pagez={pagez}
          onPageChange={onPageChange}
        />
      </section>

      {openDelete && (
        <DeleteUser handleClose={handleClose} openDelete={openDelete} />
      )}
      {openReset && (
        <ResetPassword handleClose={handleClose} openReset={openReset} />
      )}
      {openResetByLink && (
        <ResetPasswordByLink
          handleClose={handleClose}
          openResetByLink={openResetByLink}
        />
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

      {loading && <SnackbarTooltip />}
    </>
  );
}

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PagePagination from "../Pagination/PagePagination";
import { ResetPassword } from "../DashModules/User/ResetPassword";
import { ResetPasswordByLink } from "../DashModules/User/ResetPasswordByLink";
import DatePicker from "react-datepicker";
import Image from "next/image";

function BasicMenu({ handleOpenResetPassword, handleOpenResetPasswordByLink }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        type="button"
        className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
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
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleOpenResetPassword();
            handleClose();
          }}
        >
          <small className="flex items-center" title="Reset Directly">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 me-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            <strong>Rest Passsword Directly</strong>
          </small>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenResetPasswordByLink();
            handleClose();
          }}
        >
          <small className="flex items-center" title="Reset by LINK">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 me-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
            <strong>Reset Password By Link</strong>
          </small>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Users;
