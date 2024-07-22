"use client"
import MultipleSelect from '@/components/Chat/code/code'
import Archive from '@/components/archive/Archive'
import DropDown from '@/components/dropDown/DropDown'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { choseChate, get_chat } from '@/app/Redux/Features/Chat/ChatSlice'
import { useDispatch } from 'react-redux'
import { loading_chat } from '@/app/Redux/Features/Update/UpdateSlice'
import Logo from "/public/logo.png"

function Header({path,setStoredCode,storedCode}) {
  const [userName , setUserName] = useState("");
  const dispatch = useDispatch()
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
    dispatch(loading_chat(true))
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
      dispatch(choseChate(response.data.data.id))
      dispatch(loading_chat(false))
      localStorage.setItem("chat",response.data.data.id)
    })
    .catch(error => {
      dispatch(loading_chat(false))
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
      <div className="w-full px-12 mx-auto flex flex-wrap items-center justify-between">

        <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start ">
          <Link className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="/">
            <img width={100} height={100} quality={100} src={Logo.src} alt="logo" />
          </Link>
        </div>
      {pathname.slice(0,9) == "/sharable" ? "" :
        <>
        {
          !path ?
            <div>
              <MultipleSelect setStoredCode={setStoredCode} storedCode={storedCode} />
            </div>
        :
        <div>PROFILE</div>
        }
        <div className="flex  items-center shadow-none  bg-darkBlue" > 
          <ul className="flex justify-between list-none ml-auto items-center">
            <li className='mr-3 relative' title='timeline'>
              <Archive/>
            </li>
            {/* start start new chat */}
            <li title='start new chat' className='mr-3' onClick={handleStartNewChat}>
              <div>
                <div tabindex="0" className="plusButton">
                  <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <g mask="url(#mask0_21_345)">
                      <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </li>
            {/* end start new chat */}
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