"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addRoleAction } from "@/app/Redux/Features/Dashboard/RolesSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import Select from "react-select";


export function AddRole({ openAdd, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.rolesSlice.loading);
  const [permissionsOptions, setPermissionsOptions] = useState([]);
  const [chosenPermissions,setChosenPermissions] = useState([])
  const ErrorMSG = useSelector((state) => state.rolesSlice.error);

  const permissionsData = useSelector(
    (state) => state.permissionsSlice.permissions
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
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
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">Error!</span> {ErrorMSG}
          </div>
        )}
        <Modal.Header />
        <Modal.Body className="overflow-visible">
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
                  <Select
                    id="permissions"
                    name="permissions"
                    closeMenuOnSelect={false}
                    isMulti
                    options={permissionsOptions}
                    // value={permissionsOptions.filter((option) =>
                    //   formik.values.permissions.includes(option.value)
                    // )}
                    onChange={(selectedOptions) => {
                      formik.setFieldValue(
                        "permissions",
                        selectedOptions.map((option) => option.value)
                      );
                    }}
                  />
                  {/* {formik.touched.permissions && formik.errors.permissions ? (
                    <div className="text-red-600">
                      {formik.errors.permissions}
                    </div>
                  ) : null} */}
                </div>

                <div className="w-full">
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
