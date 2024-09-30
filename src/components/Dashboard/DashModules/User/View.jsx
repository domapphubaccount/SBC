"use client";

import { Button, Modal, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function ViewUser({ openView, handleClose }) {
  const userData = useSelector((state) => state.usersSlice.user);
  const loading = useSelector((state) => state.usersSlice.loading);

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
              User Iformation
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
              <div>
                {/* <div className="mb-3">
                  <TextInput
                    id="user id"
                    style={{ opacity: 1 }}
                    type="text"
                    required
                    disabled
                    value={`User ID: ${userData.id}`}
                  />
                </div> */}
                <div className="mb-3">
                  <small>Created-At: {formatDate(userData.created_at)}</small>
                </div>
                <div className="mb-3">
                  <TextInput
                    id="user name"
                    style={{ opacity: 1 }}
                    type="text"
                    required
                    disabled
                    value={`User : ${userData.name}`}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    id="user email"
                    style={{ opacity: 1 }}
                    type="text"
                    required
                    disabled
                    value={`Email : ${userData.email}`}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    id="user role"
                    style={{ opacity: 1 }}
                    type="text"
                    required
                    disabled
                    value={`User Role : ${userData.roles[0]?.name} `}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    id="status"
                    style={{ opacity: 1 }}
                    type="text"
                    required
                    disabled
                    value={`Last Seen : ${userData.last_seen}`}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    id="status"
                    style={{ opacity: 1 }}
                    type="text"
                    required
                    disabled
                    value={`Status : ${userData.status}`}
                  />
                </div>
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
