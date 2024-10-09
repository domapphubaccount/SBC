"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileAction,
  updatePasswordAction,
} from "@/app/Redux/Features/Profile/ProfileSlice";
import { TextInput, Label } from "flowbite-react";
import { config } from "@/config/config";

function Profile() {
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileSlice.profile);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getProfileAction({ token }));
  }, [dispatch, token]);

  const formik = useFormik({
    initialValues: {
      name: profileData.name || "",
      email: profileData.email || "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put(`${config.api}profile`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data) {
            setMessage("Profile updated successfully");
            setTimeout(() => setMessage(), 3000);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("There was an error updating the profile!", error);
        });
    },
  });

  useEffect(() => {
    if (profileData) {
      formik.setValues({
        name: profileData.name || "",
        email: profileData.email || "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [profileData]);

  return (
    <div className="p-5 pt-20 min-h-screen">
      <div className="p-10"></div>
      <div className="bg-white rounded p-5 w-full max-w-md mx-auto">
        {message ? (
          <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="font-medium">{message}</span>
          </div>
        ) : (
          ""
        )}
        {loading ? <div className="mb-3">Updating..</div> : ""}
        {/* <h4 className="text-xl font-bold text-center mb-4">Update Profile</h4> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={profileData.name}
              className="mt-1"
              disabled={formik.isSubmitting}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          {permissionsData && (
            <>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultValue={profileData.email}
                  className="mt-1"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <TextInput
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm your password"
                  value={formik.values.password_confirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.password_confirmation &&
                formik.errors.password_confirmation ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.password_confirmation}
                  </div>
                ) : null}
              </div>
              {permissionsData.includes(2) && (
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-full py-2 rounded mt-4"
                  disabled={formik.isSubmitting}
                >
                  Update Profile
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
