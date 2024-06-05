"use client"
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import axios from "axios";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [code,setCode] = useState([])
  const [storedCode ,setStoredCode] = useState([])
  const [update,setUpdate] = useState(false)
  const [insideChat , setInsideChat] = useState({})
  const [catchChat,setCatchChat] = useState(null)
  const [loading,setLoading] = useState(false)
  const [chatData,setChatData] = useState([])
  const pathname = usePathname()

  useEffect(() => {
    axios.get(`https://sbc.designal.cc/get-chat-by-hash/${pathname.slice(10)}`)
    .then(response => {setInsideChat(response.data.data[0]);setChatData(response.data.data[0].user_chats)})

    .catch(e => console.log(e))
  }, [update, catchChat]);


  return (
    <main >
        <Header code={code} setStoredCode={setStoredCode} storedCode={storedCode} setUpdate={setUpdate} update={update} setInsideChat={setInsideChat} setCatchChat={setCatchChat} setLoading={setLoading}/>
        <DashLayout setChatData={setChatData} chatData={chatData} storedCode={storedCode} insideChat={insideChat} setUpdate={setUpdate} update={update} loading={loading}/>
    </main>
  );
}
