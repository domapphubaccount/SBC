"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "@/app/Redux/Features/Dashboard/UsersSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";

export function ResetPassword({ openReset, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const loading = useSelector((state) => state.usersSlice.loading);
  const ErrorMSG = useSelector((state) => state.usersSlice.error);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: "",
      account_type: "user",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: (values) => {
    //   dispatch(addUserAction({ token, ...values }));
    },
  });

  return (
    <>
      <Modal show={openReset} size="md" popup onClose={handleClose}>
        {ErrorMSG && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error!</span> {ErrorMSG}
          </div>
        )}
        <Modal.Header />
        <Modal.Body>
          {!loading ? (
            <form onSubmit={formik.handleSubmit} className="space-y-6">

              <div>
                <Label htmlFor="password" value="New Password" />
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>

              <div>
                <Label
                  htmlFor="password_confirmation"
                  value="Confirm Password"
                />
                <TextInput
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_confirmation}
                  required
                />
                {formik.touched.password_confirmation &&
                formik.errors.password_confirmation ? (
                  <div className="text-red-600">
                    {formik.errors.password_confirmation}
                  </div>
                ) : null}
              </div>


              <div className="flex items-center gap-2">
                <Checkbox
                  id="accept"
                  onChange={(e) =>
                    e.target.checked
                      ? formik.setFieldValue("account_type", "test")
                      : formik.setFieldValue("account_type", "user")
                  }
                />
                <Label htmlFor="accept" className="flex">
                  <span className="font-bold"> Send </span>&nbsp; Email &nbsp;
                  <a className="text-cyan-600 dark:text-cyan-500">
                    with necessary date
                  </a>
                </Label>
              </div>

              <div className="w-full flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          ) : (
            <div className="flex justify-center">
              <img
                style={{ width: "100px" }}
                src={loadingImg.src}
                alt="loading"
                className="loading_logo"
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
