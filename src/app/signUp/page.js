"use client"
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginImg from '@/assets/login/login.png';
import Link from 'next/link';
import axios from 'axios';
import { config } from '@/config/config';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or less')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function Page() {



    useEffect(()=>{
      if(JSON.parse(localStorage.getItem("data"))){
          redirect('/')
        }
    },[])
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      axios.post(`${config.api}user-create`,values).then(res=>console.log(res)).catch(e=>console.log(e))
    },
  });

  return (
    <section className='log-bannar'>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
        crossOrigin="anonymous"
      />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="form_container flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Join us Now
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Enter your credentials to get access account
          </div>

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-5">
                <label htmlFor="name" className="mb-1 text-xs tracking-wide text-gray-600">
                  Name:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i className="fas fa-user text-blue-500"></i>
                  </div>
                  <input
                    style={{ color: 'black' }}
                    id="name"
                    type="text"
                    name="name"
                    className={`text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border w-full py-2 focus:outline-none ${
                      formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-400'
                    }`}
                    placeholder="Enter your name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
                  ) : null}
              </div>
              <div className="flex flex-col mb-5">
                <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i className="fas fa-at text-blue-500"></i>
                  </div>
                  <input
                    style={{ color: 'black' }}
                    id="email"
                    type="email"
                    name="email"
                    className={`text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border w-full py-2 focus:outline-none ${
                      formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-400'
                    }`}
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                  ) : null}
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <i className="fas fa-lock text-blue-500"></i>
                    </span>
                  </div>
                  <input
                    style={{ color: 'black' }}
                    id="password"
                    type="password"
                    name="password"
                    className={`text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border w-full py-2 focus:outline-none ${
                      formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-400'
                    }`}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                  ) : null}
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
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
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <span className="ml-2 text-gray-700 font-medium text-xs text-center">
            You have an account?
            <Link href="/signIn" className="text-xs ml-2 text-blue-500 font-semibold">
              Login here
            </Link>
          </span>
        </div>
        <div>
          <img src={LoginImg.src} className="login_backdrop" alt="login bannar" />
        </div>
      </div>
    </section>
  );
}

export default Page;
