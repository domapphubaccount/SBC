import {
  get_profile,
  handleChangePassword,
} from "@/app/Redux/Features/Profile/Profile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const Profile = () => {
  const { profile, error, status } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_profile());
  }, []);

  // Accordion State
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Form Validation Schema
  const validationSchema = Yup.object({
    current_password: Yup.string().required("Current password is required"),
    new_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log({current_password,new_password,confirm_password,token: JSON.parse(localStorage.getItem("data")).token});
      dispatch(
        handleChangePassword({
          ...values,
          token: JSON.parse(localStorage.getItem("data")).token,
        })
      );
      // alert("Password changed successfully!");
    },
  });

  // Format Date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-6 h-full">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        {/* Profile Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">{profile?.name}</h2>
          <p className="text-gray-500">{profile?.role}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4 text-primary border-t pt-4">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>{" "}
            <span>{profile?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>{" "}
            <span>{profile?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Joined:</span>{" "}
            <span>{formatDate(profile?.created_at)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                profile?.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {profile?.status}
            </span>
          </div>
        </div>

        {/* Accordion to Change Password */}
        <div className="mt-6">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full text-left font-semibold text-primary bg-gray-200 rounded-lg py-3 px-5 hover:bg-gray-300 transition"
          >
            {isAccordionOpen ? "Hide Change Password" : "Change Password"}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isAccordionOpen
                ? "max-h-screen mt-4 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 border rounded-lg bg-gray-50 mt-2">
              {/* Password Change Form */}
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {error && status === 0 && (
                  <div
                    className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-primary dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      className="shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Error!</span> {error}
                    </div>
                  </div>
                )}
                {status === 1 && (
                  <div
                    className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                  >
                    <svg
                      className="shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Success alert!</span> Change
                      a few things up and try submitting again.
                    </div>
                  </div>
                )}

                {/* Current Password */}
                <div>
                  <label
                    htmlFor="current_password"
                    className="block font-semibold text-sm text-primary"
                  >
                    Current Password
                  </label>
                  <input
                    disabled={status === 2}
                    type="password"
                    id="current_password"
                    {...formik.getFieldProps("current_password")}
                    className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-300 transition text-primary"
                    placeholder="Enter current password"
                  />
                  {formik.touched.current_password &&
                  formik.errors.current_password ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.current_password}
                    </p>
                  ) : null}
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor="new_password"
                    className="block font-semibold text-sm text-primary"
                  >
                    New Password
                  </label>
                  <input
                    disabled={status === 2}
                    type="password"
                    id="new_password"
                    {...formik.getFieldProps("new_password")}
                    className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-300 transition text-primary"
                    placeholder="Enter new password"
                  />
                  {formik.touched.new_password && formik.errors.new_password ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.new_password}
                    </p>
                  ) : null}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block font-semibold text-sm text-primary"
                  >
                    Confirm New Password
                  </label>
                  <input
                    disabled={status === 2}
                    type="password"
                    id="confirm_password"
                    {...formik.getFieldProps("confirm_password")}
                    className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-300 transition text-primary"
                    placeholder="Confirm new password"
                  />
                  {formik.touched.confirm_password &&
                  formik.errors.confirm_password ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.confirm_password}
                    </p>
                  ) : null}
                </div>

                {/* Submit Button */}
                <button
                  disabled={status === 2}
                  type="submit"
                  className="w-full py-2 mt-4 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
