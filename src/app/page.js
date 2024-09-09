"use client";
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const isLogged = useSelector((state) => state.loginSlice.logged);
  console.log(isLogged)

  useLayoutEffect(() => {
    if (isLogged == false) {
      redirect("/signIn");
    }
  }, [isLogged]);

  return (
    <main>
      <Header />
      <DashLayout />
    </main>
  );
}
