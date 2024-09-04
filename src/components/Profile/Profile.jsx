"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAction } from "@/app/Redux/Features/Profile/ProfileSlice";

function Profile() {
  const [token, setToken] = useState("");
  const [timer, setTimer] = useState(3);
  const [actionToggle, setActionToggle] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "", role: "" });
  const loading = useSelector((state) => state.profileSlice.loading);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setToken(JSON.parse(localStorage.getItem("data")).token);
      const data = JSON.parse(localStorage.getItem("data"));
      setUserData({
        name: data.name,
        email: data.email,
        role: data.role,
      });
    }
  }, []);

  const handleLogout = () => {
    if (actionToggle) {
      const handleTimer = () => {
        setTimer((prev) => (prev = timer - 1));

        setTimeout(() => {
          localStorage.removeItem("data");
          // redirect('/signIn')
          router.push("/signIn");
        }, 3000);
      };
      setTimeout(handleTimer, 1000);
    }
  };

  useEffect(() => {
    handleLogout();
  }, [actionToggle]);

  const profileFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Profile data submitted:", values);
      axios
        .post("https://sbc.designal.cc/api/update-profile", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setActionToggle(true);
          if (response.data.success) {
            console.log(response);
            setActionToggle(true);
          }
        })
        .catch((error) => {
          setActionToggle(true);
          console.error("There was an error making the request!", error);
        });
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      current_password: Yup.string().required("Current password is required"),
      new_password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      console.log("Password data submitted:", values);
      dispatch(
        updatePasswordAction({
          token,
          current_password: values.current_password,
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        })
      );
    },
  });

  const inputClass =
    "peer h-full w-full rounded-[7px] text-black border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";

  const labelClass =
    "before:content[' '] after:content[' '] text-black pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";

  return (
    <div>
      <div className="p-5 pt-20 rounded min-h-screen">
        <div className="bg-white rounded">
          <div>
            <div id="profile_bannar" className="p-4"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-black">
              <div className="col-span-1 lg:col-span-4 p-5 border flex flex-col	justify-between">
                <div>
                  <div className="font-bold">
                    <h6 className="mb-5">Name: {userData.name}</h6>
                    <h6 className="mb-5">Email: {userData.email} </h6>
                    <h6 className="mb-5">Role: {userData.role}</h6>
                  </div>
                </div>
                <div>
                  <div
                    className="mx-auto text-white py-2 text-center footer-text bg-slate-950"
                    style={{ color: "rgb(170 169 169)" }}
                  >
                    Powered By{" "}
                    <span className="font-semibold">
                      <span style={{ color: "#fff" }}>CPV</span>
                      <span style={{ color: "rgb(52 113 215)" }}>ARABIA</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-8 bg-slate-200	">
                <div className="p-5">
                  <div className=" pb-4 mb-4 relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                    <div className="mt-2 mb-4 w-full">
                      <h4 className="px-2 text-xl font-bold text-black dark:text-white">
                        Profile Data
                      </h4>
                      <p className="mt-2 px-2 text-base text-gray-600">
                        There is no option to update name and email .
                      </p>
                    </div>

                    <form
                      className="px-4 w-full"
                      onSubmit={profileFormik.handleSubmit}
                    >
                      <div className="w-100 mb-4">
                        <div className="relative h-10 w-full min-w-[200px]">
                          <input
                            className={inputClass}
                            placeholder=" "
                            name="name"
                            onChange={profileFormik.handleChange}
                            onBlur={profileFormik.handleBlur}
                            value={userData.name}
                            disabled
                          />
                          <label className={labelClass}>Name</label>
                        </div>
                      </div>
                      <div className="w-100 mb-4">
                        <div className="relative h-10 w-full min-w-[200px]">
                          <input
                            className={inputClass}
                            placeholder=" "
                            name="email"
                            onChange={profileFormik.handleChange}
                            onBlur={profileFormik.handleBlur}
                            value={userData.email}
                            disabled
                          />
                          <label className={labelClass}>Email</label>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="pb-4 mb-4 relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                    <div className="mt-2 mb-8 w-full">
                      <h4 className="px-2 text-xl font-bold text-black dark:text-white">
                        Update Password
                      </h4>
                      <p className="mt-2 px-2 text-base text-gray-600">
                        Ensure your account is using a long, random password to
                        stay secure.
                      </p>
                    </div>

                    {loading && (
                      <div className="flex space-x-2 animate-pulse mb-4">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      </div>
                    )}

                    <form
                      className="px-4 w-full"
                      onSubmit={passwordFormik.handleSubmit}
                    >
                      <div className="w-100 mb-4">
                        <div className="relative h-10 w-full min-w-[200px]">
                          <input
                            className={inputClass}
                            placeholder=" "
                            name="current_password"
                            type="password"
                            onChange={passwordFormik.handleChange}
                            onBlur={passwordFormik.handleBlur}
                            value={passwordFormik.values.current_password}
                          />
                          <label className={labelClass}>Current Password</label>
                          {passwordFormik.touched.current_password &&
                          passwordFormik.errors.current_password ? (
                            <div className="text-red-500 text-xs">
                              {passwordFormik.errors.current_password}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="w-100 mb-4">
                        <div className="relative h-10 w-full min-w-[200px]">
                          <input
                            className={inputClass}
                            placeholder=" "
                            name="new_password"
                            type="password"
                            onChange={passwordFormik.handleChange}
                            onBlur={passwordFormik.handleBlur}
                            value={passwordFormik.values.new_password}
                          />
                          <label className={labelClass}>New Password</label>
                          {passwordFormik.touched.new_password &&
                          passwordFormik.errors.new_password ? (
                            <div className="text-red-500 text-xs">
                              {passwordFormik.errors.new_password}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="w-100 mb-4">
                        <div className="relative h-10 w-full min-w-[200px]">
                          <input
                            className={inputClass}
                            placeholder=" "
                            name="confirm_password"
                            type="password"
                            onChange={passwordFormik.handleChange}
                            onBlur={passwordFormik.handleBlur}
                            value={passwordFormik.values.confirm_password}
                          />
                          <label className={labelClass}>Confirm Password</label>
                          {passwordFormik.touched.confirm_password &&
                          passwordFormik.errors.confirm_password ? (
                            <div className="text-red-500 text-xs">
                              {passwordFormik.errors.confirm_password}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-3 md:px-4 py-1 md:py-2 bg-blue-800 border border-sky-600 text-white rounded-lg hover:bg-sky-700"
                      >
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div id="profile_bannar" className="p-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
