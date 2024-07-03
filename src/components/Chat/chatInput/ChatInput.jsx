"use client"
import { getChatData } from '@/app/Redux/Features/Chat/ChatSlice';
import { update } from '@/app/Redux/Features/Update/UpdateSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ChatInput({storedCode}) {
  const [message , setMessage] = useState("")
  const [token, setToken] = useState("");
  const [sendMessage,setSendMessage] = useState(false)
  const [loading,setLoading] = useState(false)
  const chatData = useSelector(state => state.chatSlice.chat_data)
  const conversation = useSelector(state => state.chatSlice.conversation)
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("data")) {
      const storedData = JSON.parse(localStorage.getItem("data"));
      setToken(storedData.token);
    }
  }, []);

  const handleSendMessage = () =>{
    dispatch(getChatData([...chatData, { question: message }]))
    setLoading(true)
    axios.post(
      "https://sbc.designal.cc/api/send-message",
      {
        question: message,
        master_chat_id: conversation && conversation.id,
        selected_pdf: storedCode && storedCode
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      console.log(response.data.success);
      if(response.data.success){
        dispatch(update())
      }else{
        console.log("works",storedCode)
        setSendMessage(true)
      }
      setLoading(false)
    })
    .catch(error => {
      setLoading(false)
      console.error('There was an error making the request!', error);
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    

    <div className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300" >
    {/* <button className="outline-none focus:outline-none">
      <svg
        className="text-gray-400 h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </button>
    <button className="outline-none focus:outline-none ml-1">
      <svg
        className="text-gray-400 h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg>
    </button> */}
    {loading ?
<>
<div className="flex space-x-2 animate-pulse">
<div className="w-3 h-3 bg-gray-500 rounded-full"></div>
<div className="w-3 h-3 bg-gray-500 rounded-full"></div>
<div className="w-3 h-3 bg-gray-500 rounded-full"></div>
</div>
</>
:
<>
    <textarea
      aria-placeholder="Escribe un mensaje aquí"
      placeholder={!conversation?.id ? "start new chat first" : "start question"}
      className="py-2 mx-3 pl-5 block w-full bg-gray-100 outline-none focus:text-gray-700 text-gray-800"
      type="text"
      name="message"
      required
      style={{borderRadius:'20px'}}
      rows={1}
      onChange={(e)=>{setMessage(e.target.value)}}
      disabled={!conversation.id}
      onKeyDown={handleKeyDown}
      value={message}

    >
      </textarea>

    <button  onClick={handleSendMessage} disabled={message.length <= 0 && !conversation.id } className="outline-none focus:outline-none" type="submit">
      <svg
        className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    </button>
    </>
}

    {sendMessage &&
      storedCode.length <= 0 &&
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Error</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Warnning ! You must chose Code..</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button  onClick={()=> setSendMessage(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    }
  </div>
  );
}

export default ChatInput;
