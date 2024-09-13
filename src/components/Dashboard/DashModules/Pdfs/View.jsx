"use client";

import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function ViewRole({ openView, handleClose }) {
  const roleData = useSelector((state) => state.rolesSlice.role);
  const loading = useSelector((state) => state.usersSlice.loading);

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
                      <TextInput
                        id="role_name"
                        style={{ opacity: 1 }}
                        type="text"
                        required
                        disabled
                        value={`Role : ${roleData.name}`}
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
                                    <div className="text-xs">{item.name}</div>
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

            <div className="w-full">
              <Button onClick={handleClose}>CLOSE</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
