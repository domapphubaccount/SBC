"use client";

import { Button, Label, Modal, Textarea } from "flowbite-react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import {
  addReviewAction,
} from "@/app/Redux/Features/Dashboard/ReviewerSlice";
import { getCommentsAction } from "@/app/Redux/Features/Dashboard/UsersCommentsSlice";

export function AddReview({ openAdd, handleClose }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ReviewSlice.loading);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const usersCommentsData = useSelector(
    (state) => state.userCommentsSlice.comments
  );
  const profileData = useSelector((state) => state.profileSlice.profile);

  // Status options
  const statusOptions = ["accept", "reject", "in_progress"];

  // Formik setup
  const formik = useFormik({
    initialValues: {
      chat_user_dislike_id: "",
      comment_reviewr: null,
      comment_super_reviewr: null,
      super_reviewr_id: profileData.id || "",
      status: "",
    },
    validationSchema: Yup.object({
      chat_user_dislike_id: Yup.string().required("Please choose a comment"),
      comment_reviewr: Yup.string().required("Reviewer comment is required"),
      comment_super_reviewr: Yup.string().required("Super reviewer comment is required"),
      status: Yup.string()
        .oneOf(statusOptions, "Invalid status")
        .required("Status is required"),
    }),
    onSubmit: (values) => {
      dispatch(addReviewAction({ token, ...values }));
    },
  });

  useEffect(() => {
    if (token) {
      dispatch(getCommentsAction({ token }));
    }
  }, [dispatch, token]);

  return (
    <>
      <Modal show={openAdd} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Review
            </h3>
            {!loading ? (
              <>
                <div>
                  <Label htmlFor="comments" value="Users comments" />
                  <select
                    id="comments"
                    name="chat_user_dislike_id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.chat_user_dislike_id}
                  >
                    <option value="">Choose Comment</option>
                    {usersCommentsData.map((item, index) => (
                      <option key={index} value={item.id} title={item.comment}>
                        {item.comment.length > 30
                          ? item.comment.slice(0, 30) + "..."
                          : item.comment}
                      </option>
                    ))}
                  </select>
                  {formik.touched.chat_user_dislike_id &&
                    formik.errors.chat_user_dislike_id && (
                      <div className="text-red-600">
                        {formik.errors.chat_user_dislike_id}
                      </div>
                    )}
                </div>

                {/* {profileData.roles && profileData.roles[0].id == 3 && ( */}
                  <div className="mb-8">
                    <div>
                      <small>Comment Reviewer</small>
                    </div>
                    <Textarea
                      rows={4}
                      id="comment_reviewr"
                      name="comment_reviewr"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment_reviewr}
                      placeholder="Enter reviewer comment"
                    />
                    {formik.touched.comment_reviewr &&
                      formik.errors.comment_reviewr && (
                        <div className="text-red-600">
                          {formik.errors.comment_reviewr}
                        </div>
                      )}
                  </div>
                {/* )} */}

                <div className="mb-8">
                  <div>
                    <small>Comment Super Reviewer</small>
                  </div>
                  <Textarea
                    rows={4}
                    id="comment_super_reviewr"
                    name="comment_super_reviewr"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment_super_reviewr}
                    placeholder="Enter super reviewer comment"
                  />
                  {formik.touched.comment_super_reviewr &&
                    formik.errors.comment_super_reviewr && (
                      <div className="text-red-600">
                        {formik.errors.comment_super_reviewr}
                      </div>
                    )}
                </div>

                <div>
                  <Label htmlFor="status" value="User Status" />
                  <select
                    id="status"
                    name="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="text-red-600">{formik.errors.status}</div>
                  )}
                </div>

                <div className="w-full flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </>
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
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
