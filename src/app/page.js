"use client"
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [code,setCode] = useState([])
  const [token, setToken] = useState("");
  const [storedCode ,setStoredCode] = useState([])
  const [dashboardData , setDashboardData] = useState({})
  const [update,setUpdate] = useState(false)
  const [insideChat , setInsideChat] = useState({})
  const [catchChat,setCatchChat] = useState(null)
  console.log("catchChat",catchChat)
  
  useEffect(()=>{

    if(!JSON.parse(localStorage.getItem("data"))){
      redirect('/signIn')
    }

    else{
    if (typeof window !== "undefined" && localStorage.getItem("data")) {
      const storedData = JSON.parse(localStorage.getItem("data"));
      setToken(storedData.token);

    axios.get('https://sbc.designal.cc/api/sections',{
      headers: {
        Authorization: `Bearer ${storedData.token}`
      }}).then(res => 
        {
          if(res.data.success){
            setCode(res.data.data)
            console.log(res.data.data)
          }
        }
      ).catch(e => console.log(e))
    
    }}

  },[])

  useEffect(()=>{
    if (typeof window !== "undefined" && localStorage.getItem("data")) {
      const storedData = JSON.parse(localStorage.getItem("data"));
      
      axios.get('https://sbc.designal.cc/api/dashboard',{
        headers: {
          Authorization: `Bearer ${storedData.token}`
        }}).then(res => 
          {
            if(res.data.success){
              setDashboardData(res.data.data)
            }
          }
        ).catch(e => console.log(e))

    }
  },[update])

  useEffect(()=>{
    if(token){
      if(dashboardData){
        if(catchChat){
          console.log("catch chat")
          axios.get(`https://sbc.designal.cc/api/get-chat/${catchChat}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              chat_id: catchChat,
              share_name: "1"
          }
          })
          .then(response => {
            if(response.data.success){
            setInsideChat(response.data.data[0])
            console.log("response get chat",response.data);
            }
          })
          .catch(error => {
            console.error('There was an error making the request!', error);
          })

        }else if(dashboardData.chat_history && catchChat === null){
          console.log("default chat")
          const chat_id = Object.entries(dashboardData?.chat_history)[0][1][0].id
          const share_name = Object.entries(dashboardData?.chat_history)[0][1][0].share_name

          axios.get(`https://sbc.designal.cc/api/get-chat/${chat_id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              chat_id: chat_id,
              share_name: "1"
          }
          })
          .then(response => {
            if(response.data.success){
            setInsideChat(response.data.data[0])
            console.log("response get chat",response.data);
            }
          })
          .catch(error => {
            console.error('There was an error making the request!', error);
          })

        }
      }
  }
  },[token,dashboardData,update,catchChat])



  return (
    <main >
        <Header code={code} setStoredCode={setStoredCode} storedCode={storedCode} dashboardData={dashboardData} setUpdate={setUpdate} update={update} setInsideChat={setInsideChat} setCatchChat={setCatchChat}/>
        <DashLayout storedCode={storedCode} dashboardData={dashboardData} insideChat={insideChat} setUpdate={setUpdate} update={update}/>
    </main>
  );
}
