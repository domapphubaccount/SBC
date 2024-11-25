"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function EditUser({ openEdit, handleClose }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.usersSlice.user);
  const loading = useSelector((state) => state.usersSlice.loading);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const roles = useSelector((state) => state.rolesSlice.roles);
  const ErrorMSG = useSelector((state) => state.usersSlice.error);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

  const status = ["active", "deactive", "suspend"];

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      status: userData?.status || "active",
      role_id: (userData.roles && userData?.roles[0]?.id) || "",
      // account_type: userData.account_type || ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Shouldn't exceed 30")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      status: Yup.string().required("Status is required"),
      role_id: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      dispatch(editUserAction({ token, id: userData.id, ...values }));
    },
  });

  useEffect(() => {
    if (userData) {
      formik.setValues({
        name: userData.name || "",
        email: userData.email || "",
        status: userData.status || "active",
        role_id: (userData.roles && userData?.roles[0]?.id) || "",
      });
    }
  }, [userData]);

  return (
    <>
      <Modal show={openEdit} size="md" popup onClose={handleClose}>
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
                    placeholder="Enter user name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-600">{formik.errors.name}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" value="User Email" />
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter user email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-600">{formik.errors.email}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="status" value="User Status" />
                  <select
                    id="status"
                    name="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    required
                  >
                    <option value="">Select Status</option>
                    {status.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="text-red-600">{formik.errors.status}</div>
                  )}
                </div>

                {permissionsData && permissionsData.includes("users.attach_role") && (
                  <div>
                    <Label htmlFor="role" value="User Role" />
                    <select
                      className="border-0"
                      id="role"
                      name="role_id"
                      onChange={formik.handleChange}
                      value={formik.values.role_id}
                      required
                    >
                      <option value="">None</option>
                      {roles.length > 0 &&
                        roles.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    {formik.touched.role_id && formik.errors.role_id && (
                      <div className="text-red-600">
                        {formik.errors.role_id}
                      </div>
                    )}
                  </div>
                )}
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
