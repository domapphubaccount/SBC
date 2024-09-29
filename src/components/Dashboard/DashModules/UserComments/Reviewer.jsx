"use client";

import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { addReviewAction } from "@/app/Redux/Features/Dashboard/UsersCommentsSlice";
import { useEffect } from "react";

export function Reviewer({ openReviewer, handleClose }) {
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const commentData = useSelector((state) => state.userCommentsSlice.comment);
  const loading = useSelector((state) => state.userCommentsSlice.loading);
  const dispatch = useDispatch();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      reviewerResponse: commentData?.review_data?.comment_reviewr || "",
    },
    validationSchema: Yup.object({
      reviewerResponse: Yup.string().required("Reviewer response is required"),
      status: "",
    }),
    onSubmit: (values) => {
      dispatch(
        addReviewAction({
          token,
          id: commentData.id,
          comment: values.reviewerResponse,
          status: values.status,
        })
      );
      handleClose();
    },
  });
  // Update formik values when userData changes
  useEffect(() => {
    if (commentData) {
      formik.setValues({
        reviewerResponse: commentData?.review_data?.comment_reviewr || "",
      });
    }
  }, [commentData]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

  const statusOptions = ["accept", "reject", "in_progress"];

  return (
    <>
      <Modal show={openReviewer} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Reviewer
            </h3>

            {loading ? (
              <div className="flex justify-center">
                <img
                  style={{ width: "100px" }}
                  src={loadingImg.src}
                  alt="loading"
                  className="loading_logo"
                />
              </div>
            ) : (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="mb-3">
                      <TextInput
                        id="user"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={`Reviewer : ${
                          commentData.review_data?.reviewer?.name ||
                          "No Review Yet"
                        }`}
                      />
                    </div>
                    <div className="mb-3">
                      <TextInput
                        id="user"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={`Email : ${
                          commentData.review_data?.reviewer?.email ||
                          "No Review Yet"
                        }`}
                      />
                    </div>

                    <div className="mb-3">
                      <div>
                        <small className="font-semibold">User Question</small>
                      </div>
                      <Textarea
                        rows={4}
                        id="userQuestion"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={`${commentData?.user_chat?.question}`}
                      />
                    </div>

                    <div className="mb-3">
                      <div>
                        <small className="font-semibold">BYLD response</small>
                      </div>
                      <Textarea
                        rows={4}
                        id="byldResponse"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={`${commentData?.user_chat?.answer}`}
                      />
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between">
                        <small className="font-semibold">
                          User Dislike Comment
                        </small>
                        <small>
                          At: {formatDate(commentData?.user_chat?.created_at)}
                        </small>
                      </div>
                      <Textarea
                        rows={4}
                        id="userDislikeComment"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={commentData?.comment}
                      />
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between">
                        <small className="font-semibold">
                          Reviewer Response
                        </small>
                      </div>
                      <Textarea
                        rows={3}
                        placeholder="Write response."
                        id="reviewerResponse"
                        name="reviewerResponse"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.reviewerResponse}
                        defaultValue={commentData.comment_reviewr}
                        disabled={commentData?.review_data?.comment_reviewr}
                      />
                      {formik.touched.reviewerResponse &&
                      formik.errors.reviewerResponse ? (
                        <div className="text-red-500 text-sm">
                          {formik.errors.reviewerResponse}
                        </div>
                      ) : null}
                    </div>

                    {commentData?.review_data?.comment_reviewr ? (
                      ""
                    ) : (
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
                          <div className="text-red-600">
                            {formik.errors.status}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between mt-5">
                    <div className="w-full">
                      <Button onClick={handleClose}>CLOSE</Button>
                    </div>
                    <div className="w-full text-end">
                      <Button
                        type="submit"
                        disabled={commentData?.review_data?.comment_reviewr}
                      >
                        SUBMIT
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
