"use client";

import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getSectionsAction } from "@/app/Redux/Features/Dashboard/SectionsSlice";
import { addpdffileAction } from "@/app/Redux/Features/Dashboard/PdfsSlice";

export function Addpdfs({ openAdd, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sections = useSelector((state) => state.sectionsSlice.sections);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      section_id: "",
      file_path: null, // Initial value for the file
    },
    validationSchema: Yup.object({
      section_id: Yup.string().required("Section is required"),
      file_path: Yup.mixed()
        .required("A file is required")
        .test("fileType", "Only PDF files are allowed", (value) => {
          return value && value.type === "application/pdf";
        }),
    }),
    onSubmit: (values) => {
      // const formData = new FormData();
      // formData.append("section_id", values.section_id);
      // formData.append("file_path", values.file_path); // Append file

      console.log(values)

      dispatch(addpdffileAction({ token, ...values }));
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
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Pdfs
            </h3>

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
                  required
                >
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
                <div className="text-red-600">{formik.errors.file_path}</div>
              ) : null}
            </div>

            <div className="w-full">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
