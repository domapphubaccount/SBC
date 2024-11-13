"use client"; // Ensure the component is treated as a client component

import { Button, Label, Modal, Select } from "flowbite-react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addpdffileAction } from "@/app/Redux/Features/Dashboard/PdfsSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { codeModule } from "@/app/Redux/Features/Code/CodeSlice";
import CodeSelector from "./CodeSelector";

export function CodeModule() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.codeSlice.codeModule);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.codeSlice.loading);
  const ErrorMSG = useSelector((state) => state.pdfsSlice.error);
  const [check, setIsChecked] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "", // Add name field to initial values
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must be at most 20 characters"), // Adjust min and max lengths as needed
    }),
    onSubmit: (values) => {
      dispatch(addpdffileAction({ token, type: check ? 1 : 0, ...values }));
    },
  });

  function handleClose() {
    dispatch(codeModule(false));
  }

  return (
    <>
      <Modal show={open} size="md" popup onClose={handleClose}>
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
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              CHOSE CODE
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
                <div className="w-full code-selector">
                  <CodeSelector />
                </div>
                  <div className="mt-2 mb-4 p-2 text-sm text-yellow-800 bg-red-100 border border-red-400 rounded">
                    <strong>Warning:</strong> You can't use more than 5 files
                    ,You can't change it after <bold>STARTING</bold> CHAT.
                  </div>
                <div className="w-full flex justify-end">
                  <Button type="submit">Submit</Button>
                </div>
              </>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
