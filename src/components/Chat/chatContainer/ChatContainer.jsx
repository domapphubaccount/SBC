"use client"
import React from 'react'
import Refrence from '../reference/Refrence'
import MainChat from '../mainChat/MainChat'

function ChatContainer() {

  return (
    <div className='h-screen chat_container'>
      <div className="w-full bg-neutral-200 chat_input">
        <div className="w-screen" style={{overflowX: 'hidden'}}>
          <div className=" border rounded" style={{ minHeight: '80vh'}}>
            <div className='grid grid-cols-4 min-w-full'>
            <Refrence />
            <MainChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer