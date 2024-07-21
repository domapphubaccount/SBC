"use client"
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginImg from '@/assets/login/login.png';
import Link from 'next/link';
import axios from 'axios';
import { config } from '@/config/config';
import { useRouter } from 'next/navigation';
import Logo from "@/assets/logo/Logo.png"

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
  const [message, setMessage] = useState("")
  const [loading,setLoading] = useState(false)
  const router = useRouter()

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
      setLoading(true)
      setMessage(false)

      axios.post(`${config.api}user-create`,values)
      .then(res=>
      {
        if(res.data.status === "SUCCESS"){
          router.push('/signIn')
          setMessage("")
          setLoading(false)
       }else if(res.data.status === "ERROR"){
          setMessage(res.data.message)
          setLoading(false)
       }
    }).catch(e=>{ setLoading(false); console.log(e)})
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
      {message &&
        <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 mb-4" role="alert">
            <svg className="w-100 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <div>
                <span className="font-medium">ERROR!</span> {message}
            </div>
        </div>
        }
        <div className="form_container flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className='flex justify-center py-3'>
          <img src={Logo.src} style={{width:'200px'}} alt='Logo' />
        </div>
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Join us Now
          </div>
          {
            loading ?
            <div className='flex justify-center pt-3'>
            <div className="w-12 h-12 rounded-full animate-spin
            border-2 border-dashed border-blue-500 border-t-transparent"></div>
            </div>
            :
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Enter your credentials to get access account
          </div>
          }

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-5">
                <label htmlFor="name" className="mb-1 text-xs tracking-wide text-gray-600">
                  Name:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i className="fas fa-user text-secondar-color"></i>
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
                    <i className="fas fa-at text-secondar-color"></i>
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
                      <i className="fas fa-lock text-secondar-color"></i>
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
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-primary-color hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
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
          <span className="ml-2 text-primary-color font-medium text-xs text-center">
            You have an account?
            <Link href="/signIn" className="text-xs ml-2 font-semibold ">
              Login here
            </Link>
          </span>
        </div>
        {/* <div>
          <img src={LoginImg.src} className="login_backdrop" alt="login bannar" />
        </div> */}
      </div>
    </section>
  );
}

export default Page;
