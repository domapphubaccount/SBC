"use client"
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  
  useEffect(()=>{

    if(!JSON.parse(localStorage.getItem("data"))){
      redirect('/signIn')
    }
  },[])

  return (
    <main >
        <Header />
        <DashLayout />
    </main>
  );
}
