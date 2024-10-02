"use client";

import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { editSectionAction } from "@/app/Redux/Features/Dashboard/SectionsSlice";

export function EditSections({ openEdit, handleClose }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.sectionsSlice.loading);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sectionData = useSelector((state) => state.sectionsSlice.section_ID);
  const ErrorMSG = useSelector((state) => state.sectionsSlice.error);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: sectionData.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      dispatch(editSectionAction({ token, id: sectionData.id, ...values }));
    },
  });

  // Update formik values when userData changes
  useEffect(() => {
    if (sectionData.name) {
      formik.setValues({
        name: sectionData.name || "",
      });
    }
  }, [sectionData]);

  const handleFileChange = (event) => {
    formik.setFieldValue("file_path", event.currentTarget.files[0]);
  };


  return (
    <>
      <Modal show={openEdit} size="md" popup onClose={handleClose}>
        {ErrorMSG && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">Error!</span> {ErrorMSG}
          </div>
        )}
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Section Details
            </h3>
            {!loading ? (
              <>
                <div>
                  <Label htmlFor="name" value="Section Name" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={sectionData.name}
                    placeholder={sectionData.name}
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
                  <Button type="submit">Save Changes</Button>
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
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
