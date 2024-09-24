"use client";

import { Button, Label, Modal, Textarea } from "flowbite-react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { updateReviewAction } from "@/app/Redux/Features/Dashboard/ReviewerSlice";

export function EditReviewer({ openEdit, handleClose }) {
  const dispatch = useDispatch();
  const reviewData = useSelector((state) => state.ReviewSlice.review);
  const loading = useSelector((state) => state.ReviewSlice.loading);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);

  // Status options
  const statusOptions = ["accept", "reject", "in_progress"];

  // Formik setup
  const formik = useFormik({
    initialValues: {
      chat_user_dislike_id: reviewData?.chat_user_dislike?.id || "",
      comment_reviewer: reviewData?.comment_reviewr || "",
      comment_super_reviewer: reviewData?.comment_super_reviewr || "",
      status: reviewData?.status || "accept", // Default to "accept" if undefined
    },
    validationSchema: Yup.object({
      comment_reviewer: Yup.string().required("Reviewer comment is required"),
      // comment_super_reviewer: Yup.string().required("Super reviewer comment is required"),
      status: Yup.string()
        .oneOf(statusOptions, "Invalid status")
        .required("Status is required"),
    }),

    onSubmit: (values) => {
      dispatch(
        updateReviewAction({
          token,
          id: reviewData.id,
          // chat_user_dislike_id: reviewData?.chat_user_dislike_id?.id,
          ...values,
        })
      );
      console.log({ token, id: reviewData.id, ...values });
      handleClose(); // Close the modal after saving changes
    },
  });

    // Update formik values when userData changes
    useEffect(() => {
      if (reviewData) {
        formik.setValues({
          chat_user_dislike_id: reviewData?.chat_user_dislike?.id || "",
          comment_reviewer: reviewData?.comment_reviewr || "",
          comment_super_reviewer: reviewData?.comment_super_reviewr || "",
          status: reviewData?.status || "accept",
        });
      }
    }, [reviewData]);

  console.log(reviewData)

  return (
    <>
      <Modal show={openEdit} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Review
            </h3>
            {!loading ? (
              <>
                <div className="mb-8">
                  <div>
                    <small>Comment Reviewer</small>
                  </div>
                  <Textarea
                    rows={4}
                    id="comment_reviewer"
                    name="comment_reviewer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment_reviewer}
                    placeholder="Enter reviewer comment"
                    style={{ opacity: 1 }}
                    defaultValue={reviewData?.comment_reviewr}
                  />
                  {formik.touched.comment_reviewer &&
                  formik.errors.comment_reviewer ? (
                    <div className="text-red-600">
                      {formik.errors.comment_reviewer}
                    </div>
                  ) : null}
                </div>

                <div className="mb-8">
                  <div>
                    <small>Comment Super Reviewer</small>
                  </div>
                  <Textarea
                    rows={4}
                    id="comment_super_reviewer"
                    name="comment_super_reviewer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment_super_reviewer}
                    defaultValue={reviewData?.comment_super_reviewr}
                    placeholder="Enter super reviewer comment"
                    style={{ opacity: 1 }}
                  />
                  {formik.touched.comment_super_reviewer &&
                  formik.errors.comment_super_reviewer ? (
                    <div className="text-red-600">
                      {formik.errors.comment_super_reviewer}
                    </div>
                  ) : null}
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
                  {formik.touched.status && formik.errors.status ? (
                    <div className="text-red-600">{formik.errors.status}</div>
                  ) : null}
                </div>

                <div className="w-full">
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
