"use client"
import React, { useEffect, useState } from 'react'
import ChatInput from '../chatInput/ChatInput'
import axios from 'axios'
import Dislike from './actions/Dislike'
import { usePathname } from 'next/navigation'
import MessageImg from "@/assets/chat/MESSAGE.png"
import { MathJaxContext } from 'better-react-mathjax';
import { useDispatch, useSelector } from 'react-redux'


function MainChat() {
  const chatState = useSelector(state => state.chat)
  const auth = useSelector(state => state.authSlice.userData.token )
  const update = useSelector(state => state.updatesSlice.value)
  const update_first_message = useSelector(state => state.chat.first_message)
  const pattern = /SBC.*?\/\//g;
  const dispatch = useDispatch()

  useEffect(()=>{
    if(chatState.chatData){
        const chatId = chatState.chatData.id
        axios.get(`https://sbc.designal.cc/api/get-chat/1`, { //${chatId}
            headers: {
              Authorization: `Bearer ${auth}`
            },
            params: {
              chat_id: chatId,
              share_name: "1"
            }
          })
          .then(response => {
            if(response.data.success){
                dispatch(get_conversations(response.data))
            }
          })
          .catch(error => {
            console.error('There was an error making the request!', error);
      })
    }
    window.MathJax && window.MathJax.typeset();
},[chatState.chatData.id,update,update_first_message])

const textHandler = (item) => {
    if (item.match(pattern)) {
        let dataArray = item.match(pattern);
        let data = item;

        dataArray.forEach(item2 => {
            data = data.replaceAll(item2, '<br/>');
        });
      return data;
    }
    return item; // Return the original item if no match is found
}


  return (
    <div className="col-span-3 bg-white relative" style={{paddingTop:'100px',height:'calc(100vh - 69px)'}}>
    <div className="w-full log-bannar-2" >
      <div
        className="w-full grid grid-cols-4" 
        id="chat"
        style={{ height: 'calc(100vh - 80px)',position:'absolute',right:0,top:0,overflowY:'scroll'}}
        >
          <div className='col-span-4'>
            <div>
              <div className="clearfix2 mt-4 px-10" style={{paddingTop:'90px'}}>
                <React.Fragment >
                <div className='flex justify-end relative'>
                    <div>
                      <div className='chat_userName_2 text-right'>user</div> 
                        <div className="flex justify-end">
                        <div
                            className="bg-sky-900 text-white rounded px-5 py-2 my-2 relative chat_card"
                        >
                          <MathJaxContext>
                             <span className="block" dangerouslySetInnerHTML={{ __html: 'item.question' }} />
                          </MathJaxContext>
                        </div>
                      </div>
                      <div className='flex mb-3 justify-end'>
                        <svg onClick={()=>handleCopyText(item.question,i)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 mr-4 cursor-pointer">
                          <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
                          <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                          <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                        </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 mr-4  ml-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                    </div>
                </div>
                <div className='relative'>
                    <div className='code' >
                  <span className="hover:bg-gray-100 border border-gray-300 px-3 py-2  flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                        <div className="w-full pb-2">
                          <div className="flex justify-between">
                          </div>
                          <span className="block ml-2 text-sm text-gray-600  font-semibold">
                              <p className='w-100 my-3' >item3</p>
                            </span>
                        </div>
                      </span>
                    </div>

                    <div>
                      <div className='chat_userName'>BYLD AI</div>
                      <div className="w-full flex justify-start chat_card" >
                      <div 
                          className="bg-gray-200 rounded px-5 py-2 my-2 text-gray-700 relative chat_card"
                          >
                            <h4 className='text-black'>loading..</h4>
                          <>
                            <span className="block chat_box" style={{overflowX: 'auto'}}  /> :  
                            <>...</>                         
                          </>
                      </div>
                      </div>
                      <div className='flex mb-3'>
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                          <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                        </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clipRule="evenodd" />
                          </svg>
                          
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                          <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
                          <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                          <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                        </svg>

                        <svg  xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 ml-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                          <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                        </svg>
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                          <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                        </svg>
                      </div>
                    </div>
                </div>
                </React.Fragment>
              </div>
            </div>
        </div>
      </div>

    </div>
    
      <div style={{width: '100%',position:'absolute',bottom:'0'}}>
        <ChatInput />
      </div>
      {/* <Dislike /> */}
  </div>
  )
}

export default MainChat