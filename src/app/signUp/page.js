"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginImg from "@/assets/login/login.png";
import Link from "next/link";
import axios from "axios";
import { config } from "@/config/config";
import { redirect, useRouter } from "next/navigation";
import Logo from "@/assets/logo/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { islogged, registerAction } from "../Redux/Features/Auth/AuthSlice";

// Validation schema with password confirmation
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be 50 characters or less")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

function Page() {
  // const [message, setMessage] = useState("");
  const loading = useSelector(state => state.loginSlice.loading);
  const message = useSelector(state => state.loginSlice.error)

  const dispatch = useDispatch()

  const isLogged = useSelector((state) => state.loginSlice.logged);

  useLayoutEffect(() => {
    if (isLogged) {
      redirect("/");
    }
  }, [isLogged]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(registerAction(values))
    },
  });

  return (
    <section className="log-bannar">
      <div className="min-h-screen flex flex-col items-center justify-center">
        {message && (
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
              <span className="font-medium">ERROR!</span> {message}
            </div>
          </div>
        )}
        <div className="form_container flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
          <div className="flex justify-center py-3">
            <img src={Logo.src} style={{ width: "200px" }} alt="Logo" />
          </div>
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Join us Now
          </div>
          {loading ? (
            <div className="flex justify-center pt-3">
              <div
                className="w-12 h-12 rounded-full animate-spin
            border-2 border-dashed border-blue-500 border-t-transparent"
              ></div>
            </div>
          ) : (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Enter your credentials to get access account
            </div>
          )}

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit}>
              {/* Name Field */}
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Name:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i className="fas fa-user text-secondar-color"></i>
                  </div>
                  <input
                    style={{ color: "black" }}
                    id="name"
                    type="text"
                    name="name"
                    className={`text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border w-full py-2 focus:outline-none ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Enter your name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              {/* Email Field */}
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i className="fas fa-at text-secondar-color"></i>
                  </div>
                  <input
                    style={{ color: "black" }}
                    id="email"
                    type="email"
                    name="email"
                    className={`text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border w-full py-2 focus:outline-none ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* Password Field */}
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <i className="fas fa-lock text-secondar-color"></i>
                    </span>
                  </div>
                  <input
                    style={{ color: "black" }}
                    id="password"
                    type="password"
                    name="password"
                    className={`text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border w-full py-2 focus:outline-none ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Enter your password"
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

              {/* Password Confirmation Field */}
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password_confirmation"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Confirm Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <i className="fas fa-lock text-secondar-color"></i>
                    </span>
                  </div>
                  <input
                    style={{ color: "black" }}
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    className={`text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border w-full py-2 focus:outline-none ${
                      formik.touched.password_confirmation &&
                      formik.errors.password_confirmation
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Confirm your password"
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

              {/* Submit Button */}
              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                  disabled={loading}
                >
                  <span className="mr-2 uppercase">Sign Up</span>
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
                      <path d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Link
              href="/signIn"
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span className="ml-2">Already have an account?</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
