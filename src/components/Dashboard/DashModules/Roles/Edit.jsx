"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { updateRoleAction } from "@/app/Redux/Features/Dashboard/RolesSlice";

import Select from "react-select";
import { Autocomplete, Chip, TextField } from "@mui/material";

export function EditRole({ openEdit, handleClose }) {
  const dispatch = useDispatch();
  const roleData = useSelector((state) => state.rolesSlice.role);
  const loading = useSelector((state) => state.rolesSlice.loading);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const [permissionsOptions, setPermissionsOptions] = useState([]);
  const permissionsData = useSelector(
    (state) => state.permissionsSlice.permissions
  );
  const ErrorMSG = useSelector((state) => state.rolesSlice.error);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: roleData.name,
      permissions: []
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      dispatch(updateRoleAction({ token, id: roleData.id, ...values }));
    },
  });

  // Update formik values when userData changes
  useEffect(() => {
    if (roleData) {
      formik.setValues({
        name: roleData.name || "",
        permissions: roleData.permissions?.map((item) => item.id) || [],
      });
    }
  }, [roleData]);

  useEffect(() => {
    if (permissionsData) {
      // Set the options for the permissions
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
            {!loading ? (
              <>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Edit Role Details
                </h3>
                <div>
                  <Label htmlFor="name" value="Role Name" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder={roleData.name}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600">{formik.errors.name}</div>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="permissions" value="Permissions" />
                  <Autocomplete
                    id="permissions"
                    multiple
                    options={availableOptions} // Options for autocomplete
                    getOptionLabel={(option) => option.label} // Use the 'label' property for displaying options
                    value={permissionsOptions.filter(
                      (option) =>
                        formik.values.permissions.includes(option.value) // Filter selected options based on formik values
                    )}
                    onChange={(event, selectedOptions) => {
                      formik.setFieldValue(
                        "permissions",
                        selectedOptions.map((option) => option.value) // Set the selected values in formik
                      );
                    }}
                    renderTags={(selectedOptions, getTagProps) =>
                      selectedOptions.map((option, index) => (
                        <Chip
                          key={option.value}
                          label={option.label} // Display the label in the Chip tag
                          {...getTagProps({ index })} // Pass props to the Chip component for tag functionality
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params} // Spread the params to the TextField input
                        variant="outlined"
                        label="Permissions" // Label for the input
                        placeholder="Select permissions" // Placeholder text for the input
                      />
                    )}
                  />
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
                      className="py-2.5 px-5 me-2 mb-2 mt-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                  {formik.touched.permissions && formik.errors.permissions ? (
                    <div className="text-red-600">
                      {formik.errors.permissions}
                    </div>
                  ) : null}
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
    </>
  );
}
