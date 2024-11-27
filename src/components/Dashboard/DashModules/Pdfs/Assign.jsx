"use client";

import { Button, Modal, Label } from "flowbite-react";
import Select from "react-select"; // Import react-select
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { assignUserToPdfAction } from "@/app/Redux/Features/Dashboard/PdfsSlice";

export function Assign({ openAssign, handleClose, fileId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.pdfsSlice.loading);
  const ErrorMSG = useSelector((state) => state.pdfsSlice.error);
  const usersData = useSelector((state) => state.usersSlice.users);
  const [usersOption, setUsersOption] = useState([]);
  const [page, setPage] = useState(1);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      file_id: fileId,
      user_ids: [],
    },
    validationSchema: Yup.object({
      user_ids: Yup.array().min(1, "At least one User must be selected"), // Adjust validation for array
    }),
    onSubmit: (values) => {
      dispatch(assignUserToPdfAction({ token, ...values }));
    },
  });

  useEffect(() => {
    dispatch(getUsersAction({ token, page }));
  }, [page]);

  useEffect(() => {
    if (usersData) {
      let data = usersData.filter(
        (item) => !item.pdfs.some((pdf) => pdf.id === fileId)
      );
      if (page == 1) {
        setUsersOption([
          ...(data.map((item) => ({
            value: item.id,
            label: item.name,
          })) || []),
        ]);
      } else {
        setUsersOption([
          ...usersOption,
          ...(data.map((item) => ({
            value: item.id,
            label: item.name,
          })) || []),
        ]);
      }
    }
  }, [usersData, fileId]);

  return (
    <>
      <Modal show={openAssign} size="md" popup onClose={handleClose}>
        {ErrorMSG && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error!</span> {ErrorMSG}
          </div>
        )}
        <Modal.Header />
        <Modal.Body style={{ overflow: "visible" }}>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Assign User To File
            </h3>
            {loading ? (
              <div className="flex justify-center">
                <img
                  style={{ width: "100px" }}
                  src={loadingImg.src}
                  alt="loading"
                  className="loading_logo"
                />
              </div>
            ) : (
              <>
                <div>
                  {permissionsData &&
                  permissionsData.includes("users.index") ? (
                    <div>
                      <Label htmlFor="Users" value="User" />
                      <Select
                        id="Users"
                        name="user_ids"
                        isMulti
                        options={usersOption}
                        value={usersOption.filter((option) =>
                          formik.values.user_ids.includes(option.value)
                        )}
                        onChange={(selectedOptions) => {
                          formik.setFieldValue(
                            "user_ids",
                            selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : []
                          );
                        }}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.user_ids && formik.errors.user_ids ? (
                        <div className="text-red-600">
                          {formik.errors.user_ids}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <small className="text-red-700	">
                        You need "Users" permission to assign a user
                      </small>
                    </div>
                  )}
                </div>

                <div className="w-full flex justify-end">
                  <Button type="submit">Submit</Button>
                </div>
              </>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
