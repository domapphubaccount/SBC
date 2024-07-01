"use client"
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import axios from "axios";
import { redirect } from "next/navigation";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCode } from "./Redux/Features/Code/CodeSlice";
import { getChatData, getConversation } from "./Redux/Features/Chat/ChatSlice";

export default function Home() {
  const [token, setToken] = useState("");
  const [storedCode ,setStoredCode] = useState([])
  const dashboardData = useSelector(state => state.chatSlice.value)
  const catchChat = useSelector(state => state.chatSlice.get_chat)
  const updates = useSelector(state => state.updateSlice.state)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    console.log('page')
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
              // setInsideChat(response.data.data[0]);
              dispatch(getConversation(response.data.data[0]))
              dispatch(getChatData(response.data.data[0].user_chats))
              // setChatData(response.data.data[0].user_chats)
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
              dispatch(getConversation(response.data.data[0]))
              dispatch(getChatData(response.data.data[0].user_chats))
            }
          })
          .catch(error => {
            console.error('There was an error making the request!', error);
          })

        }
      }
  }
  window.MathJax && window.MathJax.typeset();
  },[token,dashboardData,updates,catchChat])

  return (
    <main >
        <Header setStoredCode={setStoredCode} storedCode={storedCode}/>
        <DashLayout storedCode={storedCode} />
    </main>
  );
}
