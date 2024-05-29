"use client"
import React, { useEffect, useState } from 'react'
import Refrence from '../reference/Refrence'
import ChatInput from '../chatInput/ChatInput'
import MainChat from '../mainChat/MainChat'

function ChatContainer() {
  const [elementWidth,setElementWidth] = useState()
  useEffect(()=>{
    setElementWidth(document.getElementById("refContainer").offsetWidth)
  },[])

  return (
    <div className='h-screen chat_container'>
    <div className="w-full bg-neutral-200 chat_input">
      <div className="w-screen">
        <div className="grid grid-cols-4 min-w-full border rounded" style={{ minHeight: '80vh' }}>
          <Refrence setElementWidth={setElementWidth}/>
          <MainChat elementWidth={elementWidth}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChatContainer