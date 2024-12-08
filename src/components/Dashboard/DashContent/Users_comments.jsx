"use client";
import React, { useEffect, useState } from "react";
import { EditUser } from "../DashModules/User/Edit";
import { Popover, Textarea, Tooltip } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";
import { useDispatch, useSelector } from "react-redux";
import {
  addModule,
  getUserByIDAction,
  getUsersAction,
  removeUser,
  roleModule,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import { DeleteUserComment } from "../DashModules/UserComments/Delete";
import { ViewUserComment } from "../DashModules/UserComments/View";
import {
  getCommentByIDAction,
  getCommentsAction,
  viewModule,
  editModule,
  deleteModule,
  reviewerModel,
} from "@/app/Redux/Features/Dashboard/UsersCommentsSlice";
import { Reviewer } from "../DashModules/UserComments/Reviewer";
import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import { PaginationPages } from "../Pagination/Pagination";
import { useSnackbar } from "notistack";
import ArticleIcon from "@mui/icons-material/Article";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PagePagination from "../Pagination/PagePagination";

function Users_comments({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.userCommentsSlice.loading);
  const usersCommentsData = useSelector(
    (state) => state.userCommentsSlice.comments
  );
  const updateUsersData = useSelector(
    (state) => state.userCommentsSlice.updates
  );
  const usersData = useSelector((state) => state.usersSlice.users);

  const openAdd = useSelector((state) => state.userCommentsSlice.addModule);
  const openEdit = useSelector((state) => state.userCommentsSlice.editModule);
  const openDelete = useSelector(
    (state) => state.userCommentsSlice.deleteModule
  );
  const openView = useSelector((state) => state.userCommentsSlice.viewModule);
  const openReviewer = useSelector(
    (state) => state.userCommentsSlice.reviewerModel
  );
  const openRole = useSelector((state) => state.userCommentsSlice.roleModule);
  const [page, setPage] = useState(1);
  const total_pages = useSelector(
    (state) => state.userCommentsSlice.total_pages
  );
  const { enqueueSnackbar } = useSnackbar();
  const action = useSelector((state) => state.userCommentsSlice.action);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

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
    dispatch(reviewerModel(false));
  };
  // start open delete
  const handleOpenDelete = (id) => {
    dispatch(getCommentByIDAction({ token, id }));
    dispatch(deleteModule(true));
  };
  // end open delete
  // start open edit
  const handleOpenEdit = (id) => {
    dispatch(getCommentByIDAction({ token, id }));
    dispatch(editModule(true));
  };
  // end open edit
  // start open view
  const handleOpenView = (id) => {
    dispatch(getCommentByIDAction({ token, id }));
    dispatch(viewModule(true));
  };
  // end open view
  // start open reviewer
  const handleOpenReviewer = (id) => {
    dispatch(getCommentByIDAction({ token, id }));
    dispatch(reviewerModel(true));
  };
  // end open reviewer

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
    dispatch(getCommentsAction({ token, page }));
    dispatch(getUsersAction({ token, page: 1 }));
  }, [updateUsersData, page]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

  // States for filters
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");
  const [codeFilter, setCodeFilter] = useState("");
  const [commentFilter, setCommentFilter] = useState("");
  const [whoAssignedFilter, setWhoAssignedFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Handle individual filters
  const handleGlobalSearch = (e) =>
    setGlobalSearchTerm(e.target.value.toLowerCase());
  const handleCodeFilter = (e) => setCodeFilter(e.target.value.toLowerCase());
  const handleCommentFilter = (e) =>
    setCommentFilter(e.target.value.toLowerCase());
  const handleWhoAssignedFilter = (e) =>
    setWhoAssignedFilter(e.target.value.toLowerCase());
  const handleStatusFilter = (e) =>
    setStatusFilter(e.target.value.toLowerCase());

  // Filtered data
  // const filteredData = usersCommentsData?.filter((item) => {
  //   const matchesWhoAssignedInDislikePDF = whoAssignedFilter
  //     ? item.dislike_pdf?.some((dislike) =>
  //         dislike?.who_assigneds?.some((whoAssigned) =>
  //           whoAssigned?.name.toLowerCase().includes(whoAssignedFilter)
  //         )
  //       )
  //     : true;
  //   const matchesGlobal = globalSearchTerm
  //     ? item.comment?.toLowerCase().includes(globalSearchTerm) ||
  //       item.status?.toLowerCase().includes(globalSearchTerm) ||
  //       item.disliked_by?.name?.toLowerCase().includes(globalSearchTerm) ||
  //       item.whoAssigned?.toLowerCase().includes(globalSearchTerm) ||
  //       item.created_at?.toLowerCase().includes(globalSearchTerm) ||
  //       item.actions?.toLowerCase().includes(globalSearchTerm)
  //     : true;

  //   const matchesCode = codeFilter
  //     ? item.dislike_pdf?.some((dislike) =>
  //         dislike.name?.toLowerCase().includes(codeFilter)
  //       )
  //     : true;

  //   const matchesComment = commentFilter
  //     ? item.disliked_by?.name?.toLowerCase().includes(commentFilter)
  //     : true;

  //   const matchesStatus = statusFilter
  //     ? item.status?.toLowerCase().includes(statusFilter)
  //     : true;

  //   return (
  //     matchesGlobal &&
  //     matchesComment &&
  //     matchesCode &&
  //     matchesWhoAssignedInDislikePDF &&
  //     matchesStatus
  //   );
  // });
  // console.log(usersCommentsData)

  // filter and pagination
  const [searchTerms, setSearchTerms] = useState({});
  const [pagez, setPagez] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Update search term for a column
  const handleSearchChange = (column, value) => {
    setPagez(0);
    setSearchTerms((prev) => ({
      ...prev,
      [column]: value.toLowerCase(),
    }));
  };

  const filteredData = usersCommentsData.filter((row) =>
    Object.entries(searchTerms).every(([column, term]) => {
      if (!term) return true; // Skip if no search term

      if (column === "disliked_by") {
        // Handle nested section.name filtering
        return row.disliked_by?.name?.toLowerCase().includes(term);
      }
      // Handle "who_assigneds" field
      if (column === "who_assigneds") {
        return (
          Array.isArray(row.dislike_pdf) &&
          row.dislike_pdf.some(
            (pdf) =>
              Array.isArray(pdf.who_assigneds) &&
              pdf.who_assigneds.some((assignee) =>
                assignee.name?.toLowerCase().includes(term.toLowerCase())
              )
          )
        );
      }

      if (column === "dislike_pdf") {
        // Check if any of the names in who_assigneds matches the search term
        return row.dislike_pdf?.some((assignee) =>
          assignee.name?.toLowerCase().includes(term)
        );
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
                    Users Dislikes
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-3xl">USERS DISLIKES</h1>
            </div>
            {/* <div>
              <Button color="blue" onClick={handleOpenAdd}>
                Add Comment
              </Button>
            </div> */}
          </div>
        </div>

        <div className="bg-white p-8 rounded-md w-full m-auto dashed">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-900">
              <label for="table-search" className="sr-only">
                Search
              </label>
              {/* <div className="relative mt-1">
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
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                  onChange={handleGlobalSearch} // Handle search input change
                />
              </div> */}
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <input
                      type="text"
                      placeholder="Comment"
                      onChange={(e) =>
                        handleSearchChange("comment", e.target.value)
                      }
                      className="filter w-full px-2 py-1 rounded filter-input"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <input
                      type="text"
                      placeholder="Status"
                      onChange={(e) =>
                        handleSearchChange("status", e.target.value)
                      }
                      className="filter w-full px-2 py-1 rounded filter-input"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <input
                      type="text"
                      placeholder="Comment By"
                      onChange={(e) =>
                        handleSearchChange("disliked_by", e.target.value)
                      }
                      className="filter w-full px-2 py-1 rounded filter-input"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <input
                      type="text"
                      placeholder="Who Assigned"
                      onChange={(e) =>
                        handleSearchChange("who_assigneds", e.target.value)
                      }
                      className="filter w-full px-2 py-1 rounded filter-input"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <input
                      type="text"
                      placeholder="Code"
                      onChange={(e) =>
                        handleSearchChange("dislike_pdf", e.target.value)
                      }
                      className="filter w-full px-2 py-1 rounded filter-input"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <input
                      type="text"
                      placeholder="Date"
                      onChange={(e) =>
                        handleSearchChange("created_at", e.target.value)
                      }
                      className="filter w-full px-2 py-1 rounded filter-input"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData && paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
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
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <Popover
                              content={
                                <Textarea
                                  rows={3}
                                  cols={25}
                                  id="comment id"
                                  style={{ opacity: 1 }}
                                  type="text"
                                  required
                                  disabled
                                  value={item.comment}
                                />
                              }
                              placement="bottom"
                            >
                              {/* <Button>Popover bottom</Button> */}
                              <div className="hover:text-sky-700 cursor-pointer">
                                {item.comment.length > 12
                                  ? item.comment.slice(0, 12) + " ....."
                                  : item.comment}
                              </div>
                            </Popover>
                          </div>
                        </div>
                      </th>

                      <td className="px-6 py-4">
                        {item.status === "accept" ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            {item.status}
                          </span>
                        ) : item.status === "in_progress" ? (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            {item.status}
                          </span>
                        ) : item.status === "pending" ? (
                          <span className="bg-yellow-100 text-gray-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            {item.status}
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            {item.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">{item.disliked_by.name}</td>
                      <td className="px-6 py-4">
                        <Tooltip
                          className="w-60"
                          content={
                            <ul>
                              {item.dislike_pdf?.length > 0
                                ? item.dislike_pdf.map((item2, i) => (
                                    <>
                                      <div>
                                        {i + 1}- {item2.name}
                                      </div>
                                      {item2.who_assigneds.length > 0 ? (
                                        item2.who_assigneds?.map((item3, i) => (
                                          <>
                                            <li
                                              key={i}
                                              className="flex"
                                              style={{ fontSize: "12px" }}
                                            >
                                              {i + 1}: {item3.name}
                                              {console.log(
                                                "who assigned",
                                                item3
                                              )}
                                            </li>
                                          </>
                                        ))
                                      ) : (
                                        <small>"NO ONE ASSIGNED"</small>
                                      )}
                                    </>
                                  ))
                                : "No PDF"}
                            </ul>
                          }
                        >
                          <AdminPanelSettingsIcon />
                        </Tooltip>
                      </td>
                      <td className="px-6 py-4">
                        <Tooltip
                          className="w-60"
                          content={
                            <ul>
                              {item?.dislike_pdf?.length > 0
                                ? item.dislike_pdf.map((item, i) => (
                                    <>
                                      <li
                                        key={i}
                                        className="flex text-sm"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {i + 1}: {item.name}
                                      </li>
                                    </>
                                  ))
                                : "NO CODE ASSIGNED"}
                            </ul>
                          }
                        >
                          <ArticleIcon />
                        </Tooltip>
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-start">
                          {/* start view */}
                          {/* start delete */}
                          {permissionsData &&
                            permissionsData.includes(
                              "chat_user_dislikes.soft_delete"
                            ) && (
                              <Tooltip content="Delete Comment">
                                <button
                                  title="Delete"
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
                          {/* start reviewer */}
                          <Tooltip content="Reviewer">
                            <button
                              title="Reviewer"
                              type="button"
                              className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
                              onClick={() => handleOpenReviewer(item.id)}
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
                                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                />
                              </svg>
                            </button>
                          </Tooltip>
                          {/* end reviewer */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="p-4">
                    <h4>NO DATA YET.</h4>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* new pagination  */}
        <PagePagination
          totalPages={totalPages}
          pagez={pagez}
          onPageChange={onPageChange}
        />
        
      </section>

      {openDelete && (
        <DeleteUserComment handleClose={handleClose} openDelete={openDelete} />
      )}
      {openEdit && <EditUser handleClose={handleClose} openEdit={openEdit} />}
      {openView && (
        <ViewUserComment handleClose={handleClose} openView={openView} />
      )}
      {openReviewer && (
        <Reviewer handleClose={handleClose} openReviewer={openReviewer} />
      )}
      {openAdd && (
        <AddUser
          handleOpenAdd={handleOpenAdd}
          openAdd={openAdd}
          handleClose={handleClose}
        />
      )}

      {openRole && <UserRole handleClose={handleClose} openRole={openRole} />}

      {loading && <SnackbarTooltip />}
    </>
  );
}

export default Users_comments;
