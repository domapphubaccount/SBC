"use client"

import Dashboard from '@/components/Dashboard/Dashboard'
import { Sidebar } from '@/components/Dashboard/Sidebar/Sidebar'
import { redirect } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Page() {
  const [page, setPage] = useState(1);
  const isLogged = useSelector((state) => state.loginSlice.logged);

  useLayoutEffect(() => {
    if (!isLogged) {
      redirect("/signIn");
    }
  }, [isLogged]);

  const handlePage = (index) => {
    setPage(index)
  }
  return (
    <section className='min-h-screen bg-sky-950'>
      <Sidebar handlePage={handlePage}>
        <Dashboard page={page}/>
      </Sidebar>
    </section>
  )
}

export default Page