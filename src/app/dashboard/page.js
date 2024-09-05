"use client"
import Dashboard from '@/components/Dashboard/Dashboard'
import { Sidebar } from '@/components/Dashboard/Sidebar/Sidebar'
import React, { useState } from 'react'

function Page() {
  const [page, setPage] = useState(1);

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