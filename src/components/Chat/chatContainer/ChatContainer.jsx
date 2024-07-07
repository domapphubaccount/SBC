"use client"
import React, { useEffect, useState } from 'react'
import Refrence from '../reference/Refrence'
import ChatInput from '../chatInput/ChatInput'
import MainChat from '../mainChat/MainChat'
import axios from "axios";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCode } from '@/app/Redux/Features/Code/CodeSlice'
import { getChatData, getConversation } from '@/app/Redux/Features/Chat/ChatSlice'

function ChatContainer({storedCode}) {
  const dashboardData = useSelector(state => state.chatSlice.value)
  const catchChat = useSelector(state => state.chatSlice.get_chat)
  const updates = useSelector(state => state.updateSlice.state)
  const [token, setToken] = useState("");
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
  
  const [elementWidth,setElementWidth] = useState()
  useEffect(()=>{
    setElementWidth(document.getElementById("listRef").offsetWidth)
    // window.onresize = () => {
    //   setElementWidth(document.getElementById("refContainer").offsetWidth)
    // }
  },[])

  useEffect(()=>{
    if(token){
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
  window.MathJax && window.MathJax.typeset();
  },[token,dashboardData,updates,catchChat])

  

  return (
    <div className='h-screen chat_container'>
    <div className="w-full bg-neutral-200 chat_input">
      <div className="w-screen" style={{overflowX: 'hidden'}}>
        <div className=" border rounded" style={{ minHeight: '80vh'}}>
          <div className='grid grid-cols-4 min-w-full'>
            <Refrence setElementWidth={setElementWidth}/>
            <MainChat elementWidth={elementWidth} storedCode={storedCode}/>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChatContainer