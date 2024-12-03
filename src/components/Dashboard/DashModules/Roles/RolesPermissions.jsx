"use client";

import { Button, Label, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { updatPermissionAction } from "@/app/Redux/Features/Dashboard/RolesSlice";
import { getPermissionsAction } from "@/app/Redux/Features/Dashboard/PermmisionsSlice";
import { Autocomplete, TextField, Chip } from "@mui/material";

export function RolesPermissions({ openRole, handleClose }) {
  const dispatch = useDispatch();
  const roleData = useSelector((state) => state.rolesSlice.role);
  const loading = useSelector((state) => state.rolesSlice.loading);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const permissionsData = useSelector(
    (state) => state.permissionsSlice.permissions
  );

  const [permissionsOptions, setPermissionsOptions] = useState([]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      permissions: roleData?.permissions?.map((item) => item.id) || [],
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
          permissions: values.permissions,
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
      setPermissionsOptions(
        permissionsData?.map((item) => ({
          value: item.id,
          label: item.slug,
        })) || []
      );
    }
  }, [permissionsData]);

  // Dynamically filter available options based on selected permissions
  const availableOptions = permissionsOptions.filter(
    (option) => !formik.values.permissions.includes(option.value)
  );

  return (
    <Modal show={openRole} size="xl" popup onClose={handleClose}>
      <Modal.Header />
      <Modal.Body className="overflow-auto">
        <form onSubmit={formik.handleSubmit} className="space-y-6 h-full">
          {!loading ? (
            <>
              <div>
                <Label htmlFor="permissions" value="Permissions" />
                <Autocomplete
                  id="permissions"
                  multiple
                  options={availableOptions}
                  getOptionLabel={(option) => option.label}
                  value={permissionsOptions.filter((option) =>
                    formik.values.permissions.includes(option.value)
                  )}
                  onChange={(event, selectedOptions) => {
                    formik.setFieldValue(
                      "permissions",
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                  renderTags={(selectedOptions, getTagProps) =>
                    selectedOptions.map((option, index) => (
                      <Chip
                        key={option.value}
                        label={option.label}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Permissions"
                      placeholder="Select permissions"
                    />
                  )}
                />
                {formik.touched.permissions && formik.errors.permissions ? (
                  <div className="text-red-600">
                    {formik.errors.permissions}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFieldValue(
                      "permissions",
                      permissionsOptions.map((item) => item.value)
                    );
                  }}
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Select All
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFieldValue("permissions", []);
                  }}
                  disabled={formik.values?.permissions?.length === 0}
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 mt-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Clear
                </button>
              </div>

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
