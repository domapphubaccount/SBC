"use client"
import React, { useEffect, useState } from 'react'
import ArchiveAccordion from './ArchiveAccordions'

function Archive({dashboardData,setUpdate,update,setInsideChat,setCatchChat,setLoading}) {
    const [archiveToggle,setArchiveToggle] = useState(false)

  return (
    <>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setArchiveToggle(!archiveToggle)} width={25}  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {
                archiveToggle &&
                <div className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1" role="none">
                        <ArchiveAccordion setLoading={setLoading} setCatchChat={setCatchChat} dashboardData={dashboardData} setUpdate={setUpdate} update={update}setInsideChat={setInsideChat}/>
                    </div>
                </div>
                }
  </>
  )
}


export default Archive