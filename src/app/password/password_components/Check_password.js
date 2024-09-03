"use client";
import React, { useState } from "react";
import { config } from "@/config/config";
import axios from "axios";
import LoginImg from "@/assets/login/login.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { forgetPasswordAction } from "@/app/Redux/Features/Auth/AuthSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

function Forget_password() {
  const dispatch = useDispatch()
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);

      dispatch(forgetPasswordAction(values))

      //   setMessage("");
      //   setLoading(true);
      // axios
      //   .post(`${config.api}forgot-password`, values)
      //   .then((res) => {
      //     if (res.data.status === "SUCCESS") {
      //       localStorage.setItem("data", JSON.stringify(res.data.data));
            // router.push("/");
            // setMessage("");
            // setLoading(false);
          // } else if (res.data.status === "ERROR") {
            // setMessage(res.data.message);
            // setLoading(false);
        //   }
        // })
        // .catch((e) => console.log(e));
    },
  });

  return (
    <div>
      <div className="relative h-px bg-gray-300 mb-6">
        <div className="absolute left-0 top-0  w-full -mt-2">
          <span className="bg-white px-4 text-xs text-gray-500 uppercase">
            Forgot your password? Let us know your email
          </span>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-6">
          <label
            htmlFor="email"
            className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            E-Mail Address:
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              style={{ color: "black" }}
              id="email"
              type="email"
              name="email"
              className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="E-Mail Address"
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
        <div className="flex w-full">
          <button
            type="submit"
            className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-primary-color hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
          >
            <span className="mr-2 uppercase">Send</span>
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

export default Forget_password;
