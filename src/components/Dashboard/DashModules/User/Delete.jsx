"use client";

import { deleteUserAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function DeleteUser({ openDelete, handleClose }) {
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const userData = useSelector((state) => state.usersSlice.user);
  const loading = useSelector((state) => state.usersSlice.loading);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUserAction({ token, id: userData.id }));
  };


  // console.log(userData,'userData')
  return (
    <>
      <Modal
        show={openDelete}
        size="md"
        onClose={handleClose}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          {userData.id && !loading ? (
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this User?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={handleClose}>
                  No, cancel
                </Button>
              </div>
            </div>
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
        </Modal.Body>
      </Modal>
    </>
  );
}
