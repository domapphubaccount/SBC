"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addSectionAction } from "@/app/Redux/Features/Dashboard/SectionsSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function AddSection({ openAdd, setOpenAdd, handleOpenAdd }) {
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.sectionsSlice.loading);
  const dispatch = useDispatch();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      dispatch(addSectionAction({ token, ...values }));
      setOpenAdd(false)
    },
  });

  return (
    <>
      <Modal show={openAdd} size="md" popup onClose={() => setOpenAdd(false)}>
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

                <div className="w-full">
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
