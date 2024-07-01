"use client"
import React, { useEffect, useState } from 'react'
import Refrence from '../reference/Refrence'
import ChatInput from '../chatInput/ChatInput'
import MainChat from '../mainChat/MainChat'

function ChatContainer({storedCode}) {
  
  const [elementWidth,setElementWidth] = useState()
  useEffect(()=>{
    setElementWidth(document.getElementById("listRef").offsetWidth)
    // window.onresize = () => {
    //   setElementWidth(document.getElementById("refContainer").offsetWidth)
    // }
  },[])

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