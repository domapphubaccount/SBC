"use client";

import { Button, Modal, Textarea, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function Reviewer({ openReviewer, handleClose }) {
  const commentData = useSelector((state) => state.userCommentsSlice.comment);
  const loading = useSelector((state) => state.userCommentsSlice.loading);

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
                <div>
                  <div className="mb-3">
                    <TextInput
                      id="user"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`User : Ahmed for Example`}
                    />
                  </div>

                  <div className="mb-3">
                    <div>
                      <small className="font-semibold">User Question</small>
                    </div>
                    <Textarea
                      rows={4}
                      id="comment id"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`Hi this is a user question?`}
                    />
                  </div>
                  <div className="mb-3">
                    <div>
                      <small className="font-semibold">BYLD response</small>
                    </div>
                    <Textarea
                      rows={4}
                      id="comment id"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`Hi this is a user question?`}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between">
                      <small className="font-semibold">
                        User Deslike Comment
                      </small>
                      <small>At: 25-12-2023</small>
                    </div>
                    <Textarea
                      rows={4}
                      id="comment id"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`User Comment : ${commentData.comment}`}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between">
                      <small className="font-semibold">reviewer Response</small>
                      <small>At: 25-12-2023</small>
                    </div>
                    <Textarea
                      rows={3}
                      placeholder="Write response ."
                      id="response"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`this is the reviewer comment of the user comment `}
                    />
                  </div>

                  <hr />

                  <div className="my-8">
                    <div className="flex justify-between">
                      <small className="font-semibold">Admin comment</small>
                    </div>
                    <Textarea
                      rows={3}
                      placeholder="Write response ."
                      id="response"
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      value={`Admin : `}
                    />
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
