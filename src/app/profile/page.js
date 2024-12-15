"use client";

import { redirect } from "next/navigation";
import React, { Suspense, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import dynamic from "next/dynamic";
import { remove_stored_page } from "../Redux/Features/Auth/AuthSlice";
const Profile = dynamic(() => import("@/components/Profile/Profile"), { ssr: false })

function Page() {
  const isLogged = useSelector((state) => state.loginSlice.logged);
  const dispatch = useDispatch()

  useLayoutEffect(() => {
        dispatch(remove_stored_page()) 
    if (!isLogged) {
      redirect("/signIn");
    }
  }, [isLogged]);

  return (
    <div className="bg-sky-950">
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    </div>
  );
}

export default Page;
