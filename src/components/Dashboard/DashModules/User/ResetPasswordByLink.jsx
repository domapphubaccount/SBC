"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction, resetPasswordLinkAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ResetPasswordByLink({ openResetByLink, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const userData = useSelector((state) => state.usersSlice.user);
  const loading = useSelector((state) => state.usersSlice.loading);
  const ErrorMSG = useSelector((state) => state.usersSlice.error);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
        dispatch(resetPasswordLinkAction({ token, email: userData.email }));
    },
  });

  return (
    <>
      <Modal show={openResetByLink} size="md" popup onClose={handleClose}>
        {ErrorMSG && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error!</span> {ErrorMSG}
          </div>
        )}
        <Modal.Header />
        <Modal.Body>
          {!loading ? (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to reset this User's Password by link?
                </h3>
              </div>

              <div className="w-full flex justify-end">
                <Button type="submit">Send Link</Button>
              </div>
            </form>
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
