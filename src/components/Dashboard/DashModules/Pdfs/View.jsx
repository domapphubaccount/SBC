"use client";

import { Button, Modal, Table, TextInput } from "flowbite-react";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function ViewPdf({ openView, handleClose, fileId }) {
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
              Role Iformation
            </h3>
            <div>
              {fileId.name ? (
                <>
                  <div className="mb-3">
                    <TextInput
                      id=""
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`Created-At : ${formatDate(fileId.created_at)}`}
                    />
                  </div>
                  <div className="mb-3">
                    <TextInput
                      id=""
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`BY : ${fileId.uploaded_by}`}
                    />
                  </div>
                  <div className="mb-3">
                    <TextInput
                      id=""
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      disabled
                      value={`File Name : ${fileId.name}`}
                    />
                  </div>
                  <div className="mb-3">
                    <TextInput
                      id=""
                      style={{ opacity: 1 }}
                      type="text"
                      required
                      // disabled
                      value={
                        fileId.file.replace("public/uploads/", "")
                      }
                    />
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
            </div>

            <div className="w-full flex justify-end">
              <Button onClick={handleClose}>CLOSE</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
