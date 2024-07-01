"use client"
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const state = useSelector(state => state)
  console.log

  return (
    <main >
        <Header/>
        <DashLayout/>
    </main>
  );
}
