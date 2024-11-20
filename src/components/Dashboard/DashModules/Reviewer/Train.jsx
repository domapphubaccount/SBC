"use client";

import { Button, Modal, Textarea, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { useLayoutEffect, useState } from "react";
import { trainAction } from "@/app/Redux/Features/Dashboard/ReviewerSlice";
import { getCommentByIDAction } from "@/app/Redux/Features/Dashboard/UsersCommentsSlice";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export function Train({ openTrain, handleClose }) {
  const reviewData = useSelector((state) => state.ReviewSlice.review);
  const loading = useSelector((state) => state.userCommentsSlice.loading);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const commentData = useSelector((state) => state.userCommentsSlice.comment);
  const ErrorMSG = useSelector((state) => state.ReviewSlice.error);

  useLayoutEffect(() => {
    if (reviewData) {
      dispatch(
        getCommentByIDAction({ token, id: reviewData.chat_user_dislike.id })
      );
    }
  }, [reviewData]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

  const handleSubmit = () => {
    const stripHtml = (html) => {
      return html.replace(/<[^>]*>/g, ''); // Regular expression to remove HTML tags
    };
  
    const userQuestion = commentData?.user_chat?.question;
    const providedAnswer = stripHtml(commentData?.user_chat?.answer); // Stripped answer
    const correctAnswer = reviewData.comment_reviewr;
  
    dispatch(
      trainAction({
        token,
        new_data: `Question: ${userQuestion}
        Provided Answer: ${providedAnswer}
        Evaluation: Wrong
        Correct Answer: ${correctAnswer}`,
        id: reviewData.id || ''
      })
    );
  };
  

  return (
    <Modal show={openTrain} size="md" popup onClose={handleClose}>
      {ErrorMSG && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Error!</span> {ErrorMSG}
        </div>
      )}
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Train Information
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
              <div>
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
                <MathJaxContext>
                  <MathJax dynamic>
                    <div className="my-5 rounded border p-3">
                      <div>
                        <small className="font-semibold">BYLD response</small>
                      </div>
                      <div
                        id="byldResponse"
                        style={{ opacity: 1, overflowX: "auto" }}
                        className="textarea text-xs	"
                        dangerouslySetInnerHTML={{
                          __html: commentData?.user_chat?.answer,
                        }}
                      />
                    </div>
                  </MathJax>
                </MathJaxContext>
                <div className="mb-5">
                  <TextInput
                    required
                    disabled
                    style={{ opacity: 1 }}
                    value={`Reviewed At : ${formatDate(
                      reviewData?.created_at
                    )}`}
                  />
                </div>
                <div className="mb-5">
                  <TextInput
                    required
                    disabled
                    style={{ opacity: 1 }}
                    value={`Reviewer : ${reviewData?.reviewer?.name || "none"}`}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    required
                    disabled
                    style={{ opacity: 1 }}
                    value={`Status : ${reviewData?.status || "none"}`}
                  />
                </div>
                <div className="mb-8">
                  <div>
                    <small className="font-semibold">User Comment</small>
                  </div>
                  <Textarea
                    rows={4}
                    style={{ opacity: 1 }}
                    required
                    disabled
                    value={reviewData?.chat_user_dislike?.comment}
                  />
                </div>
                <div className="mb-8">
                  <div className="flex justify-between">
                    <div>
                      <small className="font-semibold">
                        Review By: {reviewData?.reviewer?.name || "none"}
                      </small>
                    </div>
                  </div>
                  <Textarea
                    rows={4}
                    style={{ opacity: 1 }}
                    required
                    disabled
                    value={reviewData.comment_reviewr}
                  />
                </div>
                <div className="mb-8">
                  <div>
                    <small className="font-semibold">
                      Comment Super Reviewer
                    </small>
                  </div>
                  <Textarea
                    rows={4}
                    style={{ opacity: 1 }}
                    required
                    disabled
                    value={
                      reviewData?.comment_super_reviewr || "No Comments Yet."
                    }
                  />
                </div>
              </div>

              <div>
                <h4 className="font-bold">Train</h4>
              </div>
              <div className="my-5 rounded border p-3">
                <div>
                  <small className="font-semibold">Question:</small>
                </div>
                <div
                  id="byldResponse"
                  style={{ opacity: 1, overflowX: "auto" }}
                  className="textarea text-xs	"
                  dangerouslySetInnerHTML={{
                    __html: commentData?.user_chat?.question,
                  }}
                />

                <div>
                  <small className="font-semibold">Provided Answer:</small>
                </div>
                <MathJaxContext>
                  <MathJax dynamic>
                    <div
                      id="byldResponse"
                      style={{ opacity: 1, overflowX: "auto" }}
                      className="textarea text-xs	" // Add any styling class if needed
                      dangerouslySetInnerHTML={{
                        __html: commentData?.user_chat?.answer,
                      }}
                    />
                  </MathJax>
                </MathJaxContext>

                <div>
                  <small className="font-semibold">Evaluation: Wrong</small>
                </div>

                <div>
                  <small className="font-semibold">Correct Answer:</small>
                </div>
                <div
                  id="byldResponse"
                  style={{ opacity: 1, overflowX: "auto" }}
                  className="textarea text-xs	"
                  dangerouslySetInnerHTML={{
                    __html: reviewData.comment_reviewr,
                  }}
                />
              </div>

              <div className="p-3">
                <div className="mt-2 mb-4 p-2 text-sm text-red-800 bg-red-100 border border-red-400 rounded">
                  <strong>Warning:</strong> You can't edit this after training.
                </div>
                <div className="flex items-center">
                  <input
                    id="editAfterTrain"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    onChange={(event) => {
                      setIsChecked(event.target.checked);
                    }}
                  />
                  <label
                    htmlFor="editAfterTrain"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I understand that I can't edit after training
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full">
                  <Button onClick={handleClose}>CLOSE</Button>
                </div>
                <div className="w-full text-end">
                  <Button disabled={!isChecked} onClick={handleSubmit}>
                    SUBMIT
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
