"use client";
import Profile from "@/components/Profile/Profile";
import { redirect } from "next/navigation";
import React, { Suspense, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";

function Page() {
  const isLogged = useSelector((state) => state.loginSlice.logged);

  useLayoutEffect(() => {
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
