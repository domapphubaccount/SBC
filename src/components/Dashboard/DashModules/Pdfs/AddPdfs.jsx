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
import { addpdffileAction, getHostedPdfsAction } from "@/app/Redux/Features/Dashboard/PdfsSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import ModuleProgress from "../../Progress/ModuleProgress";

export function Addpdfs({ openAdd, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sections = useSelector((state) => state.sectionsSlice.sections);
  const loading = useSelector((state) => state.pdfsSlice.loading);
  const pdfsHosted = useSelector((state) => state.pdfsSlice.hostedPdfs);
  const ErrorMSG = useSelector((state) => state.pdfsSlice.error);
  const [check, setIsChecked] = useState(false);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      pdf_name: "", // Add name field to initial values
      section_id: sections[0]?.id,
      pdf_path: null, // Initial value for the file
    },
    validationSchema: Yup.object({
      pdf_name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(40, "Name must be at most 40 characters"), // Adjust min and max lengths as needed
      section_id: Yup.string()
        .required("Section is required")
        .notOneOf([""], "Selecting 'NONE' is not allowed"), // Add this line

    }),
    onSubmit: (values) => {
      dispatch(addpdffileAction({ token, type: check ? 1 : 0, ...values }));
    },
  });

  useEffect(() => {
    dispatch(getSectionsAction({ token }));
    dispatch(getHostedPdfsAction({ token }));
  }, [dispatch, token]);


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
                  <Label htmlFor="pdf_name" value="File Name" />
                  <TextInput
                    id="pdf_name"
                    name="pdf_name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Handle blur for validation
                    value={formik.values.pdf_name}
                    required
                  />
                  {formik.touched.pdf_name && formik.errors.pdf_name ? (
                    <div className="text-red-600">{formik.errors.pdf_name}</div>
                  ) : null}
                </div>

                {permissionsData &&
                permissionsData.includes("files.host_files") ? (
                  <div>
                    <div className="max-w-md">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="pdf_path"
                          value="Select File Path"
                        />
                      </div>
                      <Select
                        id="pdf_path"
                        name="pdf_path"
                        onChange={formik.handleChange}
                        value={formik.values.pdf_path}
                        onBlur={formik.handleBlur} // To trigger validation on blur
                        required
                      >
                        <option value={""}>NONE</option>
                        {pdfsHosted?.map((item,index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </Select>
                      {formik.touched.pdf_path && formik.errors.pdf_path ? (
                        <div className="text-red-600">
                          {formik.errors.pdf_path}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div>
                    <small className="text-red-700	">
                      You need "Hosted Files" permission to add a File
                    </small>
                  </div>
                )}
                {permissionsData &&
                permissionsData.includes("sections.index") ? (
                  <div>
                    <div className="max-w-md">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="section_id"
                          value="Select your section"
                        />
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
                ) : (
                  <div>
                    <small className="text-red-700	">
                      You need "Sections" permission to add a File
                    </small>
                  </div>
                )}
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
