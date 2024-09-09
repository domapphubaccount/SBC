"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";


export function AddUser({ openAdd, handleOpenAdd, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.usersSlice.loading);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      // Add your form submission logic here
      dispatch(addUserAction({ token, ...values }));
    },
  });

  return (
    <>
      <Modal show={openAdd} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          {!loading ? (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add User
              </h3>

              <div>
                <Label htmlFor="name" value="User Name" />
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

              <div>
                <Label htmlFor="email" value="User Email" />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="password" value="Password" />
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>

              <div>
                <Label
                  htmlFor="password_confirmation"
                  value="Confirm Password"
                />
                <TextInput
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password_confirmation}
                  required
                />
                {formik.touched.password_confirmation &&
                formik.errors.password_confirmation ? (
                  <div className="text-red-600">
                    {formik.errors.password_confirmation}
                  </div>
                ) : null}
              </div>

              <div className="w-full">
                <Button type="submit">Submit</Button>
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
