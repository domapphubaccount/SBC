"use client"
import React, { useEffect, useRef, useState } from 'react'

function Refrence({setElementWidth}) {
  const colRef = useRef()

  useEffect(()=>{
    window.onresize = () => {
     setElementWidth(colRef.current?.offsetWidth)
     window.MathJax && window.MathJax.typeset();
    }
  },[])

  return (
    <div ref={colRef} id="refContainer" className="col-span-1  bg-gray-100 border-r border-gray-300	relative">
    <ul id="listRef" className="overflow-auto h-screen " style={{paddingTop:'100px' }}>
      <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2 absolute" style={{top:'60px',fontSize:'1rem',fontWeight:'bold',left:'50%',transform:'translateX(-50%)'}}>Reference</h2>
      <li>
        {/* <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-base text-gray-600">Jhon C</span>
              <span className="block ml-2 text-sm text-gray-600">5 minutes</span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">Hello world!!</span>
          </div>
        </a>

        <a className="bg-gray-100 border border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-base text-gray-600">Eduard</span>
              <span className="block ml-2 text-sm text-gray-600">15 minutes</span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">I am fine</span>
          </div>
        </a>

        <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-base text-gray-600">Celia</span>
              <span className="block ml-2 text-sm text-gray-600">1 hour</span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">Last message</span>
          </div>
        </a> */}
      </li>
    </ul>

  </div>
  )
}

export default Refrence