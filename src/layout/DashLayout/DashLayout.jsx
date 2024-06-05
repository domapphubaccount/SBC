import ChatContainer from '@/components/Chat/chatContainer/ChatContainer'
import Refrence from '@/components/Chat/reference/Refrence'
import React from 'react'

function DashLayout({chatData,setChatData,storedCode,insideChat,update,setUpdate,loading,setLoading,setCatchChat}) {
  return (
    <main >
        {/* <Refrence /> */}
        <ChatContainer chatData={chatData} setChatData={setChatData} setCatchChat={setCatchChat} setLoading={setLoading} loading={loading} storedCode={storedCode} insideChat={insideChat} setUpdate={setUpdate} update={update}/>
    </main>
  )
}

export default DashLayout