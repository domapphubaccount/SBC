"use client"; // Ensure the component is treated as a client component

import { Button, Modal, Label } from "flowbite-react";
import Select from "react-select"; // Import react-select
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import {
  addpdffileAction,
  assignUserToPdfAction,
} from "@/app/Redux/Features/Dashboard/PdfsSlice";

export function Assign({ openAssign, handleClose, fileId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.pdfsSlice.loading);
  const ErrorMSG = useSelector((state) => state.pdfsSlice.error);
  const usersData = useSelector((state) => state.usersSlice.users);
  const [usersOption, setUsersOption] = useState([]);
  const [page, setPage] = useState(1);

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
  }, [dispatch, token, page]);

  useEffect(() => {
    if (usersData) {
      let data = usersData.filter(
        (item) => !item.pdfs.some((pdf) => pdf.id === fileId)
      );
      setUsersOption(
        data.map((item) => ({
          value: item.id,
          label: item.name,
        })) || []
      );
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
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="Users" value="User" />
                      <div
                        className="inline-flex rounded-md shadow-sm"
                        role="group"
                      >
                        <button
                          onClick={() => {
                            page > 1 && setPage(page - 1);
                          }}
                          title="back"
                          type="button"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                            />
                          </svg>
                        </button>
                        <button
                          title="more users"
                          onClick={() => {
                            setPage(page + 1);
                          }}
                          type="button"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
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
