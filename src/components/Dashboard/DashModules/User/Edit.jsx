"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function EditUser({ openEdit, handleClose }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.usersSlice.user);
  const loading = useSelector((state) => state.usersSlice.loading);
  const token = useSelector(state => state.loginSlice.auth?.access_token);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: userData.name,
      email: userData.email,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      dispatch(editUserAction({ token, id: userData.id, ...values }));
      
    },
  });

  // Update formik values when userData changes
  useEffect(() => {
    if (userData) {
      formik.setValues({
        name: userData.name || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  return (
    <>
      <Modal show={openEdit} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit User Details
            </h3>
            {!loading ? (
              <>
                <div>
                  <Label htmlFor="name" value="User Name" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder={userData.name}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600">{formik.errors.name}</div>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="email" value="User Email" />
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder={userData.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600">{formik.errors.email}</div>
                  ) : null}
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

            <div className="w-full">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
