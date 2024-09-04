"use client"
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function Home() {
  const [storedCode ,setStoredCode] = useState([])
  const state = useSelector(state => state)

  return (
    <main >
        <Header setStoredCode={setStoredCode} storedCode={storedCode}/>
        <DashLayout />
    </main>
  );
}
