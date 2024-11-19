"use client";

import { Button, Label, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import {
  updatPermissionAction,
} from "@/app/Redux/Features/Dashboard/RolesSlice";
import Select from "react-select";
import { getPermissionsAction } from "@/app/Redux/Features/Dashboard/PermmisionsSlice";

export function RolesPermissions({ openRole, handleClose }) {
  const dispatch = useDispatch();
  const roleData = useSelector((state) => state.rolesSlice.role);
  const loading = useSelector((state) => state.rolesSlice.loading);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const [permissionsOptions, setPermissionsOptions] = useState([]);
  const permissionsData = useSelector(
    (state) => state.permissionsSlice.permissions
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      permissions: roleData?.permissions?.map((item) => item.id) || [], // Initial permissions as array of IDs
    },
    validationSchema: Yup.object({
      permissions: Yup.array()
        .of(Yup.string())
        .required("At least one permission is required"),
    }),
    onSubmit: (values) => {
      dispatch(
        updatPermissionAction({
          token,
          id: roleData.id,
          permissions: values.permissions, // This should be sent as the array of permission IDs
        })
      );
    },
  });

  // Update formik values and permissions options when roleData changes
  useEffect(() => {
    if (roleData) {
      formik.setValues({
        permissions: roleData.permissions?.map((item) => item.id) || [],
      });
      dispatch(getPermissionsAction({ token }));
    }
  }, [roleData]);

  useEffect(() => {
    if (permissionsData) {
      // Set the options for the permissions
      setPermissionsOptions(
        permissionsData?.map((item) => ({
          value: item.id,
          label: item.name,
        })) || []
      );
    }
  }, [permissionsData]);

  return (
    <Modal show={openRole} size="xl" popup onClose={handleClose}>
      <Modal.Header />
      <Modal.Body className="overflow-auto h-full">
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6 overflow-auto h-full"
        >
          {!loading ? (
            <>
              <div>
                <Label htmlFor="permissions" value="Permissions" />
                <Select
                  id="permissions"
                  name="permissions"
                  closeMenuOnSelect={false}
                  isMulti
                  options={permissionsOptions}
                  value={permissionsOptions.filter((option) =>
                    formik.values.permissions.includes(option.value)
                  )}
                  onChange={(selectedOptions) => {
                    formik.setFieldValue(
                      "permissions",
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                />
                {formik.touched.permissions && formik.errors.permissions ? (
                  <div className="text-red-600">
                    {formik.errors.permissions}
                  </div>
                ) : null}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  formik.setFieldValue(
                    "permissions",
                    permissionsOptions.map((item) => item.value)
                  );
                }}
                type="button"
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Select All
              </button>
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
  );
}
