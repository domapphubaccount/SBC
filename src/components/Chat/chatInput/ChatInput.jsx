"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ChatInput({storedCode,insideChat,update,setUpdate}) {
  const [message , setMessage] = useState("")
  
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("data")) {
      const storedData = JSON.parse(localStorage.getItem("data"));
      setToken(storedData.token);
    }
  }, []);

  const handleSendMessage = () =>{
    axios.post(
      "https://sbc.designal.cc/api/send-message",
      {
        question: message,
        master_chat_id: insideChat&& insideChat.id,
        selected_pdf: storedCode && storedCode
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      console.log(response.data);
      setUpdate(!update)
    })
    .catch(error => {
      console.error('There was an error making the request!', error);
    });
  }
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

    <textarea
      aria-placeholder="Escribe un mensaje aquí"
      placeholder="Escribe un mensaje aquí"
      className="py-2 mx-3 pl-5 block w-full bg-gray-100 outline-none focus:text-gray-700 text-gray-800"
      type="text"
      name="message"
      required
      style={{borderRadius:'20px'}}
      rows={1}
      onChange={(e)=>setMessage(e.target.value)}
    >
      </textarea>

    <button onClick={handleSendMessage} className="outline-none focus:outline-none" type="submit">
      <svg
        className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    </button>
  </div>
  );
}

export default ChatInput;
