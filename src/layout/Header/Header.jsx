"use client"

import React from 'react'
import MultipleSelect from '@/components/Chat/code/code'
import Archive from '@/components/archive/Archive'
import DropDown from '@/components/dropDown/DropDown'
import Link from 'next/link'

function Header() {
  
  return (
    <header>      
    <nav className="z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-darkBlue">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start ">
          <Link className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="/">BYLD</Link>
        </div>
        {/* start code */}
        <div title='chose code'>
          <MultipleSelect/>
        </div>
        {/* end code */}
        <div className="flex  items-center shadow-none  bg-darkBlue" >
          <ul className="flex justify-between list-none ml-auto items-center">
            {/* start archive */}
            <li className='mr-3' title='timeline'>
              <Archive/>
            </li>
            {/* end archive */}
            {/* start start new chat */}
            <li title='start new chat' className='mr-3'>
              <div>
                <div tabindex="0" class="plusButton">
                  <svg class="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <g mask="url(#mask0_21_345)">
                      <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </li>
            {/* end start new chat */}
            {/* start profile dropDown */}
            <li title='profile'>
              <DropDown/>
            </li>
            {/* end profile dropDown */}
          </ul>
        </div>
      </div>
    </nav>
    </header>
  )
}

export default Header