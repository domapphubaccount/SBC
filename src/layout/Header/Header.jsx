"use client"
import MultipleSelect from '@/components/Chat/code/code'
import Archive from '@/components/archive/Archive'
import DropDown from '@/components/dropDown/DropDown'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'

function Header({path,code,setStoredCode,storedCode,dashboardData,update,setUpdate,setInsideChat,setCatchChat,setLoading}) {
  const [ userName , setUserName] = useState("");
  const pathname = usePathname()

  useEffect(()=>{
    if(localStorage.getItem("data")){
    const token =  JSON.parse(localStorage.getItem("data")).token
    }else{
      if( pathname.slice(0,9) != "/sharable"){
      redirect('/signIn')
      }
    }

    if(localStorage.getItem("data")){
      setUserName(JSON.parse(localStorage.getItem("data")).name)
    }
  },[])

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
  
  return (
    <>      
    {pathname == "/profile" ? "" :<> 
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
    </>
    }

    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-darkBlue">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">

        <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start ">
          <Link className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="/">BYLD</Link>
        </div>
      {pathname.slice(0,9) == "/sharable" ? "" :
        <>
        {
          !path ?
                <div>
                  <MultipleSelect code={code} setStoredCode={setStoredCode} storedCode={storedCode} />
                </div>
        :
        <div>PROFILE</div>
        }

        <div className="flex  items-center shadow-none  bg-darkBlue" >
          
          <ul className="flex justify-between list-none ml-auto items-center">
            <li className='mr-3' title='timeline'>
              <Archive setLoading={setLoading} dashboardData={dashboardData} setUpdate={setUpdate} update={update} setInsideChat={setInsideChat} setCatchChat={setCatchChat}/>
            </li>
            <li title='start new chat' className='mr-3' onClick={handleStartNewChat}>
              <div>
                  <svg style={{color:'#fff !important'}} xmlns="http://www.w3.org/2000/svg" width={25} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
              </div>
            </li>
            <li title='profile'>
              <DropDown userName={userName}/>
            </li>
          </ul>
        </div>
        </>
      }
      </div>
    </nav>

    </>
  )
}

export default Header