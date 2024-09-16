"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserAction,
  updateRoleAction,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { getRolesAction } from "@/app/Redux/Features/Dashboard/RolesSlice";

export function UserRole({ openRole, handleClose }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.usersSlice.user);
  const loading = useSelector((state) => state.usersSlice.loading);
  const loading_roles = useSelector((state) => state.rolesSlice.loading);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const roles = useSelector((state) => state.rolesSlice.roles);

  useLayoutEffect(() => {
    dispatch(getRolesAction({ token }));
  }, []);

  console.log(roles);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      role: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("role is required"),
    }),
    onSubmit: (values) => {
      dispatch(updateRoleAction({ token, id: userData.id, ...values }));
    },
  });

  return (
    <>
      <Modal show={openRole} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit User Role
            </h3>
            {!loading && !loading_roles ? (
              <>
                <div>
                  <Label htmlFor="role" value="User Role: " />
                  <select
                    className="border-0"
                    id="role"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                  >
                    <option value={""}>None</option>
                    {roles.length > 0 &&
                      roles.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                      ))}
                  </select>
                  {formik.touched.role && formik.errors.role ? (
                    <div className="text-red-600">{formik.errors.role}</div>
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
