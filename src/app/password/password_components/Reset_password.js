"use client";
import React, { useState } from "react";
import { config } from "@/config/config";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

function ResetPassword({ storedCode }) {
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  const navigate = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setErrorMSG("");
      axios
        .post(
          `${config.api}password/reset-web`,
          {
            ...values,
            code: storedCode,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setErrorMSG("");
          navigate.push("/signIn");

          if (res.data.status === "SUCCESS") {
            localStorage.setItem("data", JSON.stringify(res.data.data));
          } else if (res.data.status === "ERROR") {
          }
        })
        .catch((e) => {
          setLoading(false);
          setErrorMSG(e?.response?.data?.message);
        });
    },
  });

  return (
    <div>
      {errorMSG && (
        <div
          className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 mb-4"
          role="alert"
        >
          <svg
            className="w-100 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">ERROR!</span> {errorMSG}
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center pt-3">
          <div
            className="w-12 h-12 rounded-full animate-spin
            border-2 border-dashed border-blue-500 border-t-transparent"
          ></div>
        </div>
      ) : (
        <div className="relative h-px bg-gray-300 mb-6">
          <div className="absolute left-0 top-0  w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">
              Reset your password
            </span>
          </div>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        {/* Code Input */}
        {/* New Password Input */}
        <div className="flex flex-col mb-6">
          <label
            htmlFor="password"
            className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            New Password:
          </label>
          <div className="relative">
            <input
              style={{ color: "black" }}
              id="password"
              type="password"
              name="password"
              className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Enter new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col mb-6">
          <label
            htmlFor="password_confirmation"
            className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            Confirm Password:
          </label>
          <div className="relative">
            <input
              style={{ color: "black" }}
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Confirm your new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password_confirmation}
            />
          </div>
          {formik.touched.password_confirmation &&
          formik.errors.password_confirmation ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.password_confirmation}
            </div>
          ) : null}
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-primary-color hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
          >
            <span className="mr-2 uppercase">Reset Password</span>
            <span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
