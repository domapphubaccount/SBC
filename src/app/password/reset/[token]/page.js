"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/assets/logo/Logo.png";
import { useSelector } from "react-redux";
import ResetPassword from "../Password";
import { useSearchParams } from "next/navigation";

function Page({ params }) {
  const loading = useSelector((state) => state.loginSlice.password.loading);
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(null);
  const token = params.token; // Get the token from the dynamic route

  useEffect(() => {
    // Extract email from search parameters
    const emailParam = searchParams.get("email");
    setEmail(emailParam);
  }, [searchParams]);

  useEffect(() => {
    if (email && token) {
      console.log(`Email: ${email}`);
      console.log(`Token: ${token}`);
    } else {
      console.log("Email or token not found.");
    }
  }, [email, token]);

  return (
    <section className="log-bannar">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="form_container flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="flex justify-center py-3">
            <img src={Logo.src} style={{ width: "200px" }} alt="Logo" />
          </div>
          {loading && (
            <div className="flex justify-center pt-3">
              <div
                className="w-12 h-12 rounded-full animate-spin border-2 border-dashed border-blue-500 border-t-transparent"
              ></div>
            </div>
          )}
          {/* Reset Password Component */}
          <div className="mt-10">
            <ResetPassword email={email} token={token} />
          </div>
          {/* Link to Sign-Up Page */}
          <div className="flex justify-center items-center mt-6">
            <Link
              href="/signUp"
              className="inline-flex items-center font-bold text-secondar-color hover:text-blue-700 text-xs text-center"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="ml-2 text-primary-color">
                You don't have an account?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
