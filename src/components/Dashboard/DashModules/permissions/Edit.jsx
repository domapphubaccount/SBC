"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { updateRoleAction } from "@/app/Redux/Features/Dashboard/RolesSlice";
import { updatePermissionAction } from "@/app/Redux/Features/Dashboard/PermmisionsSlice";

export function EditPermission({ openEdit, handleClose }) {
  const dispatch = useDispatch();
  const permissionData = useSelector((state) => state.permissionsSlice.permission);
  const loading = useSelector((state) => state.permissionsSlice.loading);
  const token = useSelector(state => state.loginSlice.auth?.access_token);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: permissionData.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      dispatch(updatePermissionAction({ token, id: permissionData.id, ...values }));
    },
  });

  // Update formik values when userData changes
  useEffect(() => {
    if (permissionData) {
      formik.setValues({
        name: permissionData.name || "",
      });
    }
  }, [permissionData]);

  return (
    <>
      <Modal show={openEdit} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Permission Details
            </h3>
            {!loading ? (
              <>
                <div>
                  <Label htmlFor="name" value="Permission Name" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder={permissionData.name}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600">{formik.errors.name}</div>
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

            <div className="w-full flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
