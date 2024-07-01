"use client"
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import { useState } from "react";


export default function Home() {
  const [storedCode ,setStoredCode] = useState([])

  return (
    <main >
        <Header setStoredCode={setStoredCode} storedCode={storedCode}/>
        <DashLayout storedCode={storedCode} />
    </main>
  );
}
