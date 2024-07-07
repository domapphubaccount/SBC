"use client"
import React, { useEffect, useRef, useState } from 'react'
import ChatInput from '../chatInput/ChatInput'
import axios from 'axios'
import Dislike from './actions/Dislike'
import { usePathname } from 'next/navigation'
import MessageImg from "@/assets/chat/MESSAGE.png"
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useDispatch, useSelector } from 'react-redux'
import { loading_chat, updateSlice } from '@/app/Redux/Features/Update/UpdateSlice'
import { choseChate } from '@/app/Redux/Features/Chat/ChatSlice'
import ChatBox from '../ChatBox/ChatBox'




const renderContent = (content) => {
  const parts = content.split(/(\$[^$]*\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const equation = part.slice(1, -1); // Remove the $ delimiters
      return (
        <span
          key={index}
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(equation, { throwOnError: false })
          }}
        />
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
};


function MainChat({elementWidth,storedCode}) {
  const pathName = usePathname()
  const [copyIcon , setCopyIcon] = useState(false)
  const [user,setUser] = useState('')
  const [dislike, setDislike] = useState(false)
  const [loadingMessage,setLoadingMessage] = useState(false)
  const [token, setToken] = useState("");
  const [itemId,setItemId] = useState(null)
  const [dislikeMessage,setDislikeMessage] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track speech synthesis
  const [copID,setCopId] = useState()
  const disaptch = useDispatch()
  const chatData = useSelector(state => state.chatSlice.chat_data)
  const updates = useSelector(state => state.updateSlice.state)
  const conversation = useSelector(state => state.chatSlice.conversation)
  const loading = useSelector(state => state.updateSlice.loading_chat)
  const chatRef = useRef()
  const [responseId , setResponseId] = useState('')




  useEffect(()=>{
    window.MathJax && window.MathJax.typeset();
  },[responseId,user,itemId,dislike,copID,updates,copyIcon,isSpeaking,elementWidth,chatData,storedCode,conversation,dislikeMessage,loadingMessage])
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
  const handleReadText = async (textRead,id) => {
    setCopId(id)
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
  const handleCopyText = (textCopy,id) => {
    setCopId(id)
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
    setResponseId(id)

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
      disaptch(updateSlice())
      setLoadingMessage(false)
      setResponseId('')
    })
    .catch(error => {
      setLoadingMessage(false)
      setResponseId('')
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
    disaptch(loading_chat(true))
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
      disaptch(choseChate(response.data.data.id))
      localStorage.setItem("chat",response.data.data.id)
      disaptch(loading_chat(false))
    })
    .catch(error => {
      disaptch(loading_chat(false))
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
      window.MathJax && window.MathJax.typeset();
    }
  },[])
  useEffect(()=>{     
     window.MathJax && window.MathJax.typeset();
  },[windhtchat])

  useEffect(() => {
    window.MathJax && window.MathJax.typeset();
  }, [conversation]);

  const pattern = /SBC.*?\/\//g;

  const textHandler = (item) => {

    if (item.match(pattern)) {
        let dataArray = item.match(pattern);
        let data = item;

        dataArray.forEach(item2 => {
            data = data.replaceAll(item2, '');
        });
        return data;
    }
    return item; 
  }
    // Scroll to the bottom
    useEffect(() => {
      
      const element = document.getElementById('chat')
      element.scrollTop = element.scrollHeight;    
      
  }, [conversation]);

  return (
    <div className="col-span-3 bg-white relative">
    <div className="w-full log-bannar-2" style={{paddingTop:'100px',height:'100vh'}}>

      <ChatBox />

    </div>
    
    {pathName.slice(0,9) == "/sharable"? "" :
      conversation && Object.entries(conversation).length != 0 &&
      <div style={{width: '100%',position:'absolute',bottom:'0'}}>
        <ChatInput storedCode={storedCode} />
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