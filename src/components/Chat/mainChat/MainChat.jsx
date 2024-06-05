"use client"
import React, { useEffect, useState } from 'react'
import ChatInput from '../chatInput/ChatInput'
import axios from 'axios'
import Dislike from './actions/Dislike'
import { usePathname } from 'next/navigation'
import MessageImg from "@/assets/chat/MESSAGE.png"
import { Button } from '@material-tailwind/react'

function MainChat({chatData,setChatData,elementWidth,storedCode,insideChat,update,setUpdate,loading,setLoading,setCatchChat}) {
  const pathName = usePathname()
  const [copyIcon , setCopyIcon] = useState(false)
  const [user,setUser] = useState('')
  const [dislike, setDislike] = useState(false)
  const [loadingMessage,setLoadingMessage] = useState(false)
  const [token, setToken] = useState("");
  const [itemId,setItemId] = useState(null)
  const [dislikeMessage,setDislikeMessage] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track speech synthesis


  const dislikeToggle = (id) => {
    setItemId(id)
    setDislike(!dislike)

  }
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("data")) {
      const storedData = JSON.parse(localStorage.getItem("data"));
      setToken(storedData.token);
    }
  }, []);
  const handleReadText = async (textRead) => {
    try {
        // Check if the text is in Arabic
        const isArabic = /[^\u0000-\u007F]/.test(textRead);

        if (isArabic) {
            // Translate Arabic text to English
            const { text } = await translate(textRead, { to: 'en' });
            textRead = text;
        }

        // Speak the text in English
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(textRead);
            utterance.lang = 'en-US'; // Set language to English (United States)
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true); // Update state to indicate speech synthesis is active
            utterance.onend = () => {
                setIsSpeaking(false); // Update state to indicate speech synthesis has ended
            };
        } else {
            console.error('Speech synthesis not supported in this browser.');
        }
    } catch (error) {
        console.error('Error translating or reading text:', error);
    }
};

const handleStopReading = () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop speech synthesis
        setIsSpeaking(false); // Update state to indicate speech synthesis has stopped
    }
};
  
  const stripHtml = (html) => {
    const temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  };
  const handleCopyText = (textCopy) => {
    const textToCopy = stripHtml(textCopy);
    setCopyIcon(true)
    navigator.clipboard.writeText(textToCopy).then(() => {
      // alert('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
    setTimeout(() => setCopyIcon(false), 500)
  };
  const handleResendMessage = (id) => {
    setLoadingMessage(true)
    axios.post(
      "https://sbc.designal.cc/api/resend-message",
      {
        chat_id: id
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
      setLoadingMessage(false)
    })
    .catch(error => {
      setLoadingMessage(false)
      console.error('There was an error making the request!', error);
    });
  }
  const handleDislike = (data) => {
    axios.post(
      "https://sbc.designal.cc/api/dislike",
      {
        chat_id: itemId,
        comment: dislikeMessage
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      console.log(response.data);
      setLoadingMessage(false)
      setDislike(!dislike)

    })
    .catch(error => {
      setLoadingMessage(false)
      console.error('There was an error making the request!', error);
    });


  }
  const handleStartNewChat = () => {
    setLoading(true)
    const token = JSON.parse(localStorage.getItem("data")).token
      axios.get("https://sbc.designal.cc/api/start-chat", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        chat_id: "",
        share_name: "1"
      }
    })
    .then(response => {
      setCatchChat(response.data.data.id)
      setLoading(false)
    })
    .catch(error => {
      setLoading(false)
      console.error('There was an error making the request!', error);
    })
  }
  useEffect(()=>{
    if(localStorage.getItem("data")){
      setUser(JSON.parse(localStorage.getItem("data")).name)
    }
  },[])
  const [windhtchat,setwidthchat] = useState()
  useEffect(()=>{
    setwidthchat(window.innerWidth)
    window.onresize = () => {
      setwidthchat(window.innerWidth)
    }
  },[])
  console.log(chatData)


  return (
    <div className="col-span-3 bg-white relative">
    <div className="w-full log-bannar-2" style={{paddingTop:'100px',height:'100vh'}}>
      <div
        className="w-full grid grid-cols-4" 
        id="chat"
        style={{ height: 'calc(100vh - 80px)',width: (windhtchat-10)+"px",position:'absolute',right:0,top:0,overflowY:'scroll'}}
        >
          <div className='col-span-1' style={{width: elementWidth+'px'}}></div>
          {/* relative */}
          <div className='col-span-3'>
        {loading ? 
        <div className='flex items-center justify-center min-h-screen'>
          <div style={{borderTopColor:"transparent"}} className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
          <p className="ml-2">Loading...</p>
        </div>
        :
        <ul>
          {insideChat && Object.entries(insideChat).length == 0 ?
          <div className='pt-4' style={{paddingTop:'200px'}}>
            <div className="text-center">
              <div className='m-auto' style={{width:'200px'}}><img src={MessageImg.src} className='w-100' alt=''  /></div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">No Chat yet !</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">you can start new session or chose previous chat.</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* <Button  variant="gradient">Start Chat</Button> */}
                <button onClick={handleStartNewChat} className="learn-more start">
                  <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                  </span>
                  <span className="button-text">Start Chat</span>
                </button>
                {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a> */}
              </div>
            </div>
          </div>
          :
          <li className="clearfix2 mt-4 px-10" style={{paddingTop:'90px'}}>

            { chatData && insideChat && insideChat.user_chats && 
              chatData.map((item,i)=>(
            <React.Fragment key={i}>
            <div className='flex justify-end relative'>
                <div>
                  <div className='chat_userName_2 text-right'>{user}</div> 
                    <div className="flex justify-end">
                    <div
                        className="bg-sky-900 text-white rounded px-5 py-2 my-2 relative chat_card"
                    >
                        <span className="block" dangerouslySetInnerHTML={{ __html: item.question }} />
                        {/* <span className="block text-right " style={{fontSize:'0.5rem'}}>{item.created_at}10:32pm</span> */}
                    </div>
                  </div>
                  <div className='flex mb-3 justify-end'>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2">
                      <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                    </svg> */}
                  {!copyIcon ?
                    <svg onClick={()=>handleCopyText(item.question)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 mr-4 cursor-pointer">
                      <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
                      <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                      <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 mr-4  ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    }
                  </div>
                </div>
            </div>


            <div className='relative'>
                <div className='code' style={{width: (elementWidth - 40)+'px'}}>
                {item?.answer?.includes('//') && <span className="hover:bg-gray-100 border border-gray-300 px-3 py-2  flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                    <div className="w-full pb-2">
                      <div className="flex justify-between">
                        {/* <span className="block ml-2 font-semibold text-base text-gray-600">SBC</span> */}
                        {/* <span className="block ml-2 text-sm text-gray-600">5 minutes</span> */}
                      </div>
                       <span className="block ml-2 text-sm text-gray-600  font-semibold">{ item.answer.split('//')[0].slice(3)}</span>
                    </div>
                  </span>}
                </div>

                <div>
                  <div className='chat_userName'>BYLD AI</div>
                  <div className="w-full flex justify-start chat_card">
                  <div 
                      className="bg-gray-200 rounded px-5 py-2 my-2 text-gray-700 relative chat_card"
                      >
                        {loadingMessage ? <h4 className='text-black'>loading..</h4>:
                      <>
                      {item?.answer ? <span className="block" dangerouslySetInnerHTML={{ __html: item?.answer?.includes('//') ? '<p>' + item.answer.split('//')[1] : item?.answer }} /> :  
                        <>...</>                         
                      }
                      {/* <span className="block text-right" style={{fontSize:'0.5rem'}}>10:30pm</span> */}
                      </>
                        }
                  </div>
                  </div>
                  {item?.answer ?
                  <div className='flex mb-3'>
                    <svg onClick={()=>handleReadText(item.answer)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                      <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                    </svg>

                    {isSpeaking && (
                        <svg onClick={handleStopReading} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clipRule="evenodd" />
                      </svg>


                      )}



                    {!copyIcon ?
                    <svg onClick={()=>handleCopyText(item.answer)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                      <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
                      <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                      <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                    </svg>
                    :
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    }
                    <svg onClick={(e)=>handleResendMessage(item.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                      <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                    </svg>
                    <svg onClick={()=>dislikeToggle(item.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                      <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                    </svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-3.5 ml-2 cursor-pointer">
                      <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                    </svg> */}
                  </div>:
                    ''

                  }
                </div>
            </div>
            </React.Fragment>
            ))
            }
          </li>
          }
        </ul>
        }
        </div>
      </div>

    </div>
    
    {pathName.slice(0,9) == "/sharable"? "" :
      insideChat && Object.entries(insideChat).length != 0 &&
      <div style={{width: '100%',position:'absolute',bottom:'0'}}>
        <ChatInput chatData={chatData} setChatData={setChatData} storedCode={storedCode} insideChat={insideChat} setUpdate={setUpdate} update={update}/>
      </div>

      }

    {
    dislike &&
      <Dislike handleDislike={handleDislike} setDislikeMessage={setDislikeMessage} setDislike={setDislike} dislike={dislike} />
    }

  </div>
  )
}

export default MainChat