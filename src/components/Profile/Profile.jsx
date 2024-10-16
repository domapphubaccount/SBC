"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileAction,
} from "@/app/Redux/Features/Profile/ProfileSlice";
import { TextInput, Label, Card } from "flowbite-react";
import { config } from "@/config/config";

function Profile() {
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileSlice.profile);
  const permissionsData = useSelector((state) => state.profileSlice.permissions);
  const [message, setMessage] = useState(null);
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
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.put(`${config.api}profile`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.data) {
          setMessage({ type: "success", text: "Profile updated successfully" });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        setMessage({ type: "error", text: "Error updating profile" });
        console.error("There was an error updating the profile!", error);
      } finally {
        setLoading(false);
      }
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
    <div className="p-5 pt-20 min-h-screen flex flex-col items-center">
      {/* Profile Data Card */}
      <Card className="mb-5 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Profile Information</h3>
        <div className="mb-2"><strong>Name:</strong> {profileData.name}</div>
        <div className="mb-2"><strong>Email:</strong> {profileData.email}</div>
      </Card>

      {/* Update Profile Card */}
      <Card className="w-full max-w-md">
        {message && (
          <div
            className={`p-4 mb-4 text-sm rounded-lg ${
              message.type === "success" ? "text-blue-800 bg-blue-50" : "text-red-800 bg-red-50"
            }`}
            role="alert"
          >
            <span className="font-medium">{message.text}</span>
          </div>
        )}
        {loading && <div className="mb-3">Updating...</div>}
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
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
              className="mt-1"
              disabled={formik.isSubmitting}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-600 text-sm">{formik.errors.name}</div>
            )}
          </div>

          {/* Email Field (conditionally rendered) */}
          {permissionsData && (
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
                className="mt-1"
                disabled={formik.isSubmitting}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-sm">{formik.errors.email}</div>
              )}
            </div>
          )}

          {/* Password Field */}
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
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password Field */}
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
            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
              <div className="text-red-600 text-sm">{formik.errors.password_confirmation}</div>
            )}
          </div>

          {/* Update Button (conditionally rendered based on permissions) */}
          {permissionsData.includes(2) && (
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded mt-4"
              disabled={formik.isSubmitting}
            >
              Update Profile
            </button>
          )}
        </form>
      </Card>
    </div>
  );
}

export default Profile;
