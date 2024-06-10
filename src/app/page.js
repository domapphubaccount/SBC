"use client"
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCode } from "./Redux/Features/Code/CodeSlice";
import { getChatHistory } from "./Redux/Features/Chat/ChatSlice";

export default function Home() {
  const [token, setToken] = useState("");
  const [storedCode ,setStoredCode] = useState([])
  // const [dashboardData , setDashboardData] = useState({})
  const [update,setUpdate] = useState(false)
  const [insideChat , setInsideChat] = useState({})
  const [catchChat,setCatchChat] = useState(null)
  const [loading,setLoading] = useState(false)
  const [chatData , setChatData] = useState([])
  const dashboardData = useSelector(state => state.chatSlice.value)
  const dispatch = useDispatch()
  
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
            dispatch(getCode(res.data.data))
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
              // setDashboardData(res.data.data)
              dispatch(getChatHistory(res.data.data))
            }
          }
        ).catch(e => console.log(e))
    }
  },[update])


  useEffect(()=>{
    if(token){
      if(dashboardData){
        if(catchChat || localStorage.getItem("chat")){
          axios.get(`https://sbc.designal.cc/api/get-chat/${JSON.parse(localStorage.getItem("chat"))}`, {
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
              setInsideChat(response.data.data[0]);
              setChatData(response.data.data[0].user_chats)
            }
          })
          .catch(error => {
            console.error('There was an error making the request!', error);
          })
        }else if(dashboardData.chat_history && dashboardData.chat_history.length >= 1 && catchChat === null){
          const chat_id = Object.entries(dashboardData?.chat_history)[0][1][0]?.id
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
              setInsideChat(response.data.data[0]);
              setChatData(response.data.data[0].user_chats)
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
        <Header setStoredCode={setStoredCode} storedCode={storedCode} dashboardData={dashboardData} setUpdate={setUpdate} update={update} setInsideChat={setInsideChat} setCatchChat={setCatchChat} setLoading={setLoading}/>
        <DashLayout setChatData={setChatData} chatData={chatData} storedCode={storedCode} insideChat={insideChat} setUpdate={setUpdate} update={update} loading={loading} setLoading={setLoading} setCatchChat={setCatchChat}/>
    </main>
  );
}
