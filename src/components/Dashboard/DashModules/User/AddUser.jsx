"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function AddUser({ openAdd, handleOpenAdd, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.usersSlice.loading);
  const roles = useSelector((state) => state.rolesSlice.roles);
  const ErrorMSG = useSelector((state) => state.usersSlice.error);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: "",
      account_type: "user",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Shouldn't exceed 30")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
      role_id: Yup.number()
        .required("Role is required")
        .min(1, "Please select a valid role"), // Ensures that role is not 0 or empty
    }),
    onSubmit: (values) => {
      dispatch(addUserAction({ token, ...values }));
    },
  });

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
                  max="30"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  onBlur={formik.handleBlur}
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
                  onBlur={formik.handleBlur}
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
                  onBlur={formik.handleBlur}
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
              {permissionsData && permissionsData.includes(24) && (
                <div>
                  <Label htmlFor="role_id" value="User Role: " />
                  <select
                    className="border-0"
                    id="role_id"
                    name="role_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role_id}
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.length > 0 &&
                      roles.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  {formik.touched.role_id && formik.errors.role_id ? (
                    <div className="text-red-600">{formik.errors.role_id}</div>
                  ) : null}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="accept"
                  onChange={(e) =>
                    e.target.checked
                      ? formik.setFieldValue("account_type", "test")
                      : formik.setFieldValue("account_type", "user")
                  }
                />
                <Label htmlFor="accept" className="flex">
                  <span className="font-bold"> Test </span>&nbsp; account &nbsp;
                  <a className="text-cyan-600 dark:text-cyan-500">
                    with suspension date
                  </a>
                </Label>
              </div>

              <div className="w-full flex justify-end">
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
