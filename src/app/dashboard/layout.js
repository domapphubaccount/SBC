import ChatContainer from '@/components/Chat/chatContainer/ChatContainer';
import ChatInput from '@/components/Chat/chatInput/ChatInput';
import Refrence from '@/components/Chat/reference/Refrence';
import DashLayout from '@/layout/DashLayout/DashLayout';
import Header from '@/layout/Header/Header';
import React from 'react'

export const metadata = {
  title: "SignUp",
  description: "SignUp and make account on SBC",
};

function layout({children}) {
  return (
    <div>
        <Header />
        <DashLayout />
        {children}
        {/* <ChatInput /> */}
    </div>
  )
}

export default layout