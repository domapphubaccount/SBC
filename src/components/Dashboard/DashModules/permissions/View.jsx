"use client";

import { Button, Modal, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function ViewPermission({ openView, handleClose }) {
  const permissionData = useSelector((state) => state.permissionsSlice.permission);
  const loading = useSelector((state) => state.permissionsSlice.loading);


  return (
    <>
      <Modal show={openView} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Permission Iformation
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
                {permissionData.name ? (
                  <>
                    <div className="mb-3">
                      <TextInput
                        id="permission_name"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={`Permission : ${permissionData.name}`}
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
            )}

            <div className="w-full flex justify-end">
              <Button onClick={handleClose}>CLOSE</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
