"use client";

import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getSectionsAction } from "@/app/Redux/Features/Dashboard/SectionsSlice";
import { addpdffileAction } from "@/app/Redux/Features/Dashboard/PdfsSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import ModuleProgress from "../../Progress/ModuleProgress";

export function Addpdfs({ openAdd, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sections = useSelector((state) => state.sectionsSlice.sections);
  const loading = useSelector((state) => state.pdfsSlice.loading);
  const ErrorMSG = useSelector((state) => state.pdfsSlice.error);
  const [check, setIsChecked] = useState(false);
  const prog = useSelector((state) => state.progressSlice);
  console.log(prog);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "", // Add name field to initial values
      section_id: sections[0]?.id,
      file_path: null, // Initial value for the file
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(40, "Name must be at most 40 characters"), // Adjust min and max lengths as needed
      section_id: Yup.string()
        .required("Section is required")
        .notOneOf([""], "Selecting 'NONE' is not allowed"), // Add this line
      file_path: Yup.mixed()
        .required("A file is required")
        .test("fileType", "Only PDF files are allowed", (value) => {
          return value && value.type === "application/pdf";
        }),
    }),
    onSubmit: (values) => {
      dispatch(addpdffileAction({ token, type: check ? 1 : 0, ...values }));
    },
  });

  useEffect(() => {
    dispatch(getSectionsAction({ token }));
  }, [dispatch, token]);

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
        <Modal.Header>
          {loading && (
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Add File
            </h3>
          )}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {!loading && (
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add File
              </h3>
            )}
            {loading ? (
              <>
                <div className="flex justify-center">
                  <img
                    style={{ width: "100px" }}
                    src={loadingImg.src}
                    alt="loading"
                    className="loading_logo"
                  />
                </div>
                <div className="mt-3">
                  <ModuleProgress />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="name" value="File Name" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Handle blur for validation
                    value={formik.values.name}
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div>
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label htmlFor="section_id" value="Select your section" />
                    </div>
                    <Select
                      id="section_id"
                      name="section_id"
                      onChange={formik.handleChange}
                      value={formik.values.section_id}
                      onBlur={formik.handleBlur} // To trigger validation on blur
                      required
                    >
                      <option value={""}>NONE</option>
                      {sections?.map((section) => (
                        <option key={section.id} value={section.id}>
                          {section.name}
                        </option>
                      ))}
                    </Select>
                    {formik.touched.section_id && formik.errors.section_id ? (
                      <div className="text-red-600">
                        {formik.errors.section_id}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
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
                </div>

                <div className="p-3">
                  {check && (
                    <div className="mt-2 mb-4 p-2 text-sm text-yellow-800 bg-red-100 border border-red-400 rounded">
                      <strong>Warning:</strong> You can't use the assistant file
                      ,it will be provided in only to <bold>Train</bold> model
                      training.
                    </div>
                  )}
                  <div className="flex items-center">
                    <input
                      id="editAfterTrain"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      onChange={(event) => {
                        setIsChecked(event.target.checked);
                      }}
                    />
                    <label
                      htmlFor="editAfterTrain"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      This is an assistant file
                    </label>
                  </div>
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
