"use client";

import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addSectionAction } from "@/app/Redux/Features/Dashboard/SectionsSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function AddSection({ openAdd, handleClose }) {
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.sectionsSlice.loading);
  const dispatch = useDispatch();
  const ErrorMSG = useSelector((state) => state.sectionsSlice.error);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      // fileName: Yup.string().required("File Name is Required")
    }),
    onSubmit: (values) => {
      dispatch(addSectionAction({ token, ...values }));
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("file_path", event.currentTarget.files[0]);
  };

  return (
    <>
      <Modal show={openAdd} size="md" popup onClose={handleClose}>
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
              Add Sections
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
                  <Label htmlFor="name" value="Section Name" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600">{formik.errors.name}</div>
                  ) : null}
                </div>

                {/* <hr />
                <div>
                  <Label htmlFor="fileName" value="File Name" />
                  <TextInput
                    id="fileName"
                    name="fileName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Handle blur for validation
                    value={formik.values.fileName}
                    required
                  />
                  {formik.touched.fileName && formik.errors.fileName ? (
                    <div className="text-red-600">{formik.errors.fileName}</div>
                  ) : null}
                </div> */}

                {/* <div>
                  <Label htmlFor="file_path" value="Upload PDF file" />
                  <FileInput
                    id="file_path"
                    name="file_path"
                    accept=".pdf"
                    onChange={handleFileChange}
                    helperText="Only PDF files are allowed."
                  />
                  {formik.touched.file_path && formik.errors.file_path ? (
                    <div className="text-red-600">
                      {formik.errors.file_path}
                    </div>
                  ) : null}
                </div> */}

                <div className="w-full flex justify-end">
                  <Button type="submit">Add Section</Button>
                </div>
              </>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
