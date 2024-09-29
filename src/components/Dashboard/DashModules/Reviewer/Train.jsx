"use client";

import { Button, Modal, Textarea, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { useState } from "react";

export function Train({ openTrain, handleClose }) {
  const reviewData = useSelector((state) => state.ReviewSlice.review);
  const loading = useSelector((state) => state.userCommentsSlice.loading);
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox

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
      <Modal show={openTrain} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Train Iformation
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
                  <div className="mb-5">
                    <TextInput
                      id=""
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`Reviewed At : ${formatDate(
                        reviewData?.created_at
                      )}`}
                    />
                  </div>
                  <div className="mb-5">
                    <TextInput
                      id="user email"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`Reviewer : ${
                        reviewData?.reviewer?.name || "none"
                      }`}
                    />
                  </div>
                  <div className="mb-3">
                    <TextInput
                      id="user email"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`Status : ${reviewData?.status || "none"}`}
                    />
                  </div>
                  <div className="mb-8">
                    <div>
                      <small>User Comment</small>
                    </div>
                    <Textarea
                      rows={4}
                      id="comment id"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={reviewData?.chat_user_dislike?.comment}
                    />
                  </div>
                  <div className="mb-8">
                    <div className="flex justify-between">
                      <small>Review</small>
                      <small>By: {reviewData?.reviewer?.name || "none"}</small>
                    </div>
                    <Textarea
                      rows={4}
                      id="comment id"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={reviewData.comment_reviewr}
                    />
                  </div>
                  <div className="mb-8">
                    <div>
                      <small>Comment Super Reviewer</small>
                    </div>
                    <Textarea
                      rows={4}
                      id="super-rev"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={
                        reviewData?.comment_super_reviewr || "No Comments Yet."
                      }
                    />
                  </div>

                  {/* <div className="mb-5">
                    <div>
                      <small>Response</small>
                    </div>
                    <Textarea
                      rows={3}
                      placeholder="Write response ."
                      id="response"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      // disabled
                      // value={`User : ${userData.name}`}
                    />
                  </div> */}
                </div>
                <div className="p-3">
                  <div className="mt-2 mb-4 p-2 text-sm text-red-800 bg-red-100 border border-red-400 rounded">
                    <strong>Warning:</strong> You can't edit this after
                    training.
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
                    <Button onClick={handleClose}>SUBMIT</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
