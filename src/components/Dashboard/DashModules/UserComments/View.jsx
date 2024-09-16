"use client";

import { Button, Modal, Textarea, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";


export function ViewUserComment({ openView, setOpenView , handleClose}) {
  const commentData = useSelector((state) => state.userCommentsSlice.comment);
  const loading = useSelector((state) => state.userCommentsSlice.loading);

  return (
    <>
      <Modal show={openView} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Comment Iformation
            </h3>

            {loading ? (
              <div className="flex justify-center">
                <img
                  style={{width: '100px'}}
                  src={loadingImg.src}
                  alt="loading"
                  className="loading_logo"
                />
              </div>
            ) : (
              <div>
                <div className="mb-2">
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
                {/* <div className="mb-2">
                  <TextInput
                    id="comment name"
                    style={{ opacity: 1 }}
                    type="text"
                    required
                    disabled
                    value={`User : ${userData.name}`}
                  />
                </div>
                <div>
                  <TextInput
                    id="user email"
                    style={{ opacity: 1 }}
                    type="text"
                    required
                    disabled
                    value={`Email : ${userData.email}`}
                  />
                </div> */}
              </div>
            )}

            <div className="w-full">
              <Button onClick={handleClose}>CLOSE</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
