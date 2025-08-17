"use client";

import { Button, Modal, Textarea, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function ViewReview({ openView, handleClose }) {
  const reviewData = useSelector((state) => state.ReviewSlice.review);
  const loading = useSelector((state) => state.userCommentsSlice.loading);

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
      <Modal show={openView} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Review Iformation
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
                      value={`Reviewed At : ${formatDate(reviewData?.created_at)}`}
                    />
                  </div>
                  <div className="mb-5">
                    <TextInput
                      id="user email"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`Reviewer : ${reviewData?.reviewer?.name || 'none'}`}
                    />
                  </div>
                  <div className="mb-3">
                  <TextInput
                      id="user email"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`Status : ${reviewData?.status || 'none'}`}
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
                      <small>By: {reviewData?.reviewer?.name || 'none'}</small>
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
                      value={reviewData?.comment_super_reviewr || 'No Comments Yet.'}
                    />
                  </div>
                </div>

                <div>
                  <div className="w-full flex justify-end">
                    <Button onClick={handleClose}>CLOSE</Button>
                  </div>
                  {/* <div className="w-full text-end">
                    <Button onClick={handleClose}>SUBMIT</Button>
                  </div> */}
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
