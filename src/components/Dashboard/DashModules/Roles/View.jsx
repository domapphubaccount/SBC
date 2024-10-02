"use client";

import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function ViewRole({ openView, handleClose }) {
  const roleData = useSelector((state) => state.rolesSlice.role);
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
              Role Iformation
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
                {roleData.name ? (
                  <>
                  <div className="mb-3">
                    <small>Created-At: {formatDate(roleData.created_at)}</small>
                  </div>
                    <div className="mb-3">
                      <TextInput
                        id="role_name"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={`Role : ${roleData.name}`}
                      />
                    </div>
                    <div className="mb-3">
                      <TextInput
                        id="role_name"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={`Assigned to : ${roleData.user_count ? roleData.user_count : 'No One'}`}
                      />
                    </div>
                    <div>
                      <div></div>
                      <div>
                        <Table>
                          <Table.Head>
                            <Table.HeadCell className="p-1">
                              Permission
                            </Table.HeadCell>
                          </Table.Head>
                          <Table.Body className="divide-y">
                            {roleData.permissions &&
                              roleData.permissions.map((item, index) => (
                                <Table.Row
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800 rounded"
                                  key={index}
                                >
                                  <Table.Cell className="p-1">
                                    <div className="text-xs">{item.slug}</div>
                                  </Table.Cell>
                                </Table.Row>
                              ))}
                          </Table.Body>
                        </Table>
                      </div>
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
