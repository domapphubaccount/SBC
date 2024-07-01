"use client"
import React, { useEffect, useRef, useState } from 'react'

function Refrence({setElementWidth}) {
  const colRef = useRef()

  useEffect(()=>{
    // window.onresize = () => {
    //  setElementWidth(colRef.current?.offsetWidth)
    // }
  },[])

  return (
    <div ref={colRef} id="refContainer" className="col-span-1  bg-gray-100 border-r border-gray-300	relative">
    <ul id="listRef" className="overflow-auto h-full" >
      <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2 absolute" style={{top:'60px',fontSize:'1rem',fontWeight:'bold',left:'50%',transform:'translateX(-50%)'}}>Reference</h2>
      <li>

      </li>
    </ul>

  </div>
  )
}

export default Refrence