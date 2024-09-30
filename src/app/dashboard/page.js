"use client"

import Dashboard from '@/components/Dashboard/Dashboard'
import { Sidebar } from '@/components/Dashboard/Sidebar/Sidebar'
import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Page() {
  
  const profileData = useSelector((state) => state.profileSlice.profile);
  const [page, setPage] = useState(9);
  const isLogged = useSelector((state) => state.loginSlice.logged);

  useLayoutEffect(() => {
    if (!isLogged) {
      redirect("/signIn");
    }
  }, [isLogged]);



  const handlePage = (index) => {
    setPage(index)
  }

  useLayoutEffect(()=>{
    if(profileData.roles && profileData.roles[0].id == 2){
      setPage(2)
    }
  },[profileData])
  return (
    <section className='min-h-screen bg-sky-950'>
        {profileData.roles ?
      <Sidebar handlePage={handlePage}>
        <Dashboard page={page}/>
      </Sidebar>
        :<Load />
        }
    </section>
  )
}

export default Page


import loadingImg from "@/assets/logo/loading.gif"

function Load() {
  return (
<div className="inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity"
 style={{zIndex: "6000"}}>
  <div className="flex-col">
    <img src={loadingImg.src} alt='loading' className='loading_logo'/>
  </div>
</div>
  )
}

