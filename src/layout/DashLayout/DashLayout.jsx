import ChatContainer from '@/components/Chat/chatContainer/ChatContainer'
import Refrence from '@/components/Chat/reference/Refrence'
import React from 'react'

function DashLayout({storedCode}) {
  return (
    <main >
        <ChatContainer storedCode={storedCode}/>
    </main>
  )
}

export default DashLayout