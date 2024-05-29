import ChatContainer from '@/components/Chat/chatContainer/ChatContainer'
import Refrence from '@/components/Chat/reference/Refrence'
import React from 'react'

function DashLayout({storedCode,insideChat,update,setUpdate}) {
  return (
    <main >
        {/* <Refrence /> */}
        <ChatContainer storedCode={storedCode} insideChat={insideChat} setUpdate={setUpdate} update={update}/>
    </main>
  )
}

export default DashLayout