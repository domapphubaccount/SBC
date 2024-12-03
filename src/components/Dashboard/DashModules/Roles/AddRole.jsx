"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addRoleAction } from "@/app/Redux/Features/Dashboard/RolesSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import Select from "react-select";
import { Autocomplete, Chip, TextField } from "@mui/material";

export function AddRole({ openAdd, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.rolesSlice.loading);
  const [permissionsOptions, setPermissionsOptions] = useState([]);
  const ErrorMSG = useSelector((state) => state.rolesSlice.error);

  const permissionsData = useSelector(
    (state) => state.permissionsSlice.permissions
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      permissions: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      dispatch(addRoleAction({ token, ...values }));
    },
  });

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
        <Modal.Body className="overflow-auto">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {!loading ? (
              <>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Add Role
                </h3>
                <div>
                  <Label htmlFor="name" value="Role Name" />
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
                  <Label htmlFor="permissions" value="Attach Permissions" />
                  <Autocomplete
                    id="permissions"
                    multiple
                    options={permissionsOptions} // Use permissionsOptions for the available options
                    getOptionLabel={(option) => option.label} // Display the label for each option
                    value={permissionsOptions.filter(
                      (option) =>
                        formik.values.permissions.includes(option.value) // Filter selected options based on formik values
                    )}
                    onChange={(event, selectedOptions) => {
                      formik.setFieldValue(
                        "permissions",
                        selectedOptions.map((option) => option.value) // Update formik with selected values
                      );
                    }}
                    renderTags={(selectedOptions, getTagProps) =>
                      selectedOptions.map((option, index) => (
                        <Chip
                          key={option.value}
                          label={option.label} // Display label for each selected option
                          {...getTagProps({ index })} // Pass props to Chip component for handling tags
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

                  {/* {formik.touched.permissions && formik.errors.permissions ? (
                    <div className="text-red-600">
                      {formik.errors.permissions}
                    </div>
                  ) : null} */}
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

                <div className="w-full flex justify-end">
                  <Button type="submit">Submit</Button>
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
