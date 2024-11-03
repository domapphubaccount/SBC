"use client";
import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/User/Delete";
import { EditUser } from "../DashModules/User/Edit";
import { ViewUser } from "../DashModules/User/View";
import { WarnUser } from "../DashModules/User/Warn";
import { Button, Popover, Textarea, Tooltip } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByIDAction,
  getUsersAction,
  removeUser,
  roleModule,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import { Reviewer } from "../DashModules/UserComments/Reviewer";
import {
  deleteModule,
  editModule,
  getReviewsAction,
  viewModule,
  addModule,
  trainModule,
} from "@/app/Redux/Features/Dashboard/ReviewerSlice";
import { ViewReview } from "../DashModules/Reviewer/View";
import { DeleteReview } from "../DashModules/Reviewer/Delete";
import { EditReviewer } from "../DashModules/Reviewer/Edit";
import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import { AddReview } from "../DashModules/Reviewer/Add";
import { Train } from "../DashModules/Reviewer/Train";
import { PaginationPages } from "../Pagination/Pagination";
import { useSnackbar } from "notistack";

function ReviewerAdmin({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const ReviewsData = useSelector((state) => state.ReviewSlice.reviews);
  const updateReviewerData = useSelector((state) => state.ReviewSlice.updates);
  const openAdd = useSelector((state) => state.ReviewSlice.addModule);
  const openEdit = useSelector((state) => state.ReviewSlice.editModule);
  const openDelete = useSelector((state) => state.ReviewSlice.deleteModule);
  const openView = useSelector((state) => state.ReviewSlice.viewModule);
  const openTrain = useSelector((state) => state.ReviewSlice.trainModule);
  const openReviewer = useSelector((state) => state.ReviewSlice.reviewerModel);
  const openRole = useSelector((state) => state.ReviewSlice.roleModule);
  const loading = useSelector((state) => state.ReviewSlice.loading);
  const total_pages = useSelector((state) => state.ReviewSlice.total_pages);
  const { enqueueSnackbar } = useSnackbar();
  const action = useSelector((state) => state.ReviewSlice.action);
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

  const [page, setPage] = useState(1);

  const handleClose = () => {
    dispatch(removeUser());
    // dispatch(addModule(false));
    dispatch(editModule({ open: false, review: "" }));
    dispatch(deleteModule({ open: false, review: "" }));
    dispatch(viewModule({ open: false, review: "" }));
    dispatch(trainModule({ open: false, review: "" }));
    dispatch(addModule(false));
  };
  // start open delete
  const handleOpenDelete = (id) => {
    // dispatch(getCommentByIDAction({ token, id }));
    dispatch(deleteModule({ open: true, review: id }));
  };
  // end open delete
  // start open edit
  const handleOpenEdit = (id) => {
    // dispatch(getCommentByIDAction({ token, id }));
    dispatch(editModule({ open: true, review: id }));
  };
  // end open edit
  // start open view
  const handleOpenView = (id) => {
    // dispatch(getCommentByIDAction({ token, id }));
    dispatch(viewModule({ open: true, review: id }));
  };

  const handleOpenTrain = (id) => {
    // dispatch(getCommentByIDAction({ token, id }));
    dispatch(trainModule({ open: true, review: id }));
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
    dispatch(getReviewsAction({ token, page }));
  }, [updateReviewerData, page]);

  // // Step 1: State for search input
  // const [searchTerm, setSearchTerm] = useState("");

  // // Step 2: Handle input change
  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value.toLowerCase());
  // };

  // // Step 3: Filter the rows based on the search term
  // const filteredData = ReviewsData.filter((item) => {
  //   return item?.name?.toLowerCase().includes(searchTerm);
  // });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

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
                    Reviewer
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-3xl">REVIEWERS</h1>
            </div>
            {permissionsData && permissionsData.includes(49) && (
              <div>
                <Button color="blue" onClick={handleOpenAdd}>
                  Add Review
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-md w-full m-auto dashed">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-between items-center">
              {/* <div className="pb-4 bg-white dark:bg-gray-900">
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
                    onChange={handleSearchChange} // Handle search input change
                  />
                </div>
              </div> */}
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Review
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dislike
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {ReviewsData.length > 0 ? (
                  ReviewsData.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{item.reviewer.name}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex items-center">
                          <div className="ml-3">
                            <Popover
                              content={
                                <Textarea
                                  rows={2}
                                  cols={25}
                                  id="comment id"
                                  style={{ opacity: 1 }}
                                  type="text"
                                  required
                                  disabled
                                  value={item.comment_reviewr}
                                />
                              }
                              placement="bottom"
                            >
                              <div className="hover:text-sky-700 cursor-pointer">
                                {item.comment_reviewr?.length > 12
                                  ? item?.comment_reviewr.slice(0, 12) +
                                    " ....."
                                  : item?.comment_reviewr}
                              </div>
                            </Popover>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <Popover
                              content={
                                <Textarea
                                  rows={2}
                                  cols={25}
                                  id="comment id"
                                  style={{ opacity: 1 }}
                                  type="text"
                                  required
                                  disabled
                                  value={item.chat_user_dislike?.comment}
                                />
                              }
                              placement="bottom"
                            >
                              <div className="hover:text-sky-700 cursor-pointer">
                                {item.chat_user_dislike?.comment?.length > 12
                                  ? item.chat_user_dislike?.comment.slice(
                                      0,
                                      12
                                    ) + " ....."
                                  : item.chat_user_dislike?.comment}
                              </div>
                            </Popover>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        {item.status === "accept" ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            {item.status}
                          </span>
                        ) : item.status === "in_progress" ? (
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
                        <div className="flex gap-2 justify-start">
                          {/* start view */}
                          {permissionsData && permissionsData.includes(50) && (
                            <Tooltip content="View">
                              <button
                                title="View"
                                type="button"
                                className="flex items-center bg-slate-700 p-1 py-1 px-2 rounded text-white"
                                onClick={() => handleOpenView(item)} // item.id
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
                          {permissionsData && permissionsData.includes(51) && (
                            <Tooltip content="ٌReview">
                              <button
                                type="button"
                                className="flex items-center bg-slate-700 p-1 px-2 rounded text-white"
                                onClick={() => handleOpenEdit(item)} //item.id
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
                          )}
                          {/* end edit */}
                          {/* start delete */}
                          {permissionsData && permissionsData.includes(52) &&
                          <Tooltip content="Delete">
                            <button
                              title="Delete"
                              type="button"
                              className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
                              onClick={() => handleOpenDelete(item.id)} //item.id
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
                          </Tooltip>}
                          {/* start delete */}
                          {/* start train */}
                          {permissionsData && permissionsData.includes(51) &&(
                              <Tooltip content="Train">
                                <button
                                  title="Train"
                                  type="button"
                                  className="flex items-center bg-slate-700 p-1 px-2 rounded text-white "
                                  onClick={() => handleOpenTrain(item)}
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
                                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                                    />
                                  </svg>
                                </button>
                              </Tooltip>
                            )}
                          {/* end train */}
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
        <PaginationPages
          page={page}
          total_pages={total_pages}
          setPage={setPage}
        />
      </section>

      {openDelete && (
        <DeleteReview handleClose={handleClose} openDelete={openDelete} />
      )}
      {openEdit && (
        <EditReviewer handleClose={handleClose} openEdit={openEdit} />
      )}
      {openView && <ViewReview handleClose={handleClose} openView={openView} />}
      {openTrain && <Train handleClose={handleClose} openTrain={openTrain} />}
      {openReviewer && (
        <Reviewer handleClose={handleClose} openReviewer={openReviewer} />
      )}
      {openAdd && (
        <AddReview
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

export default ReviewerAdmin;
